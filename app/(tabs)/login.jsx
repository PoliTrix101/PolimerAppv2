
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

const API_URL = "http://192.168.137.29:3000";

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
        router.replace("/(tabs)/home");
        return;
      }

      setErrorMessage(data.message || "Invalid username or password.");
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
      {/* Animated-style background shapes */}

      <View style={styles.topOcean} />
      <View style={styles.topWaveOne} />
      <View style={styles.topWaveTwo} />

      <View style={styles.sun} />

      <View style={styles.bubbleOne} />
      <View style={styles.bubbleTwo} />
      <View style={styles.bubbleThree} />

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          {/* BRAND */}

          <View style={styles.brandArea}>
            <View style={styles.waveLogo}>
              <View style={styles.logoWaveOne} />
              <View style={styles.logoWaveTwo} />
            </View>

            <View>
              <Text style={styles.brandName}>
                WAVEAPP
              </Text>

              <Text style={styles.brandSubtitle}>
                SURF • EXPLORE • REMEMBER
              </Text>
            </View>
          </View>

          {/* LOGIN CARD */}

          <View style={styles.card}>
            <View style={styles.cardTopAccent} />

            <View style={styles.titleArea}>
              <View>
                <Text style={styles.welcomeText}>
                  WELCOME BACK
                </Text>

                <Text style={styles.title}>
                  Sign in
                </Text>

                <Text style={styles.subtitle}>
                  Continue your ocean adventure.
                </Text>
              </View>

              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
              </View>
            </View>

            {/* ERROR */}

            {errorMessage ? (
              <View style={styles.errorBox}>
                <View style={styles.errorIcon}>
                  <Text style={styles.errorIconText}>
                    !
                  </Text>
                </View>

                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* USERNAME */}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                USERNAME
              </Text>

              <View style={styles.inputBox}>
                <View style={styles.inputIcon}>
                  <View style={styles.personHead} />
                  <View style={styles.personBody} />
                </View>

                <View style={styles.inputDivider} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor="#8AA5AE"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* PASSWORD */}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                PASSWORD
              </Text>

              <View style={styles.inputBox}>
                <View style={styles.lockIcon}>
                  <View style={styles.lockTop} />
                  <View style={styles.lockBody} />
                </View>

                <View style={styles.inputDivider} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#8AA5AE"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

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
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>
                    RIDE INTO WAVEAPP
                  </Text>

                  <View style={styles.buttonArrow}>
                    <Text style={styles.buttonArrowText}>
                      →
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>

            {/* DIVIDER */}

            <View style={styles.divider}>
              <View style={styles.dividerLine} />

              <Text style={styles.dividerText}>
                NEW TO WAVEAPP?
              </Text>

              <View style={styles.dividerLine} />
            </View>

            {/* SIGNUP */}

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => router.push("/signup")}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.signupText}>
                CREATE NEW ACCOUNT
              </Text>

              <Text style={styles.signupArrow}>
                →
              </Text>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}

          <View style={styles.footer}>
            <View style={styles.footerWave}>
              <View style={styles.footerWaveLine} />
            </View>

            <Text style={styles.footerTitle}>
              WAVEAPP
            </Text>

            <Text style={styles.footerText}>
              YOUR OCEAN. YOUR ADVENTURE.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF8FB",
    overflow: "hidden",
  },

  wrapper: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 25,
  },

  // BACKGROUND

  topOcean: {
    position: "absolute",
    top: -170,
    left: -100,
    width: 620,
    height: 390,
    borderRadius: 310,
    backgroundColor: "#075985",
  },

  topWaveOne: {
    position: "absolute",
    top: 45,
    left: -100,
    width: 600,
    height: 150,
    borderRadius: 300,
    backgroundColor: "#0E7490",
    opacity: 0.8,
  },

  topWaveTwo: {
    position: "absolute",
    top: 95,
    left: -130,
    width: 650,
    height: 140,
    borderRadius: 325,
    backgroundColor: "#38BDF8",
    opacity: 0.35,
  },

  sun: {
    position: "absolute",
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#FFF0BE",
    right: 30,
    top: 55,
    opacity: 0.9,
  },

  bubbleOne: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    top: 170,
    right: 105,
  },

  bubbleTwo: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    top: 195,
    right: 75,
  },

  bubbleThree: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
    top: 135,
    right: 135,
  },

  // BRAND

  brandArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  waveLogo: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    marginRight: 13,
    overflow: "hidden",
    justifyContent: "center",
  },

  logoWaveOne: {
    position: "absolute",
    width: 80,
    height: 35,
    borderRadius: 40,
    backgroundColor: "#0E7490",
    left: -12,
    bottom: -10,
  },

  logoWaveTwo: {
    position: "absolute",
    width: 70,
    height: 27,
    borderRadius: 35,
    backgroundColor: "#38BDF8",
    left: 5,
    bottom: -7,
    opacity: 0.75,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 3,
  },

  brandSubtitle: {
    color: "#BAE6FD",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 3,
  },

  // CARD

  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 27,
    padding: 23,
    borderWidth: 1,
    borderColor: "#D4EDF2",

    shadowColor: "#075985",
    shadowOpacity: 0.15,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 10,
    overflow: "hidden",
  },

  cardTopAccent: {
    position: "absolute",
    top: 0,
    left: 25,
    right: 25,
    height: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#0E7490",
  },

  titleArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  welcomeText: {
    color: "#0E7490",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
  },

  title: {
    color: "#083344",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 3,
  },

  subtitle: {
    color: "#78909C",
    fontSize: 11,
    marginTop: 4,
  },

  liveIndicator: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E8F8FA",
    justifyContent: "center",
    alignItems: "center",
  },

  liveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#14B8A6",
  },

  // ERROR

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3F3",
    borderWidth: 1,
    borderColor: "#F4CACA",
    borderRadius: 13,
    padding: 11,
    marginBottom: 16,
  },

  errorIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#D94A4A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  errorIconText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  errorText: {
    flex: 1,
    color: "#A33B3B",
    fontSize: 11,
    lineHeight: 17,
  },

  // INPUTS

  fieldGroup: {
    marginBottom: 16,
  },

  label: {
    color: "#54727B",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  inputBox: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FBFC",
    borderWidth: 1,
    borderColor: "#D5EAF0",
    borderRadius: 14,
    paddingHorizontal: 13,
  },

  inputIcon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#DDF6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  personHead: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#0E7490",
    position: "absolute",
    top: 5,
  },

  personBody: {
    width: 13,
    height: 7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#0E7490",
    position: "absolute",
    bottom: 5,
  },

  lockIcon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#DDF6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  lockTop: {
    width: 9,
    height: 8,
    borderWidth: 2,
    borderColor: "#0E7490",
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: "absolute",
    top: 4,
  },

  lockBody: {
    width: 13,
    height: 10,
    borderRadius: 3,
    backgroundColor: "#0E7490",
    position: "absolute",
    bottom: 4,
  },

  inputDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#D5EAF0",
    marginHorizontal: 11,
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#123B48",
    fontSize: 14,
  },

  // LOGIN BUTTON

  loginButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: "#075985",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,

    shadowColor: "#075985",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  buttonArrow: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  buttonArrowText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  disabled: {
    opacity: 0.5,
  },

  // DIVIDER

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1EFF2",
  },

  dividerText: {
    color: "#8AA5AE",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
    marginHorizontal: 10,
  },

  // SIGNUP

  signupButton: {
    height: 51,
    borderRadius: 14,
    backgroundColor: "#F0FAFC",
    borderWidth: 1,
    borderColor: "#B9E3EA",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  signupText: {
    color: "#0E7490",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  signupArrow: {
    color: "#0E7490",
    fontSize: 18,
    marginLeft: 9,
  },

  // FOOTER

  footer: {
    alignItems: "center",
    marginTop: 18,
  },

  footerWave: {
    width: 38,
    height: 10,
    overflow: "hidden",
    marginBottom: 4,
  },

  footerWaveLine: {
    width: 45,
    height: 18,
    borderRadius: 20,
    borderTopWidth: 2,
    borderColor: "#7DD3FC",
  },

  footerTitle: {
    color: "#0E7490",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 2,
  },

  footerText: {
    color: "#8AA5AE",
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 2,
  },
});

