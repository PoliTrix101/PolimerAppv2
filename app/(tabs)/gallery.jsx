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

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import * as FileSystem from "expo-file-system/legacy";

export default function Gallery() {
  const cameraRef = useRef(null);

  // CAMERA
  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState("back");
  const [takingPicture, setTakingPicture] = useState(false);

  // GALLERY
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // FULLSCREEN IMAGE
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // ==========================================
  // DIRECTORY
  // ==========================================

  const getGalleryDirectory = () => {
    return FileSystem.documentDirectory + "gallery/";
  };

  // ==========================================
  // LOAD PHOTOS
  // ==========================================

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);

      const directory = getGalleryDirectory();

      const directoryInfo =
        await FileSystem.getInfoAsync(directory);

      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, {
          intermediates: true,
        });

        setPhotos([]);
        return;
      }

      const files =
        await FileSystem.readDirectoryAsync(directory);

      const imageFiles = files
        .filter(
          (file) =>
            file.toLowerCase().endsWith(".jpg") ||
            file.toLowerCase().endsWith(".jpeg") ||
            file.toLowerCase().endsWith(".png")
        )
        .sort()
        .reverse();

      const imageUris = imageFiles.map(
        (file) => directory + file
      );

      setPhotos(imageUris);

      console.log(
        "📂 Photos loaded:",
        imageUris.length
      );
    } catch (error) {
      console.log(
        "🔥 LOAD PHOTOS ERROR:",
        error
      );

      Alert.alert(
        "Gallery Error",
        error?.message ||
          "Could not load your saved photos."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // OPEN CAMERA
  // ==========================================

  const openCamera = async () => {
    try {
      if (!cameraPermission?.granted) {
        const permission =
          await requestCameraPermission();

        if (!permission.granted) {
          Alert.alert(
            "Camera Permission",
            "Please allow PolimerApp to access your camera."
          );

          return;
        }
      }

      setCameraReady(false);
      setCameraOpen(true);

    } catch (error) {
      console.log(
        "🔥 OPEN CAMERA ERROR:",
        error
      );

      Alert.alert(
        "Camera Error",
        error?.message ||
          "Could not open the camera."
      );
    }
  };

  // ==========================================
  // CAMERA READY
  // ==========================================

  const handleCameraReady = () => {
    console.log("📷 Camera is ready");

    setCameraReady(true);
  };

  // ==========================================
  // SWITCH CAMERA
  // ==========================================

  const switchCamera = () => {
    console.log("🔄 Switching camera");

    setCameraReady(false);

    setFacing((current) =>
      current === "back" ? "front" : "back"
    );
  };

  // ==========================================
  // CLOSE CAMERA
  // ==========================================

  const closeCamera = () => {
    setCameraOpen(false);
    setCameraReady(false);
    setTakingPicture(false);
  };

  // ==========================================
  // TAKE PHOTO
  // ==========================================

  const takePicture = async () => {
    try {
      if (!cameraRef.current) {
        Alert.alert(
          "Camera Error",
          "Camera is not available yet."
        );

        return;
      }

      if (!cameraReady) {
        Alert.alert(
          "Camera",
          "Camera is still loading. Please wait."
        );

        return;
      }

      if (takingPicture) {
        return;
      }

      setTakingPicture(true);

      console.log("📸 Taking picture...");

      // TAKE PHOTO
      const photo =
        await cameraRef.current.takePictureAsync({
          quality: 1,
        });

      console.log("📸 Photo:", photo);

      if (!photo?.uri) {
        throw new Error(
          "Camera did not return a photo."
        );
      }

      // ==========================================
      // CREATE DIRECTORY
      // ==========================================

      const directory =
        getGalleryDirectory();

      const directoryInfo =
        await FileSystem.getInfoAsync(directory);

      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(
          directory,
          {
            intermediates: true,
          }
        );
      }

      // ==========================================
      // FILE NAME
      // ==========================================

      const fileName =
        `photo_${Date.now()}.jpg`;

      const destination =
        directory + fileName;

      console.log(
        "💾 Saving photo:",
        destination
      );

      // ==========================================
      // SAVE PHOTO
      // ==========================================

      await FileSystem.copyAsync({
        from: photo.uri,
        to: destination,
      });

      console.log(
        "✅ Photo saved!"
      );

      // Add to gallery immediately
      setPhotos((currentPhotos) => [
        destination,
        ...currentPhotos,
      ]);

      Alert.alert(
        "Photo Saved! 📸",
        "Your photo has been saved to the PolimerApp Gallery.",
        [
          {
            text: "OK",
            onPress: () => {
              closeCamera();
            },
          },
        ]
      );

    } catch (error) {
      console.log(
        "🔥 TAKE PHOTO ERROR:",
        error
      );

      Alert.alert(
        "Camera Error",
        error?.message ||
          "Something went wrong while taking the picture."
      );

    } finally {
      setTakingPicture(false);
    }
  };

  // ==========================================
  // FULLSCREEN IMAGE
  // ==========================================

  const openFullscreen = (photo) => {
    console.log(
      "🖼️ Opening fullscreen:",
      photo
    );

    setSelectedPhoto(photo);
  };

  const closeFullscreen = () => {
    setSelectedPhoto(null);
  };

  // ==========================================
  // CAMERA SCREEN
  // ==========================================

  if (cameraOpen) {
    return (
      <View style={styles.cameraContainer}>

        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={handleCameraReady}
        >

          {/* TOP BUTTONS */}

          <View style={styles.cameraTop}>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={closeCamera}
            >
              <Text style={styles.cameraButtonText}>
                ✕
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={switchCamera}
            >
              <Text style={styles.cameraButtonText}>
                🔄
              </Text>
            </TouchableOpacity>

          </View>

          {/* CAMERA LOADING */}

          {!cameraReady && (
            <View style={styles.cameraLoading}>

              <ActivityIndicator
                size="large"
                color="#fff"
              />

              <Text style={styles.cameraLoadingText}>
                Starting camera...
              </Text>

            </View>
          )}

          {/* CAPTURE BUTTON */}

          <View style={styles.cameraBottom}>

            <TouchableOpacity
              style={[
                styles.captureButton,
                (!cameraReady ||
                  takingPicture) &&
                  styles.captureDisabled,
              ]}
              onPress={takePicture}
              disabled={
                !cameraReady ||
                takingPicture
              }
            >

              {takingPicture ? (
                <ActivityIndicator
                  size="large"
                  color="#222"
                />
              ) : (
                <View style={styles.captureInner} />
              )}

            </TouchableOpacity>

          </View>

        </CameraView>

      </View>
    );
  }

  // ==========================================
  // GALLERY SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.title}>
          Gallery
        </Text>

        <Text style={styles.subtitle}>
          Your saved photos
        </Text>

      </View>

      {/* CAMERA BUTTON */}

      <TouchableOpacity
        style={styles.openCameraButton}
        onPress={openCamera}
      >
        <Text style={styles.openCameraText}>
          📷 Open Camera
        </Text>
      </TouchableOpacity>

      {/* PHOTOS */}

      {loading ? (

        <View style={styles.loading}>

          <ActivityIndicator
            size="large"
          />

          <Text style={styles.loadingText}>
            Loading photos...
          </Text>

        </View>

      ) : photos.length === 0 ? (

        <View style={styles.empty}>

          <Text style={styles.emptyIcon}>
            📷
          </Text>

          <Text style={styles.emptyTitle}>
            No Photos Yet
          </Text>

          <Text style={styles.emptyText}>
            Tap "Open Camera" and take a
            picture. Your photos will appear
            here.
          </Text>

        </View>

      ) : (

        <FlatList
          data={photos}
          keyExtractor={(item) => item}
          numColumns={2}
          contentContainerStyle={styles.gallery}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (

            <TouchableOpacity
              style={styles.photoCard}
              activeOpacity={0.8}
              onPress={() =>
                openFullscreen(item)
              }
            >

              <Image
                source={{ uri: item }}
                style={styles.photo}
                resizeMode="cover"
              />

            </TouchableOpacity>

          )}
        />

      )}

      {/* ========================================
          FULLSCREEN PHOTO MODAL
      ======================================== */}

      <Modal
        visible={selectedPhoto !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closeFullscreen}
      >

        <View style={styles.fullscreenContainer}>

          {/* CLOSE BUTTON */}

          <TouchableOpacity
            style={styles.fullscreenClose}
            onPress={closeFullscreen}
          >
            <Text style={styles.fullscreenCloseText}>
              ✕
            </Text>
          </TouchableOpacity>

          {/* FULLSCREEN IMAGE */}

          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}

        </View>

      </Modal>

    </View>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },

  openCameraButton: {
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: "#222",
    alignItems: "center",
  },

  openCameraText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  // ==========================================
  // GALLERY
  // ==========================================

  gallery: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  row: {
    justifyContent: "space-between",
  },

  photoCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 3,
  },

  photo: {
    width: "100%",
    height: 180,
  },

  // ==========================================
  // LOADING
  // ==========================================

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  // ==========================================
  // EMPTY
  // ==========================================

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
  },

  // ==========================================
  // CAMERA
  // ==========================================

  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  cameraTop: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },

  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:
      "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraButtonText: {
    color: "#fff",
    fontSize: 24,
  },

  cameraLoading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      "rgba(0,0,0,0.35)",
  },

  cameraLoadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },

  cameraBottom: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  captureButton: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ccc",
  },

  captureDisabled: {
    opacity: 0.6,
  },

  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#222",
  },

  // ==========================================
  // FULLSCREEN PHOTO
  // ==========================================

  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  fullscreenImage: {
    width: "100%",
    height: "100%",
  },

  fullscreenClose: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:
      "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },

  fullscreenCloseText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

});