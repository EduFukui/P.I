import { ScrollView, StyleSheet, Text } from "react-native";

// Importa o componente de saudação
// import Saudacao from "@/components/ui/Saudacao";

// Importa as cores do aplicativo
import { COLORS } from "@/constants/colors";
import Header from "@/components/ui/Header";
// import InputCustom from "@/components/ui/InputCustom";
// import ListaSecoes from "@/components/ui/ListaSecoes";
// import Loading from './../../components/ui/Loading';
import ButtonCustom from "@/components/ui/ButtomCustom";


// Componente principal da tela
export default function Tab1() {
    return (
        // Permite rolagem vertical
        <ScrollView style={styles.container}>
            {/* Exibe um título para a tela */}
            <Header></Header>
            {/* <InputCustom
                placeholder="Digite algo..."
                value=""
                onChangeText={() => {}}
            /> */}

            {/* Exibe o componente de saudação com um texto específico */}
            {/* <Saudacao texto="Bem-vindo ao Tab 1!" />
            <Saudacao texto="Bem-vindo ao Tab 2!" />
            <Saudacao texto="Bem-vindo ao Tab 3!" />

            <Text>Tech</Text>
            <ListaSecoes></ListaSecoes> */}
            {/* <Loading /> */}
            {/* <Loading></Loading> */}

                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
                    </Text>
            <Text>Descrição:</Text>
            <Text>Esse é um exemplo de descrição para o Tab 1.</Text>

            <ButtonCustom title="Clique aqui" onPress={() => {}}></ButtonCustom>

            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.secondary,
        padding: 20,
    },
});
