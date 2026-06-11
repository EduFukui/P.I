import { StyleSheet, Text, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";


type Props = {
    title: string; // Título do botão
    onPress: () => void; // Função a ser chamada quando o botão for pressionado
};

export default function ButtonCustom({ title, onPress }: Props) {
    return (
        // Exibe um botão personalizado
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary, // Cor de fundo do botão
        alignItems: "center", // Alinha o conteúdo do botão ao centro
        padding: 16, // Espaçamento interno do botão
        marginTop: 10,
        borderRadius: 12, // Raio da borda para cantos arredondados
    },
    text: {
        color: COLORS.white, // Cor do texto do botão
        fontSize: 16, // Tamanho da fonte do texto
        fontWeight: "bold", // Peso da fonte do texto
    },
});
