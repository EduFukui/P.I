import {TextInput, StyleSheet} from "react-native";

// Importa as cores do aplicativo
import { COLORS } from "@/constants/colors";


// Define as propriedades esperadas para o componente
type Props = {
    placeholder: string; // Texto de placeholder para o input
    value: string; // Valor atual do input
    onChangeText: (text: string) => void; // Função para lidar com mudanças no texto
}

export default function InputCustom({placeholder, value, onChangeText}: Props) {
    return (
        // Exibe um campo de texto personalizado
        <TextInput
            placeholder={placeholder} // Define o placeholder a partir das props
            value={value} // Define o valor do input a partir das props
            onChangeText={onChangeText} // Define a função de mudança de texto a partir das props
            style={styles.input} // Aplica os estilos definidos
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%", // Largura total do contêiner pai
        height: 40, // Altura do input
        borderColor: COLORS.white, // Cor da borda
        borderRadius: 12, // Raio da borda para cantos arredondados
        marginBottom: 10, // Espaçamento inferior
        backgroundColor: COLORS.white, // Cor de fundo do input
    },
});