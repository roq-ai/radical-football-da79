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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPlayerTrainingById, updatePlayerTrainingById } from 'apiSdk/player-trainings';
import { Error } from 'components/error';
import { playerTrainingValidationSchema } from 'validationSchema/player-trainings';
import { PlayerTrainingInterface } from 'interfaces/player-training';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { TrainingSessionInterface } from 'interfaces/training-session';
import { getPlayers } from 'apiSdk/players';
import { getTrainingSessions } from 'apiSdk/training-sessions';

function PlayerTrainingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerTrainingInterface>(
    () => (id ? `/player-trainings/${id}` : null),
    () => getPlayerTrainingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlayerTrainingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlayerTrainingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/player-trainings');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlayerTrainingInterface>({
    initialValues: data,
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
            Edit Player Training
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player_training',
  operation: AccessOperationEnum.UPDATE,
})(PlayerTrainingEditPage);
