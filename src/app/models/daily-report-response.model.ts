import { EntryResponse } from './entry.response.model';

export interface DailyReportResponse {
  idDailyReport: string;
  date: Date;
  entryList: EntryResponse[];
}
