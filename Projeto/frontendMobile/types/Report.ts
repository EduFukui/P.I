export interface Report {
    id: string;
    title: string;
    description: string;
    status: "Em aberto" | "Em andamento" | "Resolvido";
    image: string;
    latitude: number;
    longitude: number;
    date: string;
  }