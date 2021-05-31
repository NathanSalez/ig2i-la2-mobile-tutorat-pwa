import { Field } from './field.model';

export interface EntryResponse {
  idEntry: String;
  field: Field;
  value: string;
}
