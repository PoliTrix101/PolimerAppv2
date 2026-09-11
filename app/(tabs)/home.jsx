import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const waveMove = useRef(new Animated.Value(0)).current;
  const waveMoveTwo = useRef(new Animated.Value(0)).current;
  const bubbleMove = useRef(new Animated.Value(0)).current;
  const sunPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Main wave animation
    Animated.loop(
      Animated.timing(waveMove, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
      })
    ).start();

    // Second wave animation
    Animated.loop(
      Animated.timing(waveMoveTwo, {
        toValue: 1,
        duration: 9000,
        useNativeDriver: true,
      })
    ).start();

    // Floating bubbles
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleMove, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleMove, {
          toValue: 0,
          duration: 4500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sun breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sunPulse, {
          toValue: 1.08,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(sunPulse, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* =========================================
          ANIMATED OCEAN HEADER
      ========================================= */}

      <View style={styles.header}>
        {/* Large moving wave */}

        <Animated.View
          style={[
            styles.waveBackground,
            {
              transform: [
                {
                  translateX: waveMove.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-90, 50],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Second moving wave */}

        <Animated.View
          style={[
            styles.waveBackgroundTwo,
            {
              transform: [
                {
                  translateX: waveMoveTwo.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, -100],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Third subtle wave */}

        <Animated.View
          style={[
            styles.waveBackgroundThree,
            {
              transform: [
                {
                  translateX: waveMove.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, -70],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Sun */}

        <Animated.View
          style={[
            styles.animatedSun,
            {
              transform: [
                {
                  scale: sunPulse,
                },
              ],
            },
          ]}
        />

        <View style={styles.sunGlow} />

        {/* Floating bubbles */}

        <Animated.View
          style={[
            styles.bubbleOne,
            {
              transform: [
                {
                  translateY: bubbleMove.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -32],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bubbleTwo,
            {
              transform: [
                {
                  translateY: bubbleMove.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -48],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.bubbleThree,
            {
              transform: [
                {
                  translateY: bubbleMove.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -25],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Header content */}

        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>
                WELCOME BACK
              </Text>

              <Text style={styles.appName}>
                WaveApp
              </Text>
            </View>

            <TouchableOpacity
              style={styles.logoutIconButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutIconText}>
                →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Wave message */}

          <View style={styles.waveDecoration}>
            <View style={styles.waveDot} />

            <Text style={styles.waveText}>
              Ride the wave. Explore more.
            </Text>
          </View>
        </View>
      </View>

      {/* =========================================
          SCROLLABLE CONTENT
      ========================================= */}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* =========================================
            WELCOME CARD
        ========================================= */}

        <View style={styles.welcomeCard}>
          <View style={styles.surfIcon}>
            <View style={styles.boardShape}>
              <View style={styles.boardLine} />
            </View>
          </View>

          <View style={styles.welcomeTextGroup}>
            <Text style={styles.welcomeTitle}>
              You're all set!
            </Text>

            <Text style={styles.welcomeText}>
              Grab your board and paddle into your
              next adventure.
            </Text>
          </View>
        </View>

        {/* =========================================
            STATS
        ========================================= */}

        <View style={styles.statsRow}>
          {/* WATER */}

          <View style={styles.statCard}>
            <View style={styles.waterIcon}>
              <View style={styles.waterDrop} />
            </View>

            <Text style={styles.statNumber}>
              24°
            </Text>

            <Text style={styles.statLabel}>
              Water
            </Text>
          </View>

          {/* SURF */}

          <View style={styles.statCard}>
            <View style={styles.surfMiniIcon}>
              <View style={styles.miniBoard} />
              <View style={styles.miniWave} />
            </View>

            <Text style={styles.statNumber}>
              Good
            </Text>

            <Text style={styles.statLabel}>
              Surf
            </Text>
          </View>

          {/* BEACH */}

          <View style={styles.statCard}>
            <View style={styles.beachIcon}>
              <View style={styles.beachSun} />
              <View style={styles.beachLine} />
            </View>

            <Text style={styles.statNumber}>
              Sunny
            </Text>

            <Text style={styles.statLabel}>
              Beach
            </Text>
          </View>
        </View>

        {/* =========================================
            EXPLORE SECTION
        ========================================= */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionLabel}>
              DISCOVER
            </Text>

            <Text style={styles.sectionTitle}>
              Explore
            </Text>
          </View>

          <View style={styles.sectionLine} />
        </View>

        {/* =========================================
            GALLERY
        ========================================= */}

        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/gallery")}
        >
          <View
            style={[
              styles.menuIcon,
              styles.iconOcean,
            ]}
          >
            <View style={styles.cameraShape}>
              <View style={styles.cameraLens} />
            </View>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>
              Beach Gallery
            </Text>

            <Text style={styles.menuDescription}>
              View your saved surf adventures
            </Text>
          </View>

          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>
              ›
            </Text>
          </View>
        </TouchableOpacity>

        {/* =========================================
            PADDLE
        ========================================= */}

        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.menuIcon,
              styles.iconSand,
            ]}
          >
            <View style={styles.paddleShape}>
              <View style={styles.paddleHandle} />
              <View style={styles.paddleHead} />
            </View>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>
              Paddle Out
            </Text>

            <Text style={styles.menuDescription}>
              Get ready for your next adventure
            </Text>
          </View>

          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>
              ›
            </Text>
          </View>
        </TouchableOpacity>

        {/* =========================================
            ABOUT
        ========================================= */}

        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/about")}
        >
          <View
            style={[
              styles.menuIcon,
              styles.iconSun,
            ]}
          >
            <View style={styles.aboutSun}>
              <View style={styles.aboutSunCenter} />
            </View>
          </View>

          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>
              About
            </Text>

            <Text style={styles.menuDescription}>
              Learn more about WaveApp
            </Text>
          </View>

          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>
              ›
            </Text>
          </View>
        </TouchableOpacity>

        {/* =========================================
            LOGOUT
        ========================================= */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.85}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Log Out
          </Text>

          <View style={styles.logoutArrow}>
            <Text style={styles.logoutArrowText}>
              →
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* =========================================
          FOOTER
      ========================================= */}

      <View style={styles.footer}>
        <View style={styles.footerWave}>
          <View style={styles.footerWaveInner} />
        </View>

        <Text style={styles.footerText}>
          WAVEAPP
        </Text>

        <Text style={styles.footerSubtext}>
          RIDE THE WAVES
        </Text>
      </View>
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  // ====================================================
  // MAIN
  // ====================================================

  container: {
    flex: 1,
    backgroundColor: "#F1FAFC",
  },

  // ====================================================
  // HEADER
  // ====================================================

  header: {
    height: 285,
    backgroundColor: "#075985",
    overflow: "hidden",
    position: "relative",
  },

  headerContent: {
    paddingTop: 58,
    paddingHorizontal: 24,
    zIndex: 10,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  greeting: {
    color: "#BAE6FD",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
  },

  logoutIconButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutIconText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "300",
  },

  // ====================================================
  // ANIMATED WAVES
  // ====================================================

  waveBackground: {
    position: "absolute",
    width: 540,
    height: 190,
    borderRadius: 270,
    backgroundColor: "#0E7490",
    bottom: -115,
    left: -110,
  },

  waveBackgroundTwo: {
    position: "absolute",
    width: 570,
    height: 170,
    borderRadius: 285,
    backgroundColor: "#22A6B3",
    bottom: -125,
    left: -90,
    opacity: 0.75,
  },

  waveBackgroundThree: {
    position: "absolute",
    width: 600,
    height: 145,
    borderRadius: 300,
    backgroundColor: "#38BDF8",
    bottom: -118,
    left: -100,
    opacity: 0.22,
  },

  // ====================================================
  // SUN
  // ====================================================

  animatedSun: {
    position: "absolute",
    right: 30,
    top: 53,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF4D6",
    opacity: 0.95,
  },

  sunGlow: {
    position: "absolute",
    right: 16,
    top: 39,
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: "rgba(255,244,214,0.08)",
  },

  // ====================================================
  // BUBBLES
  // ====================================================

  bubbleOne: {
    position: "absolute",
    right: 120,
    top: 145,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  bubbleTwo: {
    position: "absolute",
    right: 78,
    top: 175,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  bubbleThree: {
    position: "absolute",
    right: 160,
    top: 185,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  // ====================================================
  // WAVE MESSAGE
  // ====================================================

  waveDecoration: {
    marginTop: 25,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  waveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#A5F3FC",
    marginRight: 10,
  },

  waveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  // ====================================================
  // CONTENT
  // ====================================================

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  // ====================================================
  // WELCOME CARD
  // ====================================================

  welcomeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFF7FA",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#BCE8EF",
    marginBottom: 16,
    shadowColor: "#075985",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  surfIcon: {
    width: 56,
    height: 56,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  boardShape: {
    width: 14,
    height: 40,
    borderRadius: 9,
    backgroundColor: "#F2C879",
    transform: [
      {
        rotate: "28deg",
      },
    ],
    justifyContent: "center",
    alignItems: "center",
  },

  boardLine: {
    width: 2,
    height: 27,
    backgroundColor: "#D69E3A",
  },

  welcomeTextGroup: {
    flex: 1,
  },

  welcomeTitle: {
    color: "#075985",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },

  welcomeText: {
    color: "#28788A",
    fontSize: 12.5,
    lineHeight: 18,
  },

  // ====================================================
  // STATS
  // ====================================================

  statsRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 23,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingVertical: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7EEF3",
    shadowColor: "#075985",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
  },

  statNumber: {
    color: "#075985",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
  },

  statLabel: {
    color: "#94A3B8",
    fontSize: 10,
    marginTop: 2,
  },

  // ====================================================
  // WATER ICON
  // ====================================================

  waterIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
  },

  waterDrop: {
    width: 10,
    height: 14,
    backgroundColor: "#0E7490",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },

  // ====================================================
  // SURF ICON
  // ====================================================

  surfMiniIcon: {
    width: 25,
    height: 25,
    backgroundColor: "#FFF4D6",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  miniBoard: {
    width: 6,
    height: 17,
    borderRadius: 4,
    backgroundColor: "#D69E3A",
    transform: [
      {
        rotate: "25deg",
      },
    ],
  },

  miniWave: {
    position: "absolute",
    width: 14,
    height: 5,
    borderTopWidth: 2,
    borderColor: "#0E7490",
    bottom: 4,
  },

  // ====================================================
  // BEACH ICON
  // ====================================================

  beachIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#FFF7D6",
    justifyContent: "center",
    alignItems: "center",
  },

  beachSun: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#F2B84B",
    position: "absolute",
    top: 5,
    right: 5,
  },

  beachLine: {
    width: 15,
    height: 2,
    backgroundColor: "#0E7490",
    position: "absolute",
    bottom: 6,
    left: 5,
  },

  // ====================================================
  // SECTION
  // ====================================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionLabel: {
    color: "#0E7490",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  sectionTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },

  sectionLine: {
    width: 70,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#A5F3FC",
    marginBottom: 5,
  },

  // ====================================================
  // MENU CARDS
  // ====================================================

  menuCard: {
    backgroundColor: "#FFFFFF",
    minHeight: 76,
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7EEF3",
    shadowColor: "#075985",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 1,
  },

  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconOcean: {
    backgroundColor: "#E0F7FA",
  },

  iconSand: {
    backgroundColor: "#FFF4D6",
  },

  iconSun: {
    backgroundColor: "#FFF7D6",
  },

  menuInfo: {
    flex: 1,
  },

  menuTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },

  menuDescription: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 3,
  },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E8F9FB",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "#0E7490",
    fontSize: 24,
    fontWeight: "300",
    marginTop: -2,
  },

  // ====================================================
  // CAMERA ICON
  // ====================================================

  cameraShape: {
    width: 25,
    height: 18,
    borderRadius: 5,
    backgroundColor: "#0E7490",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraLens: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#E0F7FA",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  // ====================================================
  // PADDLE ICON
  // ====================================================

  paddleShape: {
    width: 25,
    height: 30,
    alignItems: "center",
  },

  paddleHandle: {
    width: 3,
    height: 20,
    backgroundColor: "#B8872D",
  },

  paddleHead: {
    width: 13,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#D69E3A",
    marginTop: -1,
  },

  // ====================================================
  // ABOUT ICON
  // ====================================================

  aboutSun: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F2B84B",
    justifyContent: "center",
    alignItems: "center",
  },

  aboutSunCenter: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#FFF4D6",
  },

  // ====================================================
  // LOGOUT
  // ====================================================

  logoutButton: {
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: "#BCE8EF",
    backgroundColor: "#E8F9FB",
    flexDirection: "row",
  },

  logoutText: {
    color: "#0E7490",
    fontSize: 14,
    fontWeight: "800",
  },

  logoutArrow: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#DFF7FA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 9,
  },

  logoutArrowText: {
    color: "#0E7490",
    fontSize: 16,
  },

  // ====================================================
  // BOTTOM
  // ====================================================

  bottomSpace: {
    height: 20,
  },

  // ====================================================
  // FOOTER
  // ====================================================

  footer: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 15,
    backgroundColor: "#F1FAFC",
  },

  footerWave: {
    width: 30,
    height: 8,
    overflow: "hidden",
    marginBottom: 5,
  },

  footerWaveInner: {
    width: 35,
    height: 15,
    borderRadius: 20,
    borderTopWidth: 2,
    borderColor: "#A5F3FC",
  },

  footerText: {
    color: "#0E7490",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  footerSubtext: {
    color: "#94A3B8",
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 2,
  },
}); 