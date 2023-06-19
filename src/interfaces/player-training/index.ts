import { PlayerInterface } from 'interfaces/player';
import { TrainingSessionInterface } from 'interfaces/training-session';
import { GetQueryInterface } from 'interfaces';

export interface PlayerTrainingInterface {
  id?: string;
  player_id: string;
  training_session_id: string;
  performance_metric: number;
  created_at?: any;
  updated_at?: any;

  player?: PlayerInterface;
  training_session?: TrainingSessionInterface;
  _count?: {};
}

export interface PlayerTrainingGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  training_session_id?: string;
}
