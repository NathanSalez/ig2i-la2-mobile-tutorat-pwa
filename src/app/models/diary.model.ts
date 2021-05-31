import {Field} from './field.model';

export interface Diary {
  id: string;
  title: string;
  goal: string;
  deadline: string;
  fields: Field[];
}
