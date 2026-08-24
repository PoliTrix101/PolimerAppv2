import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../context/AuthContext";

const API_URL = "http://192.168.61.20:3000";

export default function SignIn() {
  const { setIsLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your username and password."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("================================");
      console.log("LOGIN");
      console.log("Username:", username);
      console.log("================================");

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_login: username.trim(),
          user_pass: password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok || !data.success) {
        Alert.alert(
          "Sign In Failed",
          data.message || "Invalid username or password."
        );
        return;
      }

      setIsLogin(true);

      router.replace("/(tabs)");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      Alert.alert(
        "Connection Error",
        "Could not connect to the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <View style={styles.form}>

        <Text style={styles.title}>
          Sign In
        </Text>

        <Text style={styles.subtitle}>
          Welcome back to PolimerApp
        </Text>

        {/* USERNAME */}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        {/* PASSWORD */}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        {/* SIGN IN BUTTON */}

        <TouchableOpacity
          style={[
            styles.signInButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signInText}>
              Sign In
            </Text>
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

        {/* CREATE ACCOUNT */}

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.createButtonText}>
            Create Account
          </Text>
        </TouchableOpacity>

        <Text style={styles.accountText}>
          Don't have an account? Create one above.
        </Text>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  form: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  signInButton: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  disabledButton: {
    opacity: 0.6,
  },

  signInText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },

  orText: {
    marginHorizontal: 12,
    color: "#888",
    fontSize: 13,
    fontWeight: "600",
  },

  createButton: {
    height: 50,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "700",
  },

  accountText: {
    textAlign: "center",
    color: "#777",
    marginTop: 12,
    fontSize: 13,
  },
});