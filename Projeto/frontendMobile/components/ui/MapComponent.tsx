// Importa o hook para gerenciar o marcador selecionado pelo usuário
import { useState } from "react";
// Importa os componentes de folha de estilo e container nativos do React Native
import { StyleSheet, View } from "react-native";
// Importa o componente de mapa e o gerador de pinos marcadores
import MapView, { Marker } from "react-native-maps";

// Importa o componente visual customizado que exibe os detalhes do relato
import ReportMarkerCard from "@/components/ui/ReportMakerCard";

// Cria uma lista estática de objetos (relatos) contendo as informações e coordenadas
const reports = [
  {
    id: 1,
    title: "Buraco na Rua Acácias",
    description: "Buraco grande causando risco para veículos.",
    latitude: -29.754,
    longitude: -51.148,
    status: "Em aberto",
  },
  {
    id: 2,
    title: "Poste sem iluminação",
    description: "A rua fica totalmente escura durante a noite.",
    latitude: -29.756,
    longitude: -51.150,
    status: "Em andamento",
  },
];

// Define e exporta o componente principal do mapa de relatos
export default function MapComponent() {
  // Cria um estado para armazenar qual relato foi clicado (inicia como nulo)
  const [selected, setSelected] = useState<any>(null);

  // Renderiza a interface do componente na tela
  return (
    // Container principal configurado para ocupar toda a tela disponível
    <View style={{ flex: 1 }}>
      {/* Renderiza a tela do mapa interativo */}
      <MapView
        // Aplica o estilo CSS para o mapa expandir em tela cheia
        style={styles.map}
        // Define as coordenadas geográficas de foco e zoom iniciais do mapa
        initialRegion={{
          latitude: -29.754,
          longitude: -51.148,
          latitudeDelta: 0.015, // Controla o zoom vertical do mapa
          longitudeDelta: 0.015, // Controla o zoom horizontal do mapa
        }}
      >
        {/* Percorre a lista de relatos e transforma cada um em um marcador visual */}
        {reports.map((report) => (
          <Marker
            // Define uma chave única obrigatória pelo React para cada item da lista
            key={report.id}
            // Passa o objeto contendo a latitude e longitude exatas do pino
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            // Define a cor de estilização do pino marcador no mapa
            pinColor="#B7FF00"
            // Ao clicar no pino, salva o objeto do relato atual dentro do estado 'selected'
            onPress={() => setSelected(report)}
          />
        ))}
      </MapView>

      {/* Condicional: Se 'selected' não for nulo, renderiza o card com as infos na tela */}
      {selected && (
        // Passa o relato armazenado no estado para dentro do componente visual do card
        <ReportMarkerCard report={selected} />
      )}
    </View>
  );
}

// Cria e agrupa as regras de estilização CSS do componente
const styles = StyleSheet.create({
  map: {
    flex: 1, // Faz com que o mapa preencha 100% do espaço do seu container pai
  },
});
