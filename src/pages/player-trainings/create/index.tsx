import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPlayerTraining } from 'apiSdk/player-trainings';
import { Error } from 'components/error';
import { playerTrainingValidationSchema } from 'validationSchema/player-trainings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { TrainingSessionInterface } from 'interfaces/training-session';
import { getPlayers } from 'apiSdk/players';
import { getTrainingSessions } from 'apiSdk/training-sessions';
import { PlayerTrainingInterface } from 'interfaces/player-training';

function PlayerTrainingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PlayerTrainingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPlayerTraining(values);
      resetForm();
      router.push('/player-trainings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PlayerTrainingInterface>({
    initialValues: {
      performance_metric: 0,
      player_id: (router.query.player_id as string) ?? null,
      training_session_id: (router.query.training_session_id as string) ?? null,
    },
    validationSchema: playerTrainingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Player Training
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="performance_metric" mb="4" isInvalid={!!formik.errors?.performance_metric}>
            <FormLabel>Performance Metric</FormLabel>
            <NumberInput
              name="performance_metric"
              value={formik.values?.performance_metric}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('performance_metric', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.performance_metric && (
              <FormErrorMessage>{formik.errors?.performance_metric}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.position}
              </option>
            )}
          />
          <AsyncSelect<TrainingSessionInterface>
            formik={formik}
            name={'training_session_id'}
            label={'Select Training Session'}
            placeholder={'Select Training Session'}
            fetcher={getTrainingSessions}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.description}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player_training',
  operation: AccessOperationEnum.CREATE,
})(PlayerTrainingCreatePage);
