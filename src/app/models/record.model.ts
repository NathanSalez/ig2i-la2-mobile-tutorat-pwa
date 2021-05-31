import {DataRecord} from './data-record.model';

export interface Record {
  id: string;
  idTopic: string;
  name: string;
  recordDate: string;
  dataRecords: DataRecord[];
  creationDate: string;
}
