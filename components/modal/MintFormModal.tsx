import ModalContainer from './ModalContainer';
import { useMint } from '../../hooks/useMint';
import { Box, Flex, Input } from '@theme-ui/components';
import { Form, Formik, Field } from 'formik';
import theme, { SX } from '../../styles/theme';
import { useModal } from '../../hooks/useModal';
import { ModalType } from '../../providers/ModalManager';

export default function MintFormModal() {
  const { setName } = useMint();
  const { openModal } = useModal();
  return (
    <ModalContainer title={'Mint'} canClose={true}>
      <Box>
        <Formik
          initialValues={{ name: '', description: '' }}
          validate={(values) => {
            const errors: { name?: string } = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setName(values.name, values.description);
            setSubmitting(false);
            openModal(ModalType.MINT_CONFIRM);
          }}
        >
          {({ handleSubmit, errors }) => (
            <Form>
              <Flex sx={sx.formContainer}>
                <label htmlFor="name">Name</label>
                {errors.name && <Box sx={sx.error}>{errors.name}</Box>}
                <Field
                  id="name"
                  name="name"
                  placeholder="Name"
                  as={Input}
                  sx={sx.input}
                />
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  placeholder="Description"
                  as={Input}
                  sx={sx.input}
                />
                <Box sx={theme.button} onClick={handleSubmit}>
                  Continue
                </Box>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </ModalContainer>
  );
}

const sx: SX = {
  error: {
    padding: '10px 0 10px 0',
    color: theme.colors.error,
  },
  formContainer: {
    flexDirection: 'column',
  },
};
