
import { router } from "expo-router";
import {
  Image,
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

      {/* =========================
          BACKGROUND
      ========================== */}

      <View style={styles.background}>
        <View style={styles.topPinkCircle} />
        <View style={styles.bottomPurpleCircle} />

        <Text style={styles.decor1}>✦</Text>
        <Text style={styles.decor2}>✧</Text>
        <Text style={styles.decor3}>♡</Text>
      </View>

      {/* =========================
          TOP HEADER
      ========================== */}

      <View style={styles.header}>

        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>
              WELCOME BACK
            </Text>

            <Text style={styles.appName}>
              KUROMIAPP
            </Text>
          </View>

          <View style={styles.headerBadge}>
            <Text style={styles.badgeText}>
              ♡
            </Text>
          </View>
        </View>

        <Text style={styles.headerSubtitle}>
          Your cute little space ✦
        </Text>

      </View>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <View style={styles.content}>

        {/* =========================
            WELCOME CARD
        ========================== */}

        <View style={styles.welcomeCard}>

          {/* KUROMI IMAGE */}

          <View style={styles.kuromiContainer}>
            <Image
              source={require("../../assets/images/KUROMIv2.png")}
              style={styles.kuromiImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.welcomeTitle}>
            Welcome!
          </Text>

          <Text style={styles.welcomeText}>
            You have successfully logged in.
            Explore KUROMIAPP and enjoy your
            personal space.
          </Text>

          <View style={styles.pinkLine}>
            <View style={styles.lineLeft} />
            <Text style={styles.lineHeart}>♡</Text>
            <View style={styles.lineRight} />
          </View>

        </View>

        {/* =========================
            MENU TITLE
        ========================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Explore
          </Text>

          <Text style={styles.sectionSubtitle}>
            Choose where you want to go
          </Text>
        </View>

        {/* =========================
            GALLERY
        ========================== */}

        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/gallery")}
        >

          <View style={[styles.menuIcon, styles.galleryIcon]}>
            <Text style={styles.menuEmoji}>
              📷
            </Text>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>
              Gallery
            </Text>

            <Text style={styles.menuDescription}>
              View your captured memories
            </Text>
          </View>

          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>
              →
            </Text>
          </View>

        </TouchableOpacity>

        {/* =========================
            ABOUT
        ========================== */}

        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/about")}
        >

          <View style={[styles.menuIcon, styles.aboutIcon]}>
            <Text style={styles.menuEmoji}>
              ♡
            </Text>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>
              About Me
            </Text>

            <Text style={styles.menuDescription}>
              Learn more about KUROMIAPP
            </Text>
          </View>

          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>
              →
            </Text>
          </View>

        </TouchableOpacity>

        {/* =========================
            LOGOUT
        ========================== */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.85}
          onPress={handleLogout}
        >

          <Text style={styles.logoutIcon}>
            ↪
          </Text>

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

      </View>

      {/* =========================
          FOOTER
      ========================== */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✦ KUROMIAPP ✦
        </Text>
      </View>

    </View>
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

  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },

  topPinkCircle: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#FF72AD",
    top: -130,
    right: -80,
  },

  bottomPurpleCircle: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#9B59B6",
    bottom: -150,
    left: -100,
  },

  decor1: {
    position: "absolute",
    top: 170,
    left: 25,
    fontSize: 25,
    color: "#FF5FA2",
    fontWeight: "900",
  },

  decor2: {
    position: "absolute",
    top: 300,
    right: 25,
    fontSize: 23,
    color: "#9B59B6",
    fontWeight: "900",
  },

  decor3: {
    position: "absolute",
    bottom: 130,
    right: 35,
    fontSize: 30,
    color: "#FF5FA2",
  },

  // =========================================
  // HEADER
  // =========================================

  header: {
    backgroundColor: "#6C2A83",

    paddingTop: 58,
    paddingHorizontal: 25,
    paddingBottom: 35,

    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,

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

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  greeting: {
    color: "#FF9BC5",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 5,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 1,
  },

  headerSubtitle: {
    color: "#EBD9F2",
    fontSize: 14,
    marginTop: 7,
  },

  headerBadge: {
    width: 52,
    height: 52,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#FF72AD",
  },

  badgeText: {
    fontSize: 27,
    color: "#FF5FA2",
    fontWeight: "900",
  },

  // =========================================
  // CONTENT
  // =========================================

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  // =========================================
  // WELCOME CARD
  // =========================================

  welcomeCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,

    alignItems: "center",

    borderWidth: 1.5,
    borderColor: "#E6D1F0",

    elevation: 8,

    shadowColor: "#6C2A83",
    shadowOpacity: 0.15,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  // =========================================
  // KUROMI IMAGE
  // =========================================

  kuromiContainer: {
    width: 88,
    height: 88,

    borderRadius: 44,

    backgroundColor: "#F7E6F1",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#FF5FA2",

    marginBottom: 10,

    overflow: "hidden",
  },

  kuromiImage: {
    width: 78,
    height: 78,
  },

  welcomeTitle: {
    color: "#57206D",
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 6,
  },

  welcomeText: {
    color: "#786982",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 330,
  },

  pinkLine: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  lineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5CBEF",
  },

  lineRight: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5CBEF",
  },

  lineHeart: {
    color: "#FF5FA2",
    fontSize: 17,
    marginHorizontal: 9,
  },

  // =========================================
  // SECTION HEADER
  // =========================================

  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 3,
  },

  sectionTitle: {
    color: "#57206D",
    fontSize: 20,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#917D9C",
    fontSize: 12,
    marginTop: 2,
  },

  // =========================================
  // MENU CARD
  // =========================================

  menuCard: {
    backgroundColor: "#FFFFFF",

    minHeight: 76,

    borderRadius: 19,

    padding: 12,

    marginBottom: 11,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1.5,
    borderColor: "#E5D5EC",

    elevation: 4,

    shadowColor: "#6C2A83",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  menuIcon: {
    width: 52,
    height: 52,

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 13,
  },

  galleryIcon: {
    backgroundColor: "#FFE0ED",
  },

  aboutIcon: {
    backgroundColor: "#EBD8F5",
  },

  menuEmoji: {
    fontSize: 25,
    color: "#6C2A83",
  },

  menuInfo: {
    flex: 1,
  },

  menuTitle: {
    color: "#57206D",
    fontSize: 16,
    fontWeight: "900",
  },

  menuDescription: {
    color: "#918099",
    fontSize: 11.5,
    marginTop: 3,
  },

  arrowCircle: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "#F8E3EE",

    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "#FF5FA2",
    fontSize: 21,
    fontWeight: "900",
  },

  // =========================================
  // LOGOUT
  // =========================================

  logoutButton: {
    height: 50,

    backgroundColor: "#FF5FA2",

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginTop: 4,

    elevation: 5,

    shadowColor: "#FF5FA2",
    shadowOpacity: 0.25,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  logoutIcon: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    marginRight: 8,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  // =========================================
  // FOOTER
  // =========================================

  footer: {
    alignItems: "center",
    paddingBottom: 13,
  },

  footerText: {
    color: "#9B59B6",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
  },
});

