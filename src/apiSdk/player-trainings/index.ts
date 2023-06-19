import axios from 'axios';
import queryString from 'query-string';
import { PlayerTrainingInterface, PlayerTrainingGetQueryInterface } from 'interfaces/player-training';
import { GetQueryInterface } from '../../interfaces';

export const getPlayerTrainings = async (query?: PlayerTrainingGetQueryInterface) => {
  const response = await axios.get(`/api/player-trainings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayerTraining = async (playerTraining: PlayerTrainingInterface) => {
  const response = await axios.post('/api/player-trainings', playerTraining);
  return response.data;
};

export const updatePlayerTrainingById = async (id: string, playerTraining: PlayerTrainingInterface) => {
  const response = await axios.put(`/api/player-trainings/${id}`, playerTraining);
  return response.data;
};

export const getPlayerTrainingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-trainings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerTrainingById = async (id: string) => {
  const response = await axios.delete(`/api/player-trainings/${id}`);
  return response.data;
};
