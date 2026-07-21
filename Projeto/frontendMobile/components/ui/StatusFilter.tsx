import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

const options = [
  "Todos",
  "Em aberto",
  "Em andamento",
  "Resolvido",
];

export default function StatusFilter({
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.button,
            selected === item && styles.active,
          ]}
          onPress={() => onSelect(item)}
        >
          <Text
            style={[
              styles.text,
              selected === item && styles.activeText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },

  active: {
    backgroundColor: Colors.primary,
  },

  text: {
    color: Colors.white,
    fontWeight: "600",
  },

  activeText: {
    color: "#000",
  },
});