import AsyncStorage from "@react-native-async-storage/async-storage";
import { Report } from "@/types/Report";

const REPORTS_KEY = "@reports";

export async function getReports(): Promise<Report[]> {
  const data = await AsyncStorage.getItem(REPORTS_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export async function saveReport(report: Report) {
  const reports = await getReports();

  reports.unshift(report);

  await AsyncStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(reports)
  );
}

export async function getReportById(id: string) {
  const reports = await getReports();

  return reports.find(
    (report) => report.id === id
  );
}

export async function updateReport(
  updatedReport: Report
) {
  const reports = await getReports();

  const updated = reports.map((report) =>
    report.id === updatedReport.id
      ? updatedReport
      : report
  );

  await AsyncStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(updated)
  );
}

export async function deleteReport(id: string) {
  const reports = await getReports();

  const filtered = reports.filter(
    (report) => report.id !== id
  );

  await AsyncStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(filtered)
  );
}

export async function clearReports() {
  await AsyncStorage.removeItem(REPORTS_KEY);
}