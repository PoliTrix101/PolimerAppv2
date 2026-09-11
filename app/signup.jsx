
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://192.168.137.29:3000";

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
      {/* BACKGROUND */}

      <View style={styles.oceanBackground} />
      <View style={styles.waveOne} />
      <View style={styles.waveTwo} />

      <View style={styles.sun} />

      <View style={styles.bubbleOne} />
      <View style={styles.bubbleTwo} />
      <View style={styles.bubbleThree} />

      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* BRAND */}

          <View style={styles.header}>
            <View style={styles.waveLogo}>
              <View style={styles.logoWaveOne} />
              <View style={styles.logoWaveTwo} />
            </View>

            <View style={styles.brandCopy}>
              <Text style={styles.brand}>
                WAVEAPP
              </Text>

              <Text style={styles.brandMeta}>
                JOIN THE ADVENTURE
              </Text>
            </View>
          </View>

          {/* CARD */}

          <View style={styles.card}>
            <View style={styles.cardTopLine} />

            <View style={styles.titleRow}>
              <View style={styles.titleArea}>
                <Text style={styles.smallTitle}>
                  START YOUR JOURNEY
                </Text>

                <Text style={styles.title}>
                  Create Account
                </Text>

                <Text style={styles.subtitle}>
                  Join WaveApp and save your ocean
                  adventures.
                </Text>
              </View>

              <View style={styles.statusCircle}>
                <View style={styles.statusDot} />
              </View>
            </View>

            {/* SUCCESS */}

            {successMessage ? (
              <View style={styles.successBox}>
                <View style={styles.successIcon}>
                  <Text style={styles.successIconText}>
                    ✓
                  </Text>
                </View>

                <Text style={styles.successText}>
                  {successMessage}
                </Text>
              </View>
            ) : null}

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

            {/* FIRST + LAST NAME */}

            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <Text style={styles.label}>
                  FIRST NAME
                </Text>

                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="First name"
                    placeholderTextColor="#8AA5AE"
                    value={fname}
                    onChangeText={setFname}
                    editable={!loading}
                  />
                </View>
              </View>

              <View style={styles.nameField}>
                <Text style={styles.label}>
                  LAST NAME
                </Text>

                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    placeholderTextColor="#8AA5AE"
                    value={lname}
                    onChangeText={setLname}
                    editable={!loading}
                  />
                </View>
              </View>
            </View>

            {/* USERNAME */}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                USERNAME
              </Text>

              <View style={styles.inputBox}>
                <View style={styles.userIcon}>
                  <View style={styles.userHead} />
                  <View style={styles.userBody} />
                </View>

                <View style={styles.inputDivider} />

                <TextInput
                  style={styles.input}
                  placeholder="Choose a username"
                  placeholderTextColor="#8AA5AE"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* EMAIL */}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                EMAIL
              </Text>

              <View style={styles.inputBox}>
                <View style={styles.mailIcon}>
                  <View style={styles.mailTop} />
                  <View style={styles.mailBottom} />
                </View>

                <View style={styles.inputDivider} />

                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="#8AA5AE"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
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
                  placeholder="Create a password"
                  placeholderTextColor="#8AA5AE"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
            </View>

            {/* CREATE ACCOUNT */}

            <TouchableOpacity
              style={[
                styles.primaryButton,
                loading && styles.disabled,
              ]}
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>
                    CREATE MY ACCOUNT
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

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />

              <Text style={styles.dividerText}>
                ALREADY A MEMBER?
              </Text>

              <View style={styles.dividerLine} />
            </View>

            {/* LOGIN */}

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>
                router.replace("/(tabs)/login")
              }
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>
                BACK TO SIGN IN
              </Text>

              <Text style={styles.secondaryArrow}>
                ←
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
              FIND YOUR WAVE
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ==================================================
  // SCREEN
  // ==================================================

  screen: {
    flex: 1,
    backgroundColor: "#EAF8FB",
    overflow: "hidden",
  },

  keyboardWrapper: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },

  // ==================================================
  // BACKGROUND
  // ==================================================

  oceanBackground: {
    position: "absolute",
    width: 620,
    height: 390,
    borderRadius: 310,
    top: -205,
    left: -120,
    backgroundColor: "#075985",
  },

  waveOne: {
    position: "absolute",
    width: 620,
    height: 150,
    borderRadius: 310,
    top: 35,
    left: -130,
    backgroundColor: "#0E7490",
    opacity: 0.8,
  },

  waveTwo: {
    position: "absolute",
    width: 680,
    height: 135,
    borderRadius: 340,
    top: 90,
    left: -150,
    backgroundColor: "#38BDF8",
    opacity: 0.3,
  },

  sun: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    right: 28,
    top: 55,
    backgroundColor: "#FFF0BE",
    opacity: 0.9,
  },

  bubbleOne: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    right: 110,
    top: 155,
    backgroundColor: "rgba(255,255,255,0.45)",
  },

  bubbleTwo: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    right: 75,
    top: 185,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  bubbleThree: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    right: 145,
    top: 125,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  // ==================================================
  // HEADER
  // ==================================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: 430,
    marginBottom: 17,
  },

  waveLogo: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginRight: 13,
  },

  logoWaveOne: {
    position: "absolute",
    width: 80,
    height: 35,
    borderRadius: 40,
    backgroundColor: "#0E7490",
    bottom: -9,
    left: -12,
  },

  logoWaveTwo: {
    position: "absolute",
    width: 70,
    height: 27,
    borderRadius: 35,
    backgroundColor: "#38BDF8",
    bottom: -7,
    left: 5,
    opacity: 0.75,
  },

  brandCopy: {
    flex: 1,
  },

  brand: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 3,
  },

  brandMeta: {
    color: "#BAE6FD",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginTop: 4,
  },

  // ==================================================
  // CARD
  // ==================================================

  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: "#D5EDF2",

    shadowColor: "#075985",
    shadowOpacity: 0.14,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 10,
    overflow: "hidden",
  },

  cardTopLine: {
    position: "absolute",
    top: 0,
    left: 25,
    right: 25,
    height: 4,
    backgroundColor: "#0E7490",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  titleArea: {
    flex: 1,
  },

  smallTitle: {
    color: "#0E7490",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  title: {
    color: "#083344",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 3,
  },

  subtitle: {
    color: "#78909C",
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 4,
  },

  statusCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E8F8FA",
    justifyContent: "center",
    alignItems: "center",
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#14B8A6",
  },

  // ==================================================
  // MESSAGES
  // ==================================================

  successBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFFBF3",
    borderWidth: 1,
    borderColor: "#BCE6C8",
    borderRadius: 13,
    padding: 10,
    marginBottom: 15,
  },

  successIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#22A447",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  successIconText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  successText: {
    flex: 1,
    color: "#267A3D",
    fontSize: 11,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3F3",
    borderWidth: 1,
    borderColor: "#F1CCCC",
    borderRadius: 13,
    padding: 10,
    marginBottom: 15,
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
    lineHeight: 16,
  },

  // ==================================================
  // NAME ROW
  // ==================================================

  nameRow: {
    flexDirection: "row",
    gap: 10,
  },

  nameField: {
    flex: 1,
    marginBottom: 14,
  },

  // ==================================================
  // FIELDS
  // ==================================================

  fieldGroup: {
    marginBottom: 14,
  },

  label: {
    color: "#54727B",
    fontSize: 8.5,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  inputBox: {
    height: 51,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FBFC",
    borderWidth: 1,
    borderColor: "#D5EAF0",
    borderRadius: 13,
    paddingHorizontal: 11,
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#123B48",
    fontSize: 13,
  },

  inputDivider: {
    width: 1,
    height: 18,
    backgroundColor: "#D5EAF0",
    marginHorizontal: 10,
  },

  // ==================================================
  // USER ICON
  // ==================================================

  userIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#DDF6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  userHead: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#0E7490",
    position: "absolute",
    top: 4,
  },

  userBody: {
    width: 13,
    height: 7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#0E7490",
    position: "absolute",
    bottom: 4,
  },

  // ==================================================
  // MAIL ICON
  // ==================================================

  mailIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#DDF6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  mailTop: {
    width: 14,
    height: 10,
    borderWidth: 1.5,
    borderColor: "#0E7490",
    borderRadius: 3,
  },

  mailBottom: {
    position: "absolute",
    width: 9,
    height: 9,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: "#0E7490",
    transform: [
      {
        rotate: "-45deg",
      },
    ],
    top: 4,
  },

  // ==================================================
  // LOCK ICON
  // ==================================================

  lockIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#DDF6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  lockTop: {
    width: 9,
    height: 7,
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
    height: 9,
    borderRadius: 3,
    backgroundColor: "#0E7490",
    position: "absolute",
    bottom: 4,
  },

  // ==================================================
  // PRIMARY BUTTON
  // ==================================================

  primaryButton: {
    height: 55,
    borderRadius: 15,
    backgroundColor: "#075985",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,

    shadowColor: "#075985",
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
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

  // ==================================================
  // DIVIDER
  // ==================================================

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1EFF2",
  },

  dividerText: {
    color: "#8AA5AE",
    fontSize: 7.5,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginHorizontal: 9,
  },

  // ==================================================
  // SECONDARY BUTTON
  // ==================================================

  secondaryButton: {
    height: 49,
    borderRadius: 13,
    backgroundColor: "#F0FAFC",
    borderWidth: 1,
    borderColor: "#B9E3EA",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  secondaryButtonText: {
    color: "#0E7490",
    fontSize: 9.5,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  secondaryArrow: {
    color: "#0E7490",
    fontSize: 17,
    marginLeft: 9,
  },

  // ==================================================
  // FOOTER
  // ==================================================

  footer: {
    alignItems: "center",
    marginTop: 16,
  },

  footerWave: {
    width: 38,
    height: 9,
    overflow: "hidden",
    marginBottom: 4,
  },

  footerWaveLine: {
    width: 45,
    height: 17,
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

