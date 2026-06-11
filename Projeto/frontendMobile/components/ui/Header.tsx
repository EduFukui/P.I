import { View, Text, StyleSheet } from "react-native";
// Importa as cores do aplicativo
import { COLORS } from "@/constants/colors";
import { Image } from "expo-image";

export default function Header() {
    return (
        // Exibe um cabeçalho com um título
        <View style={styles.header}>


            {/* Título do aplicativo */}
            <Text style={styles.title}>Muda SL</Text>

            {/* Logo do aplicativo */}
            <Image
                source={{
                    uri: "https://images.tcdn.com.br/img/img_prod/1308140/mitsubishi_lancer_evolution_x_1_20260122102754_43ce578a503c.jpg",
                }}
                style={styles.logo}
            />

            {/* Subtítulo do aplicativo */}
            {/* <Text style={styles.subtitle}>Bem-vindo!</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 20, // Espaçamento inferior
        alignItems: "center", // Centraliza os itens horizontalmente
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    title: {
        fontSize: 48,
        color: COLORS.dark,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.gray,
    },
});
