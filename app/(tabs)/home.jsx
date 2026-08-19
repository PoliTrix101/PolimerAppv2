import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const handleLogout = () => {
    router.replace("/(tabs)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PolimerApp</Text>

      <Text style={styles.subtitle}>
        You have successfully logged in!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏠 Home</Text>

        <Text style={styles.cardText}>
          Welcome! You can now explore the Gallery and About Me pages.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/gallery")}
      >
        <Text style={styles.buttonText}>View Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => router.push("/(tabs)/about")}
      >
        <Text style={styles.aboutButtonText}>About Me</Text>
      </TouchableOpacity>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f5f7fa",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  aboutButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  aboutButtonText: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});