import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.subtitle}>PolimerApp</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👋 Hello!</Text>

        <Text style={styles.text}>
          Welcome to my application. This page contains information about
          the developer and the purpose of PolimerApp.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💻 About the Project</Text>

        <Text style={styles.text}>
          PolimerApp is a mobile application developed using React Native
          and Expo. It provides users with a simple interface for exploring
          different features of the application.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛠️ Technologies</Text>

        <Text style={styles.text}>
          • React Native{"\n"}
          • Expo{"\n"}
          • Expo Router{"\n"}
          • JavaScript{"\n"}
          • Node.js{"\n"}
          • MySQL
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Developer</Text>

        <Text style={styles.text}>
          Developer: Your Name{"\n"}
          Project: PolimerApp{"\n"}
          Version: 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 17,
    color: "#666",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 25,
  },
}); 