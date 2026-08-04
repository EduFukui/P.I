export type ReportStatus =
  | "Pendente"
  | "Em andamento"
  | "Resolvido";

export interface Report {
  id: string;

  title: string;

  category: string;

  description: string;

  image: string;

  latitude: number;

  longitude: number;

  address: string;

  status: ReportStatus;

  createdAt: string;

  userId: string;

  userName: string;

  
}