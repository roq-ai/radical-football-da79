import * as yup from 'yup';

export const trainingSessionValidationSchema = yup.object().shape({
  date: yup.date().required(),
  description: yup.string(),
  academy_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
