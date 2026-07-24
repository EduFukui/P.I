import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "@/constants/Colors";

type Props = {
  title: string;
  image: string;
};

export default function BannerCard({ title, image }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}
        imageStyle={styles.imageBorder}
      >
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 190,
    justifyContent: "flex-end",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 18,
  },

  imageBorder: {
    borderRadius: 18,
  },

  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,.45)",
    padding: 8,
    borderRadius: 10,
  },
});