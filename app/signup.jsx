import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://192.168.1.124:3000";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !username.trim() ||
      !password ||
      !fname.trim() ||
      !lname.trim() ||
      !email.trim()
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_login: username.trim(),
          user_pass: password,
          fname: fname.trim(),
          lname: lname.trim(),
          email: email.trim(),
          gender: "N/A",
          user_level: 0,
          branch_cd: "MAIN",
          registered: new Date().toISOString(),
          user_activation_key: "",
          isActive: 1,
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

      console.log("SIGNUP RESPONSE:", data);

      if (response.ok && data.success) {
        setSuccessMessage("Account created successfully!");

        setTimeout(() => {
          router.replace("/(tabs)/login");
        }, 1500);

        return;
      }

      setErrorMessage(data.message || "Unable to create account.");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      setErrorMessage(
        "Cannot connect to the server.\n\nMake sure your Node.js backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>

      {/* BAMBOO / CROSSLINE BACKGROUND */}
      <View style={styles.bambooBackground}>
        <View style={styles.line1} />
        <View style={styles.line2} />
        <View style={styles.line3} />
        <View style={styles.line4} />
        <View style={styles.cross1} />
        <View style={styles.cross2} />
        <View style={styles.cross3} />
        <View style={styles.cross4} />
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.leaf}></Text>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Welcome to PolimerApp
        </Text>

        <View style={styles.headerLine}>
          <View style={styles.lineDecor} />
          <Text style={styles.bambooIcon}>🎋</Text>
          <View style={styles.lineDecor} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* FORM CARD */}
        <View style={styles.form}>

          <Text style={styles.formTitle}>
            Join Us
          </Text>

          <Text style={styles.formSubtitle}>
            Create your PolimerApp account
          </Text>

          {/* SUCCESS */}
          {successMessage ? (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>
                ✓ {successMessage}
              </Text>
            </View>
          ) : null}

          {/* ERROR */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>
                {errorMessage}
              </Text>
            </View>
          ) : null}

          {/* FIRST NAME */}
          <Text style={styles.label}>First Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor="#9A8F78"
            value={fname}
            onChangeText={setFname}
            editable={!loading}
          />

          {/* LAST NAME */}
          <Text style={styles.label}>Last Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            placeholderTextColor="#9A8F78"
            value={lname}
            onChangeText={setLname}
            editable={!loading}
          />

          {/* USERNAME */}
          <Text style={styles.label}>Username</Text>

          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            placeholderTextColor="#9A8F78"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9A8F78"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* PASSWORD */}
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#9A8F78"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          {/* SIGN UP */}
          <TouchableOpacity
            style={[
              styles.signupButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.signupIcon}></Text>

                <Text style={styles.signupText}>
                  CREATE ACCOUNT
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              OR
            </Text>

            <View style={styles.divider} />
          </View>

          {/* LOGIN */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginQuestion}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/login")}
              disabled={loading}
            >
              <Text style={styles.loginLink}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* BOTTOM DECORATION */}
          <View style={styles.bottomDecoration}>
            <Text style={styles.bottomLeaf}>🌿</Text>

            <View style={styles.bottomLine} />

            <Text style={styles.bottomLeaf}>🌿</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F0E5",
  },

  // =========================================
  // BAMBOO BACKGROUND
  // =========================================

  bambooBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.13,
  },

  line1: {
    position: "absolute",
    width: 900,
    height: 8,
    backgroundColor: "#557A46",
    transform: [{ rotate: "35deg" }],
    top: 100,
    left: -250,
  },

  line2: {
    position: "absolute",
    width: 900,
    height: 8,
    backgroundColor: "#557A46",
    transform: [{ rotate: "-35deg" }],
    top: 250,
    left: -250,
  },

  line3: {
    position: "absolute",
    width: 900,
    height: 8,
    backgroundColor: "#8B6F47",
    transform: [{ rotate: "35deg" }],
    top: 500,
    left: -250,
  },

  line4: {
    position: "absolute",
    width: 900,
    height: 8,
    backgroundColor: "#8B6F47",
    transform: [{ rotate: "-35deg" }],
    top: 650,
    left: -250,
  },

  cross1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: "#557A46",
    transform: [{ rotate: "45deg" }],
    top: 170,
    left: -40,
  },

  cross2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: "#8B6F47",
    transform: [{ rotate: "45deg" }],
    top: 430,
    right: -40,
  },

  cross3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: "#557A46",
    transform: [{ rotate: "45deg" }],
    top: 700,
    left: -40,
  },

  cross4: {
    position: "absolute",
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: "#8B6F47",
    transform: [{ rotate: "45deg" }],
    top: 900,
    right: -40,
  },

  // =========================================
  // HEADER
  // =========================================

  header: {
    backgroundColor: "#31572C",
    alignItems: "center",
    paddingTop: 65,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomWidth: 5,
    borderBottomColor: "#C8A96B",
  },

  leaf: {
    fontSize: 30,
    marginBottom: 8,
  },

  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#FFFDF5",
  },

  subtitle: {
    fontSize: 15,
    color: "#DDE8D2",
    marginTop: 6,
  },

  headerLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    width: "65%",
  },

  lineDecor: {
    flex: 1,
    height: 1,
    backgroundColor: "#C8A96B",
  },

  bambooIcon: {
    fontSize: 20,
    marginHorizontal: 10,
  },

  // =========================================
  // SCROLL
  // =========================================

  scroll: {
    flex: 1,
    marginTop: -20,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // =========================================
  // FORM
  // =========================================

  form: {
    backgroundColor: "#FFFDF7",
    borderRadius: 25,
    padding: 24,
    borderWidth: 1.5,
    borderColor: "#D5C49A",
    elevation: 6,
    shadowColor: "#31572C",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  formTitle: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "800",
    color: "#31572C",
  },

  formSubtitle: {
    textAlign: "center",
    color: "#7B735F",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },

  // =========================================
  // MESSAGES
  // =========================================

  successBanner: {
    backgroundColor: "#E4F0DA",
    borderWidth: 1,
    borderColor: "#6A994E",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  successText: {
    color: "#31572C",
    textAlign: "center",
    fontWeight: "700",
  },

  errorBanner: {
    backgroundColor: "#F7E1DC",
    borderWidth: 1,
    borderColor: "#B85C4A",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  errorText: {
    color: "#9B3E2D",
    textAlign: "center",
    fontWeight: "600",
  },

  // =========================================
  // INPUTS
  // =========================================

  label: {
    color: "#4C5A3C",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 3,
  },

  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#D5C49A",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FAF7ED",
    fontSize: 15,
    color: "#3E4636",
  },

  // =========================================
  // SIGNUP BUTTON
  // =========================================

  signupButton: {
    height: 55,
    backgroundColor: "#31572C",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 4,
    borderBottomColor: "#203B1D",
    elevation: 3,
  },

  signupIcon: {
    fontSize: 17,
    marginRight: 8,
  },

  signupText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  disabledButton: {
    opacity: 0.6,
  },

  // =========================================
  // DIVIDER
  // =========================================

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D8CEB5",
  },

  dividerText: {
    color: "#8B6F47",
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: "700",
  },

  // =========================================
  // LOGIN
  // =========================================

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginQuestion: {
    color: "#77705F",
    fontSize: 14,
    marginRight: 5,
  },

  loginLink: {
    color: "#31572C",
    fontSize: 14,
    fontWeight: "800",
  },

  // =========================================
  // BOTTOM DECORATION
  // =========================================

  bottomDecoration: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  bottomLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D5C49A",
  },

  bottomLeaf: {
    fontSize: 17,
    marginHorizontal: 10,
  },
});