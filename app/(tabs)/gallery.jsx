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

  // ===============================
  // DIRECTORY
  // ===============================

  const getGalleryDirectory = () => {
    return FileSystem.documentDirectory + "gallery/";
  };

  // ===============================
  // LOAD PHOTOS
  // ===============================

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

  // ===============================
  // CAMERA
  // ===============================

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

  // ===============================
  // TAKE PHOTO
  // ===============================

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
        "Photo Saved! 🐾",
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

  // ===============================
  // CAMERA SCREEN
  // ===============================

  if (cameraOpen) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={() => setCameraReady(true)}
        >
          {/* TOP DECORATION */}
          <View style={styles.cameraTopGlow} />

          {/* TOP BAR */}
          <View style={styles.cameraTop}>
            <TouchableOpacity
              style={styles.cameraRoundButton}
              onPress={closeCamera}
            >
              <Text style={styles.cameraRoundText}>×</Text>
            </TouchableOpacity>

            <View style={styles.cameraTitleBox}>
              <Text style={styles.cameraTitle}>
                KUROMIAPP
              </Text>

              <Text style={styles.cameraSubtitle}>
                PET CAMERA ♡
              </Text>
            </View>

            <TouchableOpacity
              style={styles.cameraRoundButton}
              onPress={switchCamera}
            >
              <Text style={styles.cameraRoundText}>↻</Text>
            </TouchableOpacity>
          </View>

          {/* CAMERA LOADING */}
          {!cameraReady && (
            <View style={styles.cameraLoading}>
              <ActivityIndicator
                size="large"
                color="#FF5FA2"
              />

              <Text style={styles.cameraLoadingText}>
                Getting camera ready...
              </Text>
            </View>
          )}

          {/* CAMERA BOTTOM */}
          <View style={styles.cameraBottom}>
            <Text style={styles.cameraHint}>
              🐾 Capture your favorite moment ♡
            </Text>

            <TouchableOpacity
              style={[
                styles.captureButton,
                (!cameraReady || takingPicture) &&
                  styles.captureDisabled,
              ]}
              onPress={takePicture}
              disabled={!cameraReady || takingPicture}
            >
              {takingPicture ? (
                <ActivityIndicator
                  size="large"
                  color="#8E44AD"
                />
              ) : (
                <View style={styles.captureInner}>
                  <Text style={styles.captureIcon}>♡</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  // ===============================
  // GALLERY SCREEN
  // ===============================

  return (
    <View style={styles.container}>

      {/* ===============================
          DECORATIVE BACKGROUND
      =============================== */}

      <View style={styles.backgroundDecor}>
        <View style={styles.purpleBlob} />
        <View style={styles.pinkBlob} />

        <Text style={styles.decorHeart1}>♡</Text>
        <Text style={styles.decorHeart2}>♡</Text>
        <Text style={styles.decorStar1}>✦</Text>
        <Text style={styles.decorStar2}>✧</Text>
        <Text style={styles.decorPaw1}>🐾</Text>
        <Text style={styles.decorPaw2}>🐾</Text>
      </View>

      {/* ===============================
          HEADER
      =============================== */}

      <View style={styles.header}>

        <View>
          <Text style={styles.smallTitle}>
            ♡ KUROMIAPP ♡
          </Text>

          <Text style={styles.title}>
            My Gallery
          </Text>

          <Text style={styles.subtitle}>
            Little memories, big smiles 🐾
          </Text>
        </View>

        <View style={styles.photoCount}>
          <Text style={styles.photoCountNumber}>
            {photos.length}
          </Text>

          <Text style={styles.photoCountText}>
            PHOTOS
          </Text>
        </View>

      </View>

      {/* ===============================
          WELCOME BANNER
      =============================== */}

      <View style={styles.petBanner}>

        <View style={styles.petCircle}>
          <Text style={styles.petEmoji}>
            🐾
          </Text>
        </View>

        <View style={styles.petBannerText}>
          <Text style={styles.petBannerTitle}>
            Happy Memories!
          </Text>

          <Text style={styles.petBannerSubtitle}>
            Keep your cutest moments safe ♡
          </Text>
        </View>

        <Text style={styles.bannerHeart}>
          ♥
        </Text>

      </View>

      {/* ===============================
          CONTENT
      =============================== */}

      <View style={styles.content}>

        {loading ? (
          <View style={styles.center}>

            <ActivityIndicator
              size="large"
              color="#A855F7"
            />

            <Text style={styles.loadingText}>
              Loading your memories...
            </Text>

          </View>

        ) : photos.length === 0 ? (

          <View style={styles.empty}>

            <View style={styles.emptyCircle}>
              <Text style={styles.emptyPaw}>
                🐾
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No Memories Yet
            </Text>

            <Text style={styles.emptyText}>
              Your gallery is waiting for some
              cute memories!
            </Text>

            <View style={styles.emptyDecor}>
              <Text>♡</Text>
              <Text>✦</Text>
              <Text>♡</Text>
            </View>

          </View>

        ) : (

          <FlatList
            data={photos}
            keyExtractor={(item) => item}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gallery}
            columnWrapperStyle={styles.row}
            renderItem={({ item, index }) => (

              <TouchableOpacity
                style={styles.photoCard}
                activeOpacity={0.9}
                onPress={() => setSelectedPhoto(item)}
              >

                <Image
                  source={{ uri: item }}
                  style={styles.photo}
                  resizeMode="cover"
                />

                <View style={styles.photoFrame} />

                <View style={styles.photoBadge}>
                  <Text style={styles.photoBadgeText}>
                    {index + 1}
                  </Text>
                </View>

                <View style={styles.heartBadge}>
                  <Text style={styles.heartBadgeText}>
                    ♥
                  </Text>
                </View>

              </TouchableOpacity>

            )}
          />

        )}

      </View>

      {/* ===============================
          FLOATING CAMERA BUTTON
      =============================== */}

      <TouchableOpacity
        style={styles.floatingCamera}
        activeOpacity={0.85}
        onPress={openCamera}
      >

        <View style={styles.cameraIconCircle}>
          <Text style={styles.cameraIcon}>
            📷
          </Text>
        </View>

        <View>
          <Text style={styles.cameraButtonTitle}>
            Open Camera
          </Text>

          <Text style={styles.cameraButtonSubtitle}>
            Capture a memory ♡
          </Text>
        </View>

      </TouchableOpacity>

      {/* ===============================
          FULLSCREEN PHOTO
      =============================== */}

      <Modal
        visible={selectedPhoto !== null}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setSelectedPhoto(null)
        }
      >

        <View style={styles.fullscreen}>

          <View style={styles.fullscreenTop}>
            <Text style={styles.fullscreenTitle}>
              Your Memory ♡
            </Text>

            <TouchableOpacity
              style={styles.closeFullscreen}
              onPress={() =>
                setSelectedPhoto(null)
              }
            >
              <Text style={styles.closeText}>
                ×
              </Text>
            </TouchableOpacity>
          </View>

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}

          <Text style={styles.fullscreenBottom}>
            ♡ precious memory ♡
          </Text>

        </View>

      </Modal>

    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  // ===============================
  // MAIN
  // ===============================

  container: {
    flex: 1,
    backgroundColor: "#FFF8FC",
  },

  backgroundDecor: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },

  purpleBlob: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#E9D5FF",
    top: -120,
    right: -80,
  },

  pinkBlob: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "#FFD6E9",
    bottom: -100,
    left: -80,
  },

  decorHeart1: {
    position: "absolute",
    top: 120,
    left: 20,
    fontSize: 28,
    color: "#F472B6",
    fontWeight: "900",
  },

  decorHeart2: {
    position: "absolute",
    top: 200,
    right: 25,
    fontSize: 25,
    color: "#A855F7",
  },

  decorStar1: {
    position: "absolute",
    bottom: 160,
    left: 25,
    fontSize: 22,
    color: "#C084FC",
  },

  decorStar2: {
    position: "absolute",
    bottom: 100,
    right: 30,
    fontSize: 25,
    color: "#F472B6",
  },

  decorPaw1: {
    position: "absolute",
    top: 260,
    left: 15,
    fontSize: 20,
    opacity: 0.3,
  },

  decorPaw2: {
    position: "absolute",
    bottom: 230,
    right: 15,
    fontSize: 22,
    opacity: 0.3,
  },

  // ===============================
  // HEADER
  // ===============================

  header: {
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    borderBottomWidth: 3,
    borderBottomColor: "#F472B6",
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#A855F7",
    marginBottom: 5,
  },

  title: {
    fontSize: 31,
    fontWeight: "900",
    color: "#5B216B",
  },

  subtitle: {
    color: "#9C6FA8",
    fontSize: 13,
    marginTop: 5,
  },

  photoCount: {
    width: 66,
    height: 66,
    borderRadius: 22,

    backgroundColor: "#A855F7",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#F9A8D4",

    transform: [{ rotate: "4deg" }],
  },

  photoCountNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  photoCountText: {
    color: "#FCE7F3",
    fontSize: 8,
    fontWeight: "900",
    marginTop: 2,
  },

  // ===============================
  // PET BANNER
  // ===============================

  petBanner: {
    marginHorizontal: 18,
    marginTop: 14,
    marginBottom: 12,

    padding: 14,

    borderRadius: 22,

    backgroundColor: "#F3E8FF",

    borderWidth: 2,
    borderColor: "#D8B4FE",

    flexDirection: "row",
    alignItems: "center",

    elevation: 3,
  },

  petCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#F9A8D4",
  },

  petEmoji: {
    fontSize: 25,
  },

  petBannerText: {
    flex: 1,
    marginLeft: 12,
  },

  petBannerTitle: {
    color: "#7E22CE",
    fontSize: 16,
    fontWeight: "900",
  },

  petBannerSubtitle: {
    color: "#9C6FA8",
    fontSize: 11,
    marginTop: 3,
  },

  bannerHeart: {
    color: "#EC4899",
    fontSize: 22,
  },

  // ===============================
  // CONTENT
  // ===============================

  content: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    borderTopWidth: 2,
    borderTopColor: "#F5D0FE",

    paddingTop: 15,
  },

  gallery: {
    paddingHorizontal: 14,
    paddingBottom: 110,
  },

  row: {
    justifyContent: "space-between",
  },

  // ===============================
  // PHOTO CARDS
  // ===============================

  photoCard: {
    width: "48%",
    height: 190,

    marginBottom: 14,

    borderRadius: 22,

    overflow: "hidden",

    backgroundColor: "#F3E8FF",

    borderWidth: 4,
    borderColor: "#FFFFFF",

    elevation: 6,

    shadowColor: "#A855F7",
    shadowOpacity: 0.18,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  photoFrame: {
    position: "absolute",
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,

    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.7)",

    borderRadius: 17,
  },

  photoBadge: {
    position: "absolute",
    bottom: 9,
    left: 9,

    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: "#A855F7",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  photoBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  heartBadge: {
    position: "absolute",
    top: 9,
    right: 9,

    width: 29,
    height: 29,

    borderRadius: 15,

    backgroundColor: "#F472B6",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  heartBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  // ===============================
  // EMPTY
  // ===============================

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 45,
  },

  emptyCircle: {
    width: 125,
    height: 125,

    borderRadius: 63,

    backgroundColor: "#F3E8FF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 4,
    borderColor: "#F9A8D4",

    marginBottom: 20,
  },

  emptyPaw: {
    fontSize: 55,
  },

  emptyTitle: {
    color: "#6B247C",
    fontSize: 23,
    fontWeight: "900",
  },

  emptyText: {
    color: "#9C6FA8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
  },

  emptyDecor: {
    flexDirection: "row",
    gap: 18,
    marginTop: 15,

    color: "#F472B6",
    fontSize: 22,
  },

  // ===============================
  // LOADING
  // ===============================

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#9C6FA8",
    marginTop: 12,
    fontSize: 13,
  },

  // ===============================
  // FLOATING CAMERA
  // ===============================

  floatingCamera: {
    position: "absolute",

    right: 18,
    bottom: 25,

    minWidth: 190,

    paddingVertical: 12,
    paddingHorizontal: 14,

    borderRadius: 25,

    backgroundColor: "#A855F7",

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#F9A8D4",

    elevation: 10,

    shadowColor: "#7E22CE",
    shadowOpacity: 0.3,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  cameraIconCircle: {
    width: 45,
    height: 45,

    borderRadius: 23,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  cameraIcon: {
    fontSize: 22,
  },

  cameraButtonTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  cameraButtonSubtitle: {
    color: "#FCE7F3",
    fontSize: 10,
    marginTop: 2,
  },

  // ===============================
  // CAMERA
  // ===============================

  cameraContainer: {
    flex: 1,
    backgroundColor: "#160D1F",
  },

  camera: {
    flex: 1,
  },

  cameraTopGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,

    backgroundColor: "rgba(168,85,247,0.18)",
  },

  cameraTop: {
    position: "absolute",

    top: 50,
    left: 18,
    right: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  cameraRoundButton: {
    width: 48,
    height: 48,

    borderRadius: 18,

    backgroundColor: "rgba(168,85,247,0.85)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#F9A8D4",
  },

  cameraRoundText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "500",
  },

  cameraTitleBox: {
    paddingHorizontal: 20,
    paddingVertical: 9,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.95)",

    borderWidth: 2,
    borderColor: "#F472B6",

    alignItems: "center",
  },

  cameraTitle: {
    color: "#7E22CE",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },

  cameraSubtitle: {
    color: "#EC4899",
    fontSize: 8,
    marginTop: 2,
    letterSpacing: 1,
    fontWeight: "800",
  },

  cameraLoading: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(22,13,31,0.5)",
  },

  cameraLoadingText: {
    color: "#FFFFFF",
    marginTop: 12,
    fontSize: 13,
  },

  cameraBottom: {
    position: "absolute",

    bottom: 35,
    left: 0,
    right: 0,

    alignItems: "center",
  },

  cameraHint: {
    color: "#FFFFFF",
    fontSize: 12,

    marginBottom: 14,

    opacity: 0.9,
  },

  captureButton: {
    width: 92,
    height: 92,

    borderRadius: 46,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 5,
    borderColor: "#F472B6",
  },

  captureDisabled: {
    opacity: 0.5,
  },

  captureInner: {
    width: 70,
    height: 70,

    borderRadius: 35,

    backgroundColor: "#A855F7",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  captureIcon: {
    color: "#FFFFFF",
    fontSize: 30,
  },

  // ===============================
  // FULLSCREEN
  // ===============================

  fullscreen: {
    flex: 1,

    backgroundColor: "#160D1F",

    justifyContent: "center",
    alignItems: "center",
  },

  fullscreenTop: {
    position: "absolute",

    top: 50,
    left: 20,
    right: 20,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    zIndex: 10,
  },

  fullscreenTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  closeFullscreen: {
    width: 50,
    height: 50,

    borderRadius: 18,

    backgroundColor: "#A855F7",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#F472B6",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 28,
  },

  fullscreenImage: {
    width: "100%",
    height: "100%",
  },

  fullscreenBottom: {
    position: "absolute",

    bottom: 25,

    color: "#F9A8D4",

    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
});