import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function About() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          BAMBOO / BANIG BACKGROUND
      ========================= */}
      <View style={styles.backgroundPattern}>
        {/* Vertical bamboo lines */}
        {Array.from({ length: 12 }).map((_, index) => (
          <View
            key={`v-${index}`}
            style={[
              styles.bambooVertical,
              {
                left: index * 35,
              },
            ]}
          />
        ))}

        {/* Horizontal bamboo lines */}
        {Array.from({ length: 30 }).map((_, index) => (
          <View
            key={`h-${index}`}
            style={[
              styles.bambooHorizontal,
              {
                top: index * 35,
              },
            ]}
          />
        ))}

        {/* Diagonal lines */}
        <View style={styles.diagonalOne} />
        <View style={styles.diagonalTwo} />
        <View style={styles.diagonalThree} />
        <View style={styles.diagonalFour} />
      </View>

      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <Text style={styles.kasaysayan}>
          TUNGKOL SA AKIN
        </Text>

        {/* Filipino sun */}
        <View style={styles.sun}>
          <Text style={styles.sunText}>☀</Text>
        </View>

        {/* PROFILE */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.title}>ABOUT ME</Text>

        <Text style={styles.subtitle}>
          POLIMERAPP
        </Text>

        <View style={styles.divider} />
      </View>

      {/* =========================
          CONTENT
      ========================= */}

      <View style={styles.content}>

        {/* HELLO CARD */}
        <View style={styles.card}>
          <View style={styles.pattern}>
            <Text style={styles.patternText}>✦</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Kumusta! 👋
            </Text>

            <Text style={styles.text}>
              Welcome to my application. This page contains
              information about the developer and the purpose
              of PolimerApp.
            </Text>
          </View>
        </View>

        {/* PROJECT CARD */}
        <View style={styles.card}>
          <View style={styles.pattern}>
            <Text style={styles.patternText}>✦</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Tungkol sa Proyekto
            </Text>

            <Text style={styles.text}>
              PolimerApp is a mobile application developed using
              React Native and Expo. It provides users with a
              simple interface for exploring different features
              of the application.
            </Text>
          </View>
        </View>

        {/* TECHNOLOGY CARD */}
        <View style={styles.card}>
          <View style={styles.pattern}>
            <Text style={styles.patternText}>✦</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Mga Teknolohiya 💻
            </Text>

            <View style={styles.tagRow}>
              {[
                "React Native",
                "Expo",
                "Expo Router",
                "JavaScript",
                "Node.js",
                "MySQL",
              ].map((tech) => (
                <View
                  key={tech}
                  style={styles.tag}
                >
                  <Text style={styles.tagText}>
                    {tech}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* DEVELOPER CARD */}
        <View style={styles.card}>
          <View style={styles.pattern}>
            <Text style={styles.patternText}>✦</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Developer 👨‍💻
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Developer
              </Text>

              <Text style={styles.infoValue}>
                Your Name
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Project
              </Text>

              <Text style={styles.infoValue}>
                PolimerApp
              </Text>
            </View>

            <View
              style={[
                styles.infoRow,
                {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text style={styles.infoLabel}>
                Version
              </Text>

              <Text style={styles.infoValue}>
                1.0.0
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            FOOTER
        ========================= */}

        <View style={styles.footer}>
          <Text style={styles.footerSun}>
            ✦ ☀ ✦
          </Text>

          <Text style={styles.footerText}>
            PolimerApp! 🇵🇭
          </Text>

          <Text style={styles.footerSubtext}>
            Salamat sa pagbisita
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  /* =========================
     MAIN BACKGROUND
  ========================= */

  container: {
    flex: 1,
    backgroundColor: "#E7D1A5",
  },

  /* =========================
     WOVEN BAMBOO BACKGROUND
  ========================= */

  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1400,
    backgroundColor: "#E7D1A5",
    overflow: "hidden",
  },

  bambooVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: "rgba(91, 61, 30, 0.12)",
  },

  bambooHorizontal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: "rgba(91, 61, 30, 0.12)",
  },

  diagonalOne: {
    position: "absolute",
    width: "160%",
    height: 5,
    backgroundColor: "rgba(91, 61, 30, 0.10)",
    transform: [
      {
        rotate: "35deg",
      },
    ],
    top: 180,
    left: -100,
  },

  diagonalTwo: {
    position: "absolute",
    width: "160%",
    height: 5,
    backgroundColor: "rgba(91, 61, 30, 0.10)",
    transform: [
      {
        rotate: "-35deg",
      },
    ],
    top: 180,
    left: -100,
  },

  diagonalThree: {
    position: "absolute",
    width: "160%",
    height: 5,
    backgroundColor: "rgba(91, 61, 30, 0.08)",
    transform: [
      {
        rotate: "35deg",
      },
    ],
    top: 650,
    left: -100,
  },

  diagonalFour: {
    position: "absolute",
    width: "160%",
    height: 5,
    backgroundColor: "rgba(91, 61, 30, 0.08)",
    transform: [
      {
        rotate: "-35deg",
      },
    ],
    top: 650,
    left: -100,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    backgroundColor: "#57352B",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 38,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,

    elevation: 6,

    shadowColor: "#3C241E",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  kasaysayan: {
    color: "#F3C66B",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 15,
  },

  /* =========================
     SUN
  ========================= */

  sun: {
    position: "absolute",
    right: 25,
    top: 45,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#C9362B",
    justifyContent: "center",
    alignItems: "center",
  },

  sunText: {
    color: "#FFD56A",
    fontSize: 32,
  },

  /* =========================
     PROFILE
  ========================= */

  avatarWrapper: {
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: "#F3C66B",
    padding: 5,
    marginBottom: 15,

    elevation: 6,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },

  title: {
    color: "#FFF8E8",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 3,
  },

  subtitle: {
    color: "#E6D4B4",
    fontSize: 12,
    letterSpacing: 4,
    marginTop: 6,
  },

  divider: {
    width: 65,
    height: 3,
    backgroundColor: "#C9362B",
    marginTop: 18,
  },

  /* =========================
     CONTENT
  ========================= */

  content: {
    padding: 18,
    paddingTop: 25,
  },

  /* =========================
     CARDS
  ========================= */

  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 253, 247, 0.97)",

    borderRadius: 10,

    marginBottom: 17,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#CDB88F",

    elevation: 4,

    shadowColor: "#54372B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  pattern: {
    width: 40,
    backgroundColor: "#16734F",
    justifyContent: "center",
    alignItems: "center",
  },

  patternText: {
    color: "#F3C66B",
    fontSize: 21,
  },

  cardContent: {
    flex: 1,
    padding: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4D2E25",
    marginBottom: 10,
  },

  text: {
    fontSize: 14.5,
    color: "#675B51",
    lineHeight: 23,
  },

  /* =========================
     TECHNOLOGY TAGS
  ========================= */

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#E3EFE6",
    borderWidth: 1,
    borderColor: "#A5C5AF",

    paddingVertical: 7,
    paddingHorizontal: 11,

    borderRadius: 20,

    marginRight: 7,
    marginBottom: 8,
  },

  tagText: {
    color: "#276044",
    fontSize: 12.5,
    fontWeight: "700",
  },

  /* =========================
     INFORMATION
  ========================= */

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 11,

    borderBottomWidth: 1,
    borderBottomColor: "#E4D8C3",
  },

  infoLabel: {
    color: "#9A8978",
    fontSize: 13,
  },

  infoValue: {
    color: "#4D2E25",
    fontSize: 13,
    fontWeight: "700",
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 45,
  },

  footerSun: {
    color: "#C9362B",
    fontSize: 18,
    letterSpacing: 5,
    marginBottom: 5,
  },

  footerText: {
    fontSize: 23,
    fontWeight: "900",
    color: "#C9362B",
    letterSpacing: 2,
  },

  footerSubtext: {
    marginTop: 5,
    color: "#806F60",
    fontSize: 12,
    letterSpacing: 1,
  },

});