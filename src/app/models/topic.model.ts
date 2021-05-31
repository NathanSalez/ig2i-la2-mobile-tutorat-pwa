import {Record} from './record.model';
import {User} from './user.model';

export interface Topic {
  id: string;
  name: string;
  creationDate: string;
  records: Record;
  user: User;
}
