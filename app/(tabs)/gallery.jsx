import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// Import your 3 images
import banie from "../../assets/images/banie.jpg";
import butch from "../../assets/images/butch.jpg";
import pic1 from "../../assets/images/pic1.jpg";
import pic2 from "../../assets/images/pic2.jpg";

export default function Gallery() {
  const images = [
    {
      id: 1,
      title: "Picture 1",
      source: pic1,
    },
    {
      id: 2,
      title: "Picture 2",
      source: pic2,
    },
    {
      id: 3,
      title: "Banie",
      source: banie,
    },
     {
      id: 4,
      title: "butch",
      source: butch,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Gallery</Text>

      <Text style={styles.subtitle}>
        My collection of images
      </Text>

      {images.map((image) => (
        <View style={styles.card} key={image.id}>
          <Image
            source={image.source}
            style={styles.image}
            resizeMode="cover"
          />

          <Text style={styles.imageTitle}>
            {image.title}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 220,
  },

  imageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
  },
});