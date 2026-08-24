import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const API_URL = "http://192.168.61.20:3000";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (
      !username.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !gender.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("================================");
      console.log("CREATE ACCOUNT");
      console.log("Username:", username);
      console.log("Server:", API_URL);
      console.log("================================");

      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_login: username.trim(),
          user_pass: password,
          fname: firstName.trim(),
          lname: lastName.trim(),
          gender: gender.trim(),
          user_level: 0,
          branch_cd: "",
          email: "",
          user_activation_key: "",
          isActive: 1,
        }),
      });

      const data = await response.json();

      console.log("CREATE ACCOUNT RESPONSE:", data);

      if (!response.ok || !data.success) {
        Alert.alert(
          "Account Creation Failed",
          data.message || "Could not create your account."
        );
        return;
      }

      Alert.alert(
        "Account Created! 🎉",
        "Your account has been successfully created.",
        [
          {
            text: "Sign In",
            onPress: () => {
              router.replace("/signin");
            },
          },
        ]
      );

    } catch (error) {
      console.log("CREATE ACCOUNT ERROR:", error);

      Alert.alert(
        "Connection Error",
        "Could not connect to the backend server.\n\nMake sure your backend is running and your phone is connected to the same Wi-Fi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>

          {/* TITLE */}

          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Join PolimerApp today
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

          {/* FIRST NAME */}

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* LAST NAME */}

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* GENDER */}

          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* CREATE ACCOUNT BUTTON */}

          <TouchableOpacity
            style={[
              styles.button,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleCreateAccount}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* BACK TO SIGN IN */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
            </Text>

            <TouchableOpacity
              onPress={() => router.replace("/signin")}
              disabled={loading}
            >
              <Text style={styles.link}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
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
    fontSize: 16,
  },

  button: {
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  footerText: {
    color: "#333",
  },

  link: {
    color: "#007AFF",
    fontWeight: "700",
  },
});