import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* Bamboo-style background lines */}
      <View style={styles.pattern}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[
              styles.lineHorizontal,
              { top: i * 70 },
            ]}
          />
        ))}

        {Array.from({ length: 7 }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[
              styles.lineVertical,
              { left: i * 65 },
            ]}
          />
        ))}
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.smallTitle}>MABUHAY!</Text>
        <Text style={styles.title}>PolimerApp</Text>
        <Text style={styles.subtitle}>
          Welcome to your personal space
        </Text>
      </View>

      <View style={styles.content}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.sun}>☀</Text>

          <Text style={styles.cardTitle}>
            Welcome!
          </Text>

          <Text style={styles.cardText}>
            You have successfully logged in. Explore
            your gallery and learn more about this
            application.
          </Text>
        </View>

        {/* Gallery */}
        <TouchableOpacity
          style={styles.mainButton}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/gallery")}
        >
          <Text style={styles.buttonIcon}>📷</Text>

          <View>
            <Text style={styles.buttonTitle}>
              Gallery
            </Text>
            <Text style={styles.buttonSubtitle}>
              View your captured memories
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={styles.mainButton}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/about")}
        >
          <Text style={styles.buttonIcon}>🌿</Text>

          <View>
            <Text style={styles.buttonTitle}>
              About Me
            </Text>
            <Text style={styles.buttonSubtitle}>
              Learn about PolimerApp
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            ↪  Logout
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        ───  POLIMERAPP  ───
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EEDC",
  },

  pattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.18,
  },

  lineHorizontal: {
    position: "absolute",
    left: -100,
    right: -100,
    height: 2,
    backgroundColor: "#7A5C35",
    transform: [{ rotate: "12deg" }],
  },

  lineVertical: {
    position: "absolute",
    top: -100,
    bottom: -100,
    width: 2,
    backgroundColor: "#7A5C35",
    transform: [{ rotate: "12deg" }],
  },

  header: {
    backgroundColor: "#7B1E22",
    paddingTop: 65,
    paddingBottom: 35,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  smallTitle: {
    color: "#E9C46A",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 4,
  },

  title: {
    color: "#FFF8E7",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 5,
  },

  subtitle: {
    color: "#F5D9A6",
    fontSize: 14,
    marginTop: 5,
  },

  content: {
    padding: 20,
    marginTop: -5,
  },

  welcomeCard: {
    backgroundColor: "#FFFDF5",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D6B77A",
    elevation: 4,
  },

  sun: {
    fontSize: 35,
    color: "#D99B22",
    marginBottom: 5,
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: "#5B2525",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: "#665B4B",
    textAlign: "center",
    lineHeight: 21,
  },

  mainButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDF5",
    padding: 17,
    borderRadius: 17,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#2F6B45",
    borderWidth: 1,
    borderColor: "#D8C69A",
    elevation: 3,
  },

  buttonIcon: {
    fontSize: 28,
    marginRight: 14,
  },

  buttonTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#542C24",
  },

  buttonSubtitle: {
    fontSize: 12,
    color: "#817563",
    marginTop: 3,
  },

  arrow: {
    marginLeft: "auto",
    fontSize: 30,
    color: "#7B1E22",
  },

  logoutButton: {
    marginTop: 8,
    backgroundColor: "#7B1E22",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  logoutText: {
    color: "#FFF8E7",
    fontSize: 16,
    fontWeight: "800",
  },

  footer: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    color: "#856F4B",
    fontSize: 11,
    letterSpacing: 2,
  },
});