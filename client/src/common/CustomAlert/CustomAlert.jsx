import './CustomAlert.scss';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomAlert = ({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      className='alert'
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert variant='filled' onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

CustomAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  autoHideDuration: PropTypes.number,
};

export default CustomAlert;
