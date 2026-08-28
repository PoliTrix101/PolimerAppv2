
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function About() {
  const [showKuromi, setShowKuromi] = useState(false);

  const handleProfilePress = () => {
    setShowKuromi((current) => !current);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          BACKGROUND
      ========================== */}

      <View style={styles.backgroundPattern}>
        <View style={styles.pinkCircle} />
        <View style={styles.purpleCircle} />
        <View style={styles.smallPinkCircle} />

        <Text style={styles.decorOne}>✦</Text>
        <Text style={styles.decorTwo}>♡</Text>
        <Text style={styles.decorThree}>✧</Text>
        <Text style={styles.decorFour}>♡</Text>
      </View>

      {/* =========================
          HEADER
      ========================== */}

      <View style={styles.header}>
        <Text style={styles.headerSmall}>
          ABOUT ME
        </Text>

        {/* =========================
            FLIPPABLE PROFILE
        ========================== */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleProfilePress}
          style={styles.avatarWrapper}
        >
          {showKuromi ? (
            <View style={styles.imageSide}>
              <Image
                source={require("../../assets/images/KUROMIv2.png")}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={styles.imageSide}>
              <Image
                source={require("../../assets/images/Joan.jpg")}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
          )}
        </TouchableOpacity>

        {/* IMAGE NAME */}
        <Text style={styles.imageName}>
          {showKuromi ? "KUROMI" : "JOAN"}
        </Text>

        <Text style={styles.flipHint}>
          Tap the image to flip ♡
        </Text>

        <Text style={styles.title}>
          About Me
        </Text>

        <Text style={styles.subtitle}>
          KUROMIAPP
        </Text>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerHeart}>♡</Text>
          <View style={styles.dividerLine} />
        </View>
      </View>

      {/* =========================
          CONTENT
      ========================== */}

      <View style={styles.content}>

        {/* HELLO CARD */}
        <View style={styles.card}>
          <View style={[styles.cardIcon, styles.pinkIcon]}>
            <Text style={styles.iconText}>♡</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Hello! 👋
            </Text>

            <Text style={styles.text}>
              Welcome to my application! This page
              contains information about the developer
              and the purpose of KUROMIAPP.
            </Text>
          </View>
        </View>

        {/* PROJECT CARD */}
        <View style={styles.card}>
          <View style={[styles.cardIcon, styles.purpleIcon]}>
            <Text style={styles.iconText}>✦</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              About the Project
            </Text>

            <Text style={styles.text}>
              KUROMIAPP is a mobile application developed
              using React Native and Expo. It provides
              users with a simple, friendly, and enjoyable
              interface for exploring different features.
            </Text>
          </View>
        </View>

        {/* TECHNOLOGY CARD */}
        <View style={styles.card}>
          <View style={[styles.cardIcon, styles.pinkIcon]}>
            <Text style={styles.iconText}>💻</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Technologies
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
          <View style={[styles.cardIcon, styles.purpleIcon]}>
            <Text style={styles.iconText}>👩‍💻</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Developer
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Developer
              </Text>

              <Text style={styles.infoValue}>
                Joan
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Project
              </Text>

              <Text style={styles.infoValue}>
                KUROMIAPP
              </Text>
            </View>

            <View
              style={[
                styles.infoRow,
                { borderBottomWidth: 0 },
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

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerDecor}>
            ✦ ♡ ✦
          </Text>

          <Text style={styles.footerTitle}>
            KUROMIAPP
          </Text>

          <Text style={styles.footerSubtitle}>
            Thank you for visiting ♡
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  // =========================================
  // CONTAINER
  // =========================================

  container: {
    flex: 1,
    backgroundColor: "#F8F3FC",
  },

  // =========================================
  // BACKGROUND
  // =========================================

  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1500,
    overflow: "hidden",
    backgroundColor: "#F8F3FC",
  },

  pinkCircle: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#FF72AD",
    top: -150,
    right: -100,
  },

  purpleCircle: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#9B59B6",
    bottom: -80,
    left: -130,
  },

  smallPinkCircle: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFB6D5",
    top: 430,
    right: -35,
  },

  decorOne: {
    position: "absolute",
    top: 190,
    left: 25,
    color: "#FF5FA2",
    fontSize: 25,
    fontWeight: "900",
  },

  decorTwo: {
    position: "absolute",
    top: 390,
    right: 28,
    color: "#9B59B6",
    fontSize: 30,
  },

  decorThree: {
    position: "absolute",
    top: 720,
    left: 22,
    color: "#FF72AD",
    fontSize: 22,
  },

  decorFour: {
    position: "absolute",
    bottom: 180,
    right: 30,
    color: "#9B59B6",
    fontSize: 28,
  },

  // =========================================
  // HEADER
  // =========================================

  header: {
    backgroundColor: "#6C2A83",

    alignItems: "center",

    paddingTop: 58,
    paddingBottom: 35,
    paddingHorizontal: 20,

    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

    borderBottomWidth: 4,
    borderBottomColor: "#FF5FA2",

    elevation: 10,

    shadowColor: "#4B1760",
    shadowOpacity: 0.3,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  headerSmall: {
    color: "#FF9BC5",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 15,
  },

  // =========================================
  // PROFILE IMAGE
  // =========================================

  avatarWrapper: {
    width: 140,
    height: 140,

    borderRadius: 70,

    backgroundColor: "#FFFFFF",

    padding: 5,

    borderWidth: 4,
    borderColor: "#FF72AD",

    marginBottom: 8,

    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  imageSide: {
    width: "100%",
    height: "100%",

    borderRadius: 65,

    backgroundColor: "#FBE8F1",

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
  },

  // =========================================
  // IMAGE NAME
  // =========================================

  imageName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 2,
  },

  flipHint: {
    color: "#EBD9F2",
    fontSize: 10,
    marginTop: 3,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#EBD9F2",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 4,
    marginTop: 5,
  },

  divider: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDB8E9",
  },

  dividerHeart: {
    color: "#FF72AD",
    fontSize: 18,
    marginHorizontal: 10,
  },

  // =========================================
  // CONTENT
  // =========================================

  content: {
    padding: 18,
    paddingTop: 23,
  },

  // =========================================
  // CARDS
  // =========================================

  card: {
    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    marginBottom: 15,

    overflow: "hidden",

    borderWidth: 1.5,
    borderColor: "#E5D5EC",

    elevation: 5,

    shadowColor: "#6C2A83",
    shadowOpacity: 0.10,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  cardIcon: {
    width: 55,

    justifyContent: "center",
    alignItems: "center",
  },

  pinkIcon: {
    backgroundColor: "#FFE0ED",
  },

  purpleIcon: {
    backgroundColor: "#EBD8F5",
  },

  iconText: {
    fontSize: 23,
  },

  cardContent: {
    flex: 1,
    padding: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#57206D",
    marginBottom: 9,
  },

  text: {
    fontSize: 14,
    color: "#75677E",
    lineHeight: 22,
  },

  // =========================================
  // TECHNOLOGIES
  // =========================================

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#FBE8F1",

    borderWidth: 1,
    borderColor: "#F3BDD5",

    paddingVertical: 7,
    paddingHorizontal: 11,

    borderRadius: 20,

    marginRight: 7,
    marginBottom: 8,
  },

  tagText: {
    color: "#7A3C70",
    fontSize: 12,
    fontWeight: "800",
  },

  // =========================================
  // INFORMATION
  // =========================================

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 11,

    borderBottomWidth: 1,
    borderBottomColor: "#EFE4F3",
  },

  infoLabel: {
    color: "#A18BAA",
    fontSize: 13,
  },

  infoValue: {
    color: "#57206D",
    fontSize: 13,
    fontWeight: "800",
  },

  // =========================================
  // FOOTER
  // =========================================

  footer: {
    alignItems: "center",

    paddingTop: 12,
    paddingBottom: 50,
  },

  footerDecor: {
    color: "#FF5FA2",
    fontSize: 18,
    letterSpacing: 5,
    marginBottom: 5,
  },

  footerTitle: {
    color: "#6C2A83",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 3,
  },

  footerSubtitle: {
    color: "#9B59B6",
    fontSize: 12,
    marginTop: 5,
  },

});
