import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  
  import COLORS from "../constants/colors";
  
  type Props = {
    title: string;
    image: string;
  };
  
  export default function CategoryCard({
    title,
    image,
  }: Props) {
    return (
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
  
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
  
          <Text style={styles.subtitle}>
            Clique para visualizar
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 20,
      marginHorizontal: 20,
    },
  
    image: {
      width: "100%",
      height: 180,
    },
  
    info: {
      padding: 15,
    },
  
    title: {
      color: COLORS.primary,
      fontWeight: "bold",
      fontSize: 18,
    },
  
    subtitle: {
      color: COLORS.gray,
      marginTop: 5,
    },
  });