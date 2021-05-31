import {Entry} from './entry.model';

export interface DailyReport {
  id: string|undefined;
  title: string|undefined;
  date: Date;
  entryList: Entry[];
}
