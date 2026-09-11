import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";

export default function Gallery() {
  const cameraRef = useRef(null);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState("back");
  const [takingPicture, setTakingPicture] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // ======================================================
  // DIRECTORY
  // ======================================================

  const getGalleryDirectory = () => {
    return FileSystem.documentDirectory + "gallery/";
  };

  // ======================================================
  // LOAD PHOTOS
  // ======================================================

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);

      const directory = getGalleryDirectory();
      const info = await FileSystem.getInfoAsync(directory);

      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(directory, {
          intermediates: true,
        });

        setPhotos([]);
        return;
      }

      const files = await FileSystem.readDirectoryAsync(directory);

      const imageFiles = files
        .filter(
          (file) =>
            file.toLowerCase().endsWith(".jpg") ||
            file.toLowerCase().endsWith(".jpeg") ||
            file.toLowerCase().endsWith(".png")
        )
        .sort()
        .reverse();

      setPhotos(imageFiles.map((file) => directory + file));
    } catch (error) {
      console.log("LOAD PHOTOS ERROR:", error);

      Alert.alert(
        "Gallery Error",
        error?.message || "Could not load photos."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // CAMERA
  // ======================================================

  const openCamera = async () => {
    try {
      if (!cameraPermission?.granted) {
        const permission = await requestCameraPermission();

        if (!permission.granted) {
          Alert.alert(
            "Camera Permission",
            "Please allow camera access."
          );
          return;
        }
      }

      setCameraReady(false);
      setCameraOpen(true);
    } catch (error) {
      Alert.alert(
        "Camera Error",
        error?.message || "Could not open camera."
      );
    }
  };

  const closeCamera = () => {
    setCameraOpen(false);
    setCameraReady(false);
    setTakingPicture(false);
  };

  const switchCamera = () => {
    setCameraReady(false);

    setFacing((current) =>
      current === "back" ? "front" : "back"
    );
  };

  // ======================================================
  // TAKE PHOTO
  // ======================================================

  const takePicture = async () => {
    try {
      if (!cameraRef.current || !cameraReady || takingPicture) {
        return;
      }

      setTakingPicture(true);

      const photo =
        await cameraRef.current.takePictureAsync({
          quality: 1,
        });

      if (!photo?.uri) {
        throw new Error("Camera did not return a photo.");
      }

      const directory = getGalleryDirectory();

      const info = await FileSystem.getInfoAsync(directory);

      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(directory, {
          intermediates: true,
        });
      }

      const fileName = `photo_${Date.now()}.jpg`;
      const destination = directory + fileName;

      await FileSystem.copyAsync({
        from: photo.uri,
        to: destination,
      });

      setPhotos((current) => [destination, ...current]);

      Alert.alert(
        "Photo Saved",
        "Your photo has been added to your gallery.",
        [
          {
            text: "OK",
            onPress: closeCamera,
          },
        ]
      );
    } catch (error) {
      console.log("TAKE PHOTO ERROR:", error);

      Alert.alert(
        "Camera Error",
        error?.message || "Something went wrong."
      );
    } finally {
      setTakingPicture(false);
    }
  };

  // ======================================================
  // CAMERA SCREEN
  // ======================================================

  if (cameraOpen) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.cameraOverlay} />

          {/* TOP CAMERA BAR */}

          <View style={styles.cameraTop}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={closeCamera}
              activeOpacity={0.8}
            >
              <Text style={styles.cameraButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.cameraTitle}>
              <Text style={styles.cameraTitleSmall}>
                WAVEAPP
              </Text>

              <Text style={styles.cameraTitleMain}>
                Capture the moment
              </Text>
            </View>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={switchCamera}
              activeOpacity={0.8}
            >
              <Text style={styles.cameraButtonText}>↻</Text>
            </TouchableOpacity>
          </View>

          {/* CAMERA GUIDE */}

          <View style={styles.cameraGuide}>
            <View style={styles.guideCornerTopLeft} />
            <View style={styles.guideCornerTopRight} />
            <View style={styles.guideCornerBottomLeft} />
            <View style={styles.guideCornerBottomRight} />
          </View>

          {/* LOADING */}

          {!cameraReady && (
            <View style={styles.cameraLoading}>
              <View style={styles.loadingCircle}>
                <ActivityIndicator
                  size="large"
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.cameraLoadingTitle}>
                Preparing camera
              </Text>

              <Text style={styles.cameraLoadingText}>
                Almost ready
              </Text>
            </View>
          )}

          {/* BOTTOM */}

          <View style={styles.cameraBottom}>
            <Text style={styles.cameraHint}>
              Capture your next adventure
            </Text>

            <TouchableOpacity
              style={[
                styles.captureButton,
                (!cameraReady || takingPicture) &&
                  styles.captureDisabled,
              ]}
              onPress={takePicture}
              disabled={!cameraReady || takingPicture}
              activeOpacity={0.9}
            >
              <View style={styles.captureInner}>
                {takingPicture && (
                  <ActivityIndicator
                    size="small"
                    color="#075985"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  // ======================================================
  // GALLERY
  // ======================================================

  return (
    <View style={styles.container}>
      {/* ==================================================
          HERO HEADER
      ================================================== */}

      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroSmall}>
            WAVEAPP / MEMORIES
          </Text>

          <Text style={styles.heroTitle}>
            Your Surf
          </Text>

          <Text style={styles.heroTitleSecond}>
            Stories
          </Text>

          <Text style={styles.heroDescription}>
            Keep your favorite moments from every
            adventure in one place.
          </Text>
        </View>

        {/* Decorative sun */}

        <View style={styles.sun}>
          <View style={styles.sunInner} />
        </View>

        {/* Decorative wave */}

        <View style={styles.heroWaveOne} />
        <View style={styles.heroWaveTwo} />
      </View>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <View style={styles.content}>
        {/* SECTION HEADER */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionLabel}>
              COLLECTION
            </Text>

            <Text style={styles.sectionTitle}>
              Memories
            </Text>
          </View>

          <View style={styles.photoCount}>
            <Text style={styles.photoCountNumber}>
              {photos.length}
            </Text>

            <Text style={styles.photoCountLabel}>
              {photos.length === 1 ? "PHOTO" : "PHOTOS"}
            </Text>
          </View>
        </View>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (
          <View style={styles.center}>
            <View style={styles.loadingIcon}>
              <ActivityIndicator
                size="large"
                color="#075985"
              />
            </View>

            <Text style={styles.loadingTitle}>
              Loading memories
            </Text>

            <Text style={styles.loadingText}>
              Preparing your gallery...
            </Text>
          </View>
        ) : photos.length === 0 ? (
          /* ==================================================
             EMPTY STATE
          ================================================== */

          <View style={styles.empty}>
            <View style={styles.emptyArtwork}>
              <View style={styles.emptySun} />
              <View style={styles.emptyWaveOne} />
              <View style={styles.emptyWaveTwo} />

              <View style={styles.emptyBoard}>
                <View style={styles.boardLine} />
              </View>
            </View>

            <Text style={styles.emptyTitle}>
              Your story starts here
            </Text>

            <Text style={styles.emptyText}>
              Take a photo and create your first
              surf memory.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              activeOpacity={0.9}
              onPress={openCamera}
            >
              <View style={styles.emptyButtonCircle}>
                <Text style={styles.emptyButtonPlus}>
                  +
                </Text>
              </View>

              <Text style={styles.emptyButtonText}>
                Take Your First Photo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ==================================================
             PHOTO GRID
          ================================================== */

          <FlatList
            data={photos}
            keyExtractor={(item) => item}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gallery}
            columnWrapperStyle={styles.row}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.photoCard,
                  index % 3 === 0
                    ? styles.photoCardLarge
                    : styles.photoCardNormal,
                ]}
                activeOpacity={0.92}
                onPress={() => setSelectedPhoto(item)}
              >
                <Image
                  source={{ uri: item }}
                  style={styles.photo}
                  resizeMode="cover"
                />

                <View style={styles.photoOverlay}>
                  <View style={styles.photoNumber}>
                    <Text style={styles.photoNumberText}>
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* ==================================================
          FLOATING CAMERA BUTTON
      ================================================== */}

      <TouchableOpacity
        style={styles.floatingCamera}
        activeOpacity={0.9}
        onPress={openCamera}
      >
        <View style={styles.cameraLensOuter}>
          <View style={styles.cameraLensInner} />
        </View>

        <Text style={styles.floatingCameraText}>
          CAPTURE
        </Text>
      </TouchableOpacity>

      {/* ==================================================
          FULLSCREEN PHOTO
      ================================================== */}

      <Modal
        visible={selectedPhoto !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.fullscreen}>
          <View style={styles.fullscreenTop}>
            <View>
              <Text style={styles.fullscreenSmall}>
                WAVEAPP
              </Text>

              <Text style={styles.fullscreenTitle}>
                Memory
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeFullscreen}
              onPress={() => setSelectedPhoto(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}

          <View style={styles.fullscreenBottom}>
            <Text style={styles.fullscreenHint}>
              Your WaveApp memory
            </Text>
          </View>
        </View>
      </Modal>
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
  // HERO
  // ====================================================

  hero: {
    height: 255,
    backgroundColor: "#075985",
    overflow: "hidden",
    position: "relative",
  },

  heroContent: {
    paddingTop: 58,
    paddingHorizontal: 24,
    zIndex: 5,
  },

  heroSmall: {
    color: "#BAE6FD",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 10,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -1,
  },

  heroTitleSecond: {
    color: "#A5F3FC",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -1,
  },

  heroDescription: {
    width: "70%",
    color: "#DFF7FA",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },

  sun: {
    position: "absolute",
    right: 28,
    top: 55,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(255,244,214,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  sunInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF4D6",
  },

  heroWaveOne: {
    position: "absolute",
    width: 420,
    height: 110,
    borderRadius: 210,
    backgroundColor: "#0E7490",
    bottom: -75,
    left: -80,
    transform: [{ rotate: "-5deg" }],
  },

  heroWaveTwo: {
    position: "absolute",
    width: 430,
    height: 90,
    borderRadius: 220,
    backgroundColor: "#F1FAFC",
    bottom: -105,
    left: -70,
    transform: [{ rotate: "-4deg" }],
  },

  // ====================================================
  // CONTENT
  // ====================================================

  content: {
    flex: 1,
    marginTop: -1,
  },

  sectionHeader: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  sectionLabel: {
    color: "#0E7490",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  sectionTitle: {
    color: "#0F172A",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 3,
  },

  photoCount: {
    minWidth: 58,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#DFF7FA",
    alignItems: "center",
  },

  photoCountNumber: {
    color: "#075985",
    fontSize: 17,
    fontWeight: "800",
  },

  photoCountLabel: {
    color: "#0E7490",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 1,
  },

  // ====================================================
  // GALLERY
  // ====================================================

  gallery: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  row: {
    justifyContent: "space-between",
  },

  photoCard: {
    width: "48%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D7EEF3",
    shadowColor: "#075985",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  photoCardNormal: {
    height: 185,
  },

  photoCardLarge: {
    height: 235,
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  photoOverlay: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },

  photoNumber: {
    width: 34,
    height: 27,
    borderRadius: 9,
    backgroundColor: "rgba(7,89,133,0.78)",
    justifyContent: "center",
    alignItems: "center",
  },

  photoNumberText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  // ====================================================
  // LOADING
  // ====================================================

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  loadingIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#DFF7FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  loadingTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },

  loadingText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 5,
  },

  // ====================================================
  // EMPTY STATE
  // ====================================================

  empty: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20,
  },

  emptyArtwork: {
    width: 250,
    height: 170,
    borderRadius: 28,
    backgroundColor: "#DFF7FA",
    overflow: "hidden",
    position: "relative",
    marginBottom: 24,
  },

  emptySun: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF4D6",
    top: 28,
    right: 35,
  },

  emptyWaveOne: {
    position: "absolute",
    width: 330,
    height: 90,
    borderRadius: 170,
    backgroundColor: "#0E7490",
    bottom: -38,
    left: -35,
  },

  emptyWaveTwo: {
    position: "absolute",
    width: 330,
    height: 70,
    borderRadius: 170,
    backgroundColor: "#075985",
    bottom: -52,
    left: -30,
  },

  emptyBoard: {
    position: "absolute",
    width: 17,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#FFF4D6",
    left: 75,
    bottom: 22,
    transform: [{ rotate: "28deg" }],
  },

  boardLine: {
    position: "absolute",
    width: 3,
    height: 70,
    backgroundColor: "#E6C98A",
    left: 7,
    top: 15,
  },

  emptyTitle: {
    color: "#0F172A",
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
  },

  emptyText: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 290,
  },

  emptyButton: {
    marginTop: 22,
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#075985",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#075985",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  emptyButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#A5F3FC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  emptyButtonPlus: {
    color: "#075985",
    fontSize: 22,
    lineHeight: 23,
    fontWeight: "500",
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  // ====================================================
  // FLOATING CAMERA
  // ====================================================

  floatingCamera: {
    position: "absolute",
    right: 20,
    bottom: 24,
    height: 58,
    paddingHorizontal: 17,
    borderRadius: 18,
    backgroundColor: "#075985",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#075985",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },

  cameraLensOuter: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  cameraLensInner: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#0E7490",
    borderWidth: 2,
    borderColor: "#BAE6FD",
  },

  floatingCameraText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // ====================================================
  // CAMERA SCREEN
  // ====================================================

  cameraContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  camera: {
    flex: 1,
  },

  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7,89,133,0.10)",
  },

  cameraTop: {
    position: "absolute",
    top: 52,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  cameraButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(7,89,133,0.78)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "400",
  },

  cameraTitle: {
    alignItems: "center",
  },

  cameraTitleSmall: {
    color: "#BAE6FD",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  cameraTitleMain: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },

  // ====================================================
  // CAMERA GUIDE
  // ====================================================

  cameraGuide: {
    position: "absolute",
    top: "28%",
    bottom: "28%",
    left: 30,
    right: 30,
  },

  guideCornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "rgba(255,255,255,0.65)",
  },

  guideCornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 35,
    height: 35,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(255,255,255,0.65)",
  },

  guideCornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 35,
    height: 35,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "rgba(255,255,255,0.65)",
  },

  guideCornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "rgba(255,255,255,0.65)",
  },

  // ====================================================
  // CAMERA LOADING
  // ====================================================

  cameraLoading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(7,89,133,0.45)",
  },

  loadingCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraLoadingTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
  },

  cameraLoadingText: {
    color: "#BAE6FD",
    fontSize: 12,
    marginTop: 5,
  },

  // ====================================================
  // CAMERA BOTTOM
  // ====================================================

  cameraBottom: {
    position: "absolute",
    bottom: 45,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  cameraHint: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 15,
    opacity: 0.85,
  },

  captureButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  captureDisabled: {
    opacity: 0.5,
  },

  captureInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  // ====================================================
  // FULLSCREEN
  // ====================================================

  fullscreen: {
    flex: 1,
    backgroundColor: "#06283D",
    justifyContent: "center",
    alignItems: "center",
  },

  fullscreenTop: {
    position: "absolute",
    top: 52,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fullscreenSmall: {
    color: "#7DD3FC",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  fullscreenTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },

  closeFullscreen: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "300",
  },

  fullscreenImage: {
    width: "100%",
    height: "75%",
  },

  fullscreenBottom: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },

  fullscreenHint: {
    color: "#BAE6FD",
    fontSize: 12,
  },
});