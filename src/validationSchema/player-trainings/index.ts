import * as yup from 'yup';

export const playerTrainingValidationSchema = yup.object().shape({
  performance_metric: yup.number().integer().required(),
  player_id: yup.string().nullable().required(),
  training_session_id: yup.string().nullable().required(),
});
