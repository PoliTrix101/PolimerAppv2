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

  // ===============================
  // CAMERA VIEW
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
          <View style={styles.cameraPattern} />

          {/* TOP BAR */}
          <View style={styles.cameraTop}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={closeCamera}
            >
              <Text style={styles.roundButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.cameraTitleBox}>
              <Text style={styles.cameraTitle}>
                POLIMERAPP
              </Text>
              <Text style={styles.cameraSubtitle}>
                CAMERA
              </Text>
            </View>

            <TouchableOpacity
              style={styles.roundButton}
              onPress={switchCamera}
            >
              <Text style={styles.roundButtonText}>↻</Text>
            </TouchableOpacity>
          </View>

          {/* CAMERA LOADING */}
          {!cameraReady && (
            <View style={styles.cameraLoading}>
              <ActivityIndicator
                size="large"
                color="#F4D06F"
              />

              <Text style={styles.cameraLoadingText}>
                Starting camera...
              </Text>
            </View>
          )}

          {/* BOTTOM */}
          <View style={styles.cameraBottom}>
            <Text style={styles.cameraHint}>
              Capture a special moment
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
                  color="#31572C"
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

  // ===============================
  // GALLERY SCREEN
  // ===============================

  return (
    <View style={styles.container}>
      {/* DECORATIVE BAMBOO LINES */}
      <View style={styles.topPattern}>
        <View style={styles.patternLineOne} />
        <View style={styles.patternLineTwo} />
        <View style={styles.patternLineThree} />
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.smallTitle}>
            POLIMERAPP
          </Text>

          <Text style={styles.title}>
            My Gallery
          </Text>

          <Text style={styles.subtitle}>
            Memories worth keeping
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

      {/* DECORATIVE CROSSLINE */}
      <View style={styles.crossPattern}>
        <View style={styles.crossLine} />
        <View style={styles.crossLineDiagonal} />
      </View>

      {/* CAMERA CARD */}
      <TouchableOpacity
        style={styles.cameraCard}
        activeOpacity={0.9}
        onPress={openCamera}
      >
        <View style={styles.cameraIconCircle}>
          <Text style={styles.cameraIcon}>📷</Text>
        </View>

        <View style={styles.cameraCardText}>
          <Text style={styles.cameraCardTitle}>
            Capture a Moment
          </Text>

          <Text style={styles.cameraCardSubtitle}>
            Take a new photo for your collection
          </Text>
        </View>

        <View style={styles.arrowCircle}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>

      {/* CONTENT */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator
              size="large"
              color="#31572C"
            />

            <Text style={styles.loadingText}>
              Loading your memories...
            </Text>
          </View>
        ) : photos.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyPattern}>
              <View style={styles.emptyCrossOne} />
              <View style={styles.emptyCrossTwo} />
              <Text style={styles.emptyIcon}>📷</Text>
            </View>

            <Text style={styles.emptyTitle}>
              Your Gallery is Empty
            </Text>

            <Text style={styles.emptyText}>
              Start building your collection by taking
              your first photo.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={openCamera}
            >
              <Text style={styles.emptyButtonText}>
                Open Camera
              </Text>
            </TouchableOpacity>
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
                style={[
                  styles.photoCard,
                  index % 3 === 0 && styles.tallCard,
                ]}
                activeOpacity={0.9}
                onPress={() => setSelectedPhoto(item)}
              >
                <Image
                  source={{ uri: item }}
                  style={styles.photo}
                  resizeMode="cover"
                />

                {/* PHOTO FRAME */}
                <View style={styles.photoFrame} />

                <View style={styles.photoOverlay}>
                  <Text style={styles.photoNumber}>
                    {index + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* FULLSCREEN */}
      <Modal
        visible={selectedPhoto !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <View style={styles.fullscreen}>
          <View style={styles.fullscreenPattern} />

          <TouchableOpacity
            style={styles.closeFullscreen}
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

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

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F0E4",
  },

  // ===============================
  // TOP PATTERN
  // ===============================

  topPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 130,
    overflow: "hidden",
    opacity: 0.15,
  },

  patternLineOne: {
    position: "absolute",
    width: "150%",
    height: 8,
    backgroundColor: "#31572C",
    transform: [{ rotate: "25deg" }],
    top: 30,
    left: -70,
  },

  patternLineTwo: {
    position: "absolute",
    width: "150%",
    height: 8,
    backgroundColor: "#31572C",
    transform: [{ rotate: "-25deg" }],
    top: 30,
    left: -70,
  },

  patternLineThree: {
    position: "absolute",
    width: "150%",
    height: 3,
    backgroundColor: "#A66A3F",
    transform: [{ rotate: "25deg" }],
    top: 70,
    left: -70,
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
  },

  headerText: {
    flex: 1,
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    color: "#8A5A35",
    marginBottom: 5,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#24351F",
  },

  subtitle: {
    color: "#77705F",
    fontSize: 14,
    marginTop: 5,
  },

  photoCount: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: "#31572C",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#D9A441",
    transform: [{ rotate: "3deg" }],
  },

  photoCountNumber: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "900",
  },

  photoCountText: {
    color: "#E8D9B8",
    fontSize: 9,
    fontWeight: "800",
    marginTop: 2,
  },

  // ===============================
  // CROSS PATTERN
  // ===============================

  crossPattern: {
    height: 18,
    marginHorizontal: 20,
    marginBottom: 10,
    overflow: "hidden",
    opacity: 0.3,
  },

  crossLine: {
    position: "absolute",
    left: -30,
    right: -30,
    height: 2,
    top: 8,
    backgroundColor: "#8A5A35",
    transform: [{ rotate: "8deg" }],
  },

  crossLineDiagonal: {
    position: "absolute",
    left: -30,
    right: -30,
    height: 2,
    top: 8,
    backgroundColor: "#8A5A35",
    transform: [{ rotate: "-8deg" }],
  },

  // ===============================
  // CAMERA CARD
  // ===============================

  cameraCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#31572C",
    borderWidth: 2,
    borderColor: "#D9A441",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#31572C",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  cameraIconCircle: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: "#E8D9B8",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIcon: {
    fontSize: 25,
  },

  cameraCardText: {
    flex: 1,
    marginLeft: 14,
  },

  cameraCardTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
  },

  cameraCardSubtitle: {
    color: "#DCE7D5",
    fontSize: 12,
    marginTop: 4,
  },

  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#243F20",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "#F4D06F",
    fontSize: 27,
    fontWeight: "300",
  },

  // ===============================
  // CONTENT
  // ===============================

  content: {
    flex: 1,
    backgroundColor: "#EFE7D5",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#D9A441",
  },

  gallery: {
    paddingHorizontal: 14,
    paddingBottom: 40,
  },

  row: {
    justifyContent: "space-between",
  },

  photoCard: {
    width: "48%",
    height: 190,
    marginBottom: 14,
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: "#D8CDB7",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 4,
    shadowColor: "#5D4937",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  tallCard: {
    height: 230,
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  photoFrame: {
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 12,
  },

  photoOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#31572C",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F4D06F",
  },

  photoNumber: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "900",
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
    color: "#77705F",
    marginTop: 12,
  },

  // ===============================
  // EMPTY
  // ===============================

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  emptyPattern: {
    width: 110,
    height: 110,
    borderRadius: 25,
    backgroundColor: "#DCE7D5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#31572C",
  },

  emptyCrossOne: {
    position: "absolute",
    width: 150,
    height: 4,
    backgroundColor: "#A66A3F",
    transform: [{ rotate: "45deg" }],
  },

  emptyCrossTwo: {
    position: "absolute",
    width: 150,
    height: 4,
    backgroundColor: "#A66A3F",
    transform: [{ rotate: "-45deg" }],
  },

  emptyIcon: {
    fontSize: 42,
  },

  emptyTitle: {
    color: "#24351F",
    fontSize: 23,
    fontWeight: "900",
  },

  emptyText: {
    color: "#77705F",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 22,
  },

  emptyButton: {
    backgroundColor: "#31572C",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D9A441",
  },

  emptyButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
  },

  // ===============================
  // CAMERA
  // ===============================

  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  cameraPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 170,
    backgroundColor: "rgba(49,87,44,0.15)",
  },

  cameraTop: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(244,208,111,0.7)",
  },

  roundButtonText: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "500",
  },

  cameraTitleBox: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "rgba(49,87,44,0.85)",
    borderWidth: 1,
    borderColor: "#D9A441",
    alignItems: "center",
  },

  cameraTitle: {
    color: "#F4D06F",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },

  cameraSubtitle: {
    color: "#fff",
    fontSize: 9,
    marginTop: 2,
    letterSpacing: 1,
  },

  cameraLoading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  cameraLoadingText: {
    color: "#fff",
    marginTop: 12,
  },

  cameraBottom: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  cameraHint: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 12,
    opacity: 0.85,
  },

  captureButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#D9A441",
  },

  captureDisabled: {
    opacity: 0.5,
  },

  captureInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#31572C",
    borderWidth: 4,
    borderColor: "#fff",
  },

  // ===============================
  // FULLSCREEN
  // ===============================

  fullscreen: {
    flex: 1,
    backgroundColor: "#172216",
    justifyContent: "center",
    alignItems: "center",
  },

  fullscreenPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "rgba(217,164,65,0.08)",
  },

  fullscreenImage: {
    width: "100%",
    height: "100%",
  },

  closeFullscreen: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "rgba(49,87,44,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#D9A441",
  },

  closeText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "400",
  },
});