import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../context/AuthContext";

const API_URL = "http://192.168.1.124:3000";

export default function Login() {
  const { setIsLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    setErrorMessage("");

    if (!cleanUsername || !cleanPassword) {
      setErrorMessage("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_login: cleanUsername,
          user_pass: cleanPassword,
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        setErrorMessage("The server returned an invalid response.");
        return;
      }

      if (response.ok && data.success) {
        setIsLogin(true);

        // GO DIRECTLY TO HOME
        router.replace("/(tabs)/home");

        return;
      }

      setErrorMessage(
        data.message || "Invalid username or password."
      );
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setErrorMessage(
        `Could not connect to the backend server.\n\nServer: ${API_URL}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* BAMBOO / CROSSLINE BACKGROUND */}

      <View style={styles.pattern}>
        {Array.from({ length: 12 }).map((_, index) => (
          <View
            key={`v-${index}`}
            style={[
              styles.verticalLine,
              { left: `${index * 10}%` },
            ]}
          />
        ))}

        {Array.from({ length: 15 }).map((_, index) => (
          <View
            key={`h-${index}`}
            style={[
              styles.horizontalLine,
              { top: `${index * 8}%` },
            ]}
          />
        ))}
      </View>

      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>P</Text>
        </View>

        <Text style={styles.smallTitle}>
          POLIMERAPP
        </Text>

        <Text style={styles.title}>
          Welcome Back
        </Text>

        <Text style={styles.subtitle}>
          Login to continue
        </Text>
      </View>

      {/* LOGIN CARD */}

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <View style={styles.card}>

          <View style={styles.cardTop}>
            <Text style={styles.cardIcon}></Text>

            <Text style={styles.cardTitle}>
              Sign In
            </Text>

            <Text style={styles.cardSubtitle}>
              Enter your account details
            </Text>
          </View>

          {/* ERROR */}

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {errorMessage}
              </Text>
            </View>
          ) : null}

          {/* USERNAME */}

          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#9A9A8A"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* PASSWORD */}

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9A9A8A"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* LOGIN */}

          <TouchableOpacity
            style={[
              styles.loginButton,
              loading && styles.disabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.loginIcon}>
                  → 
                </Text>

                <Text style={styles.loginText}>
                  Login
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* DIVIDER */}

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.orText}>
              OR
            </Text>

            <View style={styles.divider} />
          </View>

          {/* SIGN UP */}

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push("/signup")}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.signupText}>
              Create an Account
            </Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            New to PolimerApp? Create your account above.
          </Text>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1E6",
  },

  // =========================
  // BAMBOO PATTERN
  // =========================

  pattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.16,
  },

  verticalLine: {
    position: "absolute",
    top: -20,
    bottom: -20,
    width: 5,
    backgroundColor: "#6B7A3C",
    transform: [
      {
        rotate: "8deg",
      },
    ],
  },

  horizontalLine: {
    position: "absolute",
    left: -20,
    right: -20,
    height: 4,
    backgroundColor: "#8A6A3D",
    transform: [
      {
        rotate: "-3deg",
      },
    ],
  },

  // =========================
  // HEADER
  // =========================

  header: {
    backgroundColor: "#355E3B",
    alignItems: "center",
    paddingTop: 65,
    paddingBottom: 55,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    elevation: 8,
    shadowColor: "#263B27",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E7D7A7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#F5E9C8",
  },

  logoText: {
    fontSize: 38,
    fontWeight: "900",
    color: "#355E3B",
  },

  smallTitle: {
    color: "#E7D7A7",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 4,
    marginBottom: 5,
  },

  title: {
    color: "#fff",
    fontSize: 29,
    fontWeight: "900",
  },

  subtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    marginTop: 6,
  },

  // =========================
  // FORM
  // =========================

  wrapper: {
    flex: 1,
    marginTop: -30,
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#FFFDF7",
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: "#355E3B",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  cardTop: {
    alignItems: "center",
    marginBottom: 20,
  },

  cardIcon: {
    fontSize: 30,
    marginBottom: 5,
  },

  cardTitle: {
    color: "#35452F",
    fontSize: 23,
    fontWeight: "900",
  },

  cardSubtitle: {
    color: "#777968",
    fontSize: 13,
    marginTop: 4,
  },

  // =========================
  // ERROR
  // =========================

  errorBox: {
    backgroundColor: "#F9E1D9",
    borderWidth: 1,
    borderColor: "#C96B52",
    borderRadius: 12,
    padding: 11,
    marginBottom: 15,
  },

  errorText: {
    color: "#9B3F2D",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },

  // =========================
  // INPUTS
  // =========================

  label: {
    color: "#4B513D",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#D5CDAF",
    borderRadius: 13,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#F8F5E9",
    color: "#30352B",
    fontSize: 16,
  },

  // =========================
  // LOGIN BUTTON
  // =========================

  loginButton: {
    height: 53,
    borderRadius: 14,
    backgroundColor: "#355E3B",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 3,
    elevation: 4,
  },

  loginIcon: {
    color: "#E7D7A7",
    fontSize: 23,
    fontWeight: "900",
    marginRight: 8,
  },

  loginText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },

  disabled: {
    opacity: 0.6,
  },

  // =========================
  // DIVIDER
  // =========================

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#DCD6C2",
  },

  orText: {
    marginHorizontal: 12,
    color: "#999A8A",
    fontSize: 12,
    fontWeight: "700",
  },

  // =========================
  // SIGN UP
  // =========================

  signupButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#355E3B",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDF7",
  },

  signupText: {
    color: "#355E3B",
    fontSize: 16,
    fontWeight: "800",
  },

  bottomText: {
    color: "#8A8B7B",
    fontSize: 12,
    textAlign: "center",
    marginTop: 13,
    lineHeight: 18,
  },
});