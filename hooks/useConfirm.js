import { createConfirmation } from 'react-confirm';
import Confirm from '../components/Confirm';
import { useTheme } from '@mui/material/styles';

let confirm;
if (typeof document !== 'undefined') confirm = createConfirmation(Confirm);

const useConfirm = ({
  okLabel: _okLabel,
  cancelLabel: _cancelLabel,
  variant,
  color,
} = {}) => {
  const theme = useTheme();
  const okLabel = _okLabel || 'OK';
  const cancelLabel = _cancelLabel || 'Cancel';
  return (confirmation) =>
    confirm({ confirmation, theme, cancelLabel, okLabel, color, variant });
};

export default useConfirm;
