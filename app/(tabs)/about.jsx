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
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}

      <View style={styles.hero}>
        <View style={styles.sun} />

        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />

        <Text style={styles.heroSmall}>ABOUT THE APP</Text>

        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/nikkochan.jpg")}
            style={styles.profileImage}
            resizeMode="cover"
          />

          <View style={styles.onlineDot} />
        </View>

        <Text style={styles.name}>Nikkochan</Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>
            DEVELOPER
          </Text>
        </View>

        <Text style={styles.heroTitle}>WaveApp</Text>

        <Text style={styles.heroSubtitle}>
          Ride the wave. Explore more.
        </Text>
      </View>

      {/* QUICK INFO */}

      <View style={styles.quickInfo}>
        <View style={styles.quickItem}>
          <View style={styles.quickIconBlue}>
            <View style={styles.smallWave} />
          </View>

          <Text style={styles.quickNumber}>1.0</Text>
          <Text style={styles.quickLabel}>Version</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.quickItem}>
          <View style={styles.quickIconAqua}>
            <View style={styles.smallWave} />
          </View>

          <Text style={styles.quickNumber}>Surf</Text>
          <Text style={styles.quickLabel}>Theme</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.quickItem}>
          <View style={styles.quickIconYellow}>
            <View style={styles.phoneShape} />
          </View>

          <Text style={styles.quickNumber}>Mobile</Text>
          <Text style={styles.quickLabel}>Platform</Text>
        </View>
      </View>

      {/* CONTENT */}

      <View style={styles.content}>

        {/* WELCOME */}

        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIcon}>
            <View style={styles.waveShape} />
          </View>

          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>
              Welcome to WaveApp
            </Text>

            <Text style={styles.welcomeText}>
              A simple mobile experience designed around the
              ocean, surfing, paddling, and discovering new
              adventures.
            </Text>
          </View>
        </View>

        {/* ABOUT PROJECT */}

        <View style={styles.largeCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBlue}>
              <View style={styles.beachShape} />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                About the Project
              </Text>

              <Text style={styles.cardSubtitle}>
                Made for adventure
              </Text>
            </View>
          </View>

          <Text style={styles.cardText}>
            WaveApp is a mobile application built with React
            Native and Expo. The application provides a clean
            and friendly interface for exploring different
            features while keeping a fun surfing and beach
            inspired experience.
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.quote}>
              "Life is better when you're riding the wave."
            </Text>
          </View>
        </View>

        {/* FEATURES */}

        <Text style={styles.sectionHeading}>
          What You Can Do
        </Text>

        <View style={styles.featureGrid}>

          <View style={styles.featureCard}>
            <View style={styles.featureIconBlue}>
              <View style={styles.cameraShape}>
                <View style={styles.cameraLens} />
              </View>
            </View>

            <Text style={styles.featureTitle}>
              Gallery
            </Text>

            <Text style={styles.featureText}>
              Capture and save your favorite moments.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconYellow}>
              <View style={styles.boardShape} />
            </View>

            <Text style={styles.featureTitle}>
              Surf
            </Text>

            <Text style={styles.featureText}>
              Enjoy a surfing inspired experience.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconAqua}>
              <View style={styles.waveShapeSmall} />
            </View>

            <Text style={styles.featureTitle}>
              Explore
            </Text>

            <Text style={styles.featureText}>
              Discover different parts of the app.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconOrange}>
              <View style={styles.sunShape} />
            </View>

            <Text style={styles.featureTitle}>
              Adventure
            </Text>

            <Text style={styles.featureText}>
              Keep exploring and enjoy the journey.
            </Text>
          </View>

        </View>

        {/* TECHNOLOGIES */}

        

        {/* DEVELOPER */}

        <Text style={styles.sectionHeading}>
          Developer
        </Text>

        <View style={styles.developerCard}>

          <View style={styles.developerTop}>

            <Image
              source={require("../../assets/images/nikkochan.jpg")}
              style={styles.developerImage}
              resizeMode="cover"
            />

            <View style={styles.developerInfo}>
              <Text style={styles.developerName}>
                Nikkochan
              </Text>

              <Text style={styles.developerRole}>
                WaveApp Developer
              </Text>

              <View style={styles.smallBadge}>
                <Text style={styles.smallBadgeText}>
                  SURF • CREATE • EXPLORE
                </Text>
              </View>
            </View>

          </View>

          <View style={styles.developerDivider} />

          <View style={styles.infoLine}>
            <Text style={styles.infoLabel}>
              Application
            </Text>

            <Text style={styles.infoValue}>
              WaveApp
            </Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.infoLabel}>
              Version
            </Text>

            <Text style={styles.infoValue}>
              6.9.6.9
            </Text>
          </View>

          <View style={[styles.infoLine, styles.noBorder]}>
            <Text style={styles.infoLabel}>
              Platform
            </Text>

            <Text style={styles.infoValue}>
              Android / iOS
            </Text>
          </View>

        </View>

        {/* FINAL CARD */}

        <View style={styles.finalCard}>

          <View style={styles.finalWave}>
            <View style={styles.finalWaveLine} />
            <View style={styles.finalWaveLineTwo} />
          </View>

          <Text style={styles.finalTitle}>
            Keep Riding
          </Text>

          <Text style={styles.finalText}>
            Thanks for exploring WaveApp.
            Keep paddling, keep exploring,
            and enjoy every wave.
          </Text>

          <View style={styles.decorativeLine} />

        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>
            WaveApp
          </Text>

          <Text style={styles.footerText}>
            Made with passion by Nikkochan
          </Text>

          <Text style={styles.footerVersion}>
            Version 1.0.0
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F1FAFC",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // =========================================
  // HERO
  // =========================================

  hero: {
    backgroundColor: "#075985",
    alignItems: "center",
    paddingTop: 58,
    paddingBottom: 42,
    paddingHorizontal: 20,
    overflow: "hidden",
    position: "relative",
  },

  sun: {
    position: "absolute",
    top: 48,
    right: 28,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FDE68A",
  },

  waveOne: {
    position: "absolute",
    bottom: -32,
    left: -40,
    right: -40,
    height: 72,
    borderRadius: 50,
    backgroundColor: "#0E7490",
  },

  waveTwo: {
    position: "absolute",
    bottom: -47,
    left: -60,
    right: -60,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#22A6B3",
  },

  heroSmall: {
    color: "#BAE6FD",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: 18,
  },

  profileContainer: {
    width: 118,
    height: 118,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    padding: 5,
    marginBottom: 12,
    position: "relative",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 31,
  },

  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#84CC16",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  roleBadge: {
    backgroundColor: "#164E63",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },

  roleBadgeText: {
    color: "#BAE6FD",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "900",
    marginTop: 22,
    letterSpacing: -0.8,
  },

  heroSubtitle: {
    color: "#BAE6FD",
    fontSize: 13,
    marginTop: 5,
    fontWeight: "600",
  },

  // =========================================
  // QUICK INFO
  // =========================================

  quickInfo: {
    marginHorizontal: 20,
    marginTop: -5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#D7EEF3",
    shadowColor: "#075985",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  },

  quickItem: {
    flex: 1,
    alignItems: "center",
  },

  quickIconBlue: {
    width: 28,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  quickIconAqua: {
    width: 28,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#CCFBF1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  quickIconYellow: {
    width: 28,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  smallWave: {
    width: 17,
    height: 7,
    borderBottomWidth: 2,
    borderBottomColor: "#0E7490",
    borderRadius: 10,
  },

  phoneShape: {
    width: 9,
    height: 14,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#D97706",
  },

  quickNumber: {
    color: "#075985",
    fontSize: 13,
    fontWeight: "800",
  },

  quickLabel: {
    color: "#94A3B8",
    fontSize: 9,
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#E2E8F0",
  },

  // =========================================
  // CONTENT
  // =========================================

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  // =========================================
  // WELCOME
  // =========================================

  welcomeCard: {
    backgroundColor: "#DFF7FA",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#BCE8EF",
    marginBottom: 16,
  },

  welcomeIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  waveShape: {
    width: 27,
    height: 13,
    borderBottomWidth: 4,
    borderBottomColor: "#0E7490",
    borderRadius: 20,
  },

  welcomeContent: {
    flex: 1,
  },

  welcomeTitle: {
    color: "#075985",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5,
  },

  welcomeText: {
    color: "#28788A",
    fontSize: 12.5,
    lineHeight: 19,
  },

  // =========================================
  // ABOUT PROJECT
  // =========================================

  largeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#D7EEF3",
    marginBottom: 22,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cardIconBlue: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  beachShape: {
    width: 27,
    height: 13,
    borderTopWidth: 4,
    borderTopColor: "#D97706",
    borderRadius: 20,
  },

  cardTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },

  cardSubtitle: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 3,
  },

  cardText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 20,
  },

  quoteBox: {
    marginTop: 15,
    backgroundColor: "#F0FDFA",
    borderRadius: 13,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#0E7490",
  },

  quote: {
    color: "#0E7490",
    fontSize: 12,
    fontWeight: "700",
    fontStyle: "italic",
  },

  // =========================================
  // HEADINGS
  // =========================================

  sectionHeading: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },

  // =========================================
  // FEATURES
  // =========================================

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D7EEF3",
  },

  featureIconBlue: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  featureIconYellow: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFF4D6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  featureIconAqua: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#CCFBF1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  featureIconOrange: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  cameraShape: {
    width: 24,
    height: 17,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#0E7490",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraLens: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#0E7490",
  },

  boardShape: {
    width: 9,
    height: 27,
    borderRadius: 9,
    backgroundColor: "#D97706",
    transform: [
      {
        rotate: "20deg",
      },
    ],
  },

  waveShapeSmall: {
    width: 25,
    height: 14,
    borderBottomWidth: 4,
    borderBottomColor: "#0E7490",
    borderRadius: 20,
  },

  sunShape: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#F59E0B",
  },

  featureTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },

  featureText: {
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  // =========================================
  // TECHNOLOGIES
  // =========================================

  techCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#D7EEF3",
    marginBottom: 22,
  },

  techRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  techIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  techLetter: {
    color: "#0E7490",
    fontSize: 17,
    fontWeight: "900",
  },

  techInfo: {
    flex: 1,
  },

  techName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },

  techDescription: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 3,
  },

  // =========================================
  // DEVELOPER
  // =========================================

  developerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#D7EEF3",
    marginBottom: 22,
  },

  developerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  developerImage: {
    width: 76,
    height: 76,
    borderRadius: 22,
    marginRight: 14,
  },

  developerInfo: {
    flex: 1,
  },

  developerName: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
  },

  developerRole: {
    color: "#0E7490",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  smallBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
  },

  smallBadgeText: {
    color: "#0E7490",
    fontSize: 8,
    fontWeight: "800",
  },

  developerDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  infoLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },

  infoValue: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "800",
  },

  // =========================================
  // FINAL CARD
  // =========================================

  finalCard: {
    backgroundColor: "#075985",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },

  finalWave: {
    width: 50,
    height: 28,
    marginBottom: 8,
    justifyContent: "center",
  },

  finalWaveLine: {
    position: "absolute",
    width: 45,
    height: 12,
    borderBottomWidth: 4,
    borderBottomColor: "#BAE6FD",
    borderRadius: 20,
    top: 4,
  },

  finalWaveLineTwo: {
    position: "absolute",
    width: 45,
    height: 12,
    borderBottomWidth: 4,
    borderBottomColor: "#FFFFFF",
    borderRadius: 20,
    top: 12,
    left: 5,
  },

  finalTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  finalText: {
    color: "#BAE6FD",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 7,
    maxWidth: 280,
  },

  decorativeLine: {
    width: 80,
    height: 2,
    backgroundColor: "#38BDF8",
    marginTop: 15,
    borderRadius: 2,
  },

  // =========================================
  // FOOTER
  // =========================================

  footer: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 20,
  },

  footerLogo: {
    color: "#075985",
    fontSize: 16,
    fontWeight: "900",
  },

  footerText: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 5,
  },

  footerVersion: {
    color: "#B0C4CA",
    fontSize: 10,
    marginTop: 3,
  },

});