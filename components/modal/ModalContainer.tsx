import { Box, Flex } from '@theme-ui/components';
import theme, { SX } from '../../styles/theme';
import { useModal } from '../../hooks/useModal';

export interface ModalContainerProps {
  title: string;
  canClose?: boolean;
}

export default function ModalContainer({ children, title, canClose }) {
  const { closeModal } = useModal();
  return (
    <Flex sx={sx.container}>
      <Flex sx={sx.header}>
        {title}
        {canClose && (
          <Box sx={sx.closeButton} onClick={closeModal}>
            &times;
          </Box>
        )}
      </Flex>
      <Box sx={sx.content}>{children}</Box>
    </Flex>
  );
}

const sx: SX = {
  container: {
    flexDirection: 'column',
    bg: theme.colors.background,
    minWidth: ['90vw', '500px'],
  },
  header: {
    border: `1px solid ${theme.colors.text}`,
    padding: '20px',
    justifyContent: 'space-between',
  },
  content: {
    border: `1px solid ${theme.colors.text}`,
    padding: '20px',
    borderTop: 'none',
    flexGrow: 1,
  },
  closeButton: {
    cursor: 'pointer',
  },
};
