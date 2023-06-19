import { PlayerTrainingInterface } from 'interfaces/player-training';
import { AcademyInterface } from 'interfaces/academy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TrainingSessionInterface {
  id?: string;
  academy_id: string;
  coach_id: string;
  date: any;
  description?: string;
  created_at?: any;
  updated_at?: any;
  player_training?: PlayerTrainingInterface[];
  academy?: AcademyInterface;
  user?: UserInterface;
  _count?: {
    player_training?: number;
  };
}

export interface TrainingSessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  academy_id?: string;
  coach_id?: string;
  description?: string;
}
