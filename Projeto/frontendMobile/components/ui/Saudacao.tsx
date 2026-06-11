// Importa o text
import { Text } from "react-native";
// construindo o componente
export default function Saudacao(
    // props recebidaas pelo componente
    props: { texto: string },
) {
    return (
        // Exibe um texto na tela
        <Text>
            {/* Mostra uma mensagem utilizando as props */}
            Olá, {props.texto}
        </Text>
    );
}
