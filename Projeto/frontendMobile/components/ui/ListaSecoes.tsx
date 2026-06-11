import { Text, View, StyleSheet, SectionList } from "react-native";

// Componente
export default function ListaSecoes() {
    // Dados para a seção
    const dados = [
        {
            title: "Front-end",
            data: ["HTML", "CSS", "JavaScript"],
        },
        {
            title: "Back-end",
            data: ["Node.js", "Express", "Typescript"],
        },
        {
            title: "Ferramentas",
            data: ["Git", "Git-Hub", "VsCode"],
        },
    ];

    return (
        <SectionList
            sections={dados}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.item}>{item}</Text>
                </View>
            )}
        />
    );
}
const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        fontWeight: "bold",
        borderRadius: 8,
        marginTop: 15,
        color: "#065f46",
    },
    item: {
        fontSize: 18,
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
    },
});
