import { PlayerTrainingInterface } from 'interfaces/player-training';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  position: string;
  date_of_birth: any;
  created_at?: any;
  updated_at?: any;
  player_training?: PlayerTrainingInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {
    player_training?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  academy_id?: string;
  position?: string;
}
