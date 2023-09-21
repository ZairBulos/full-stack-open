import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

function Notification() {
  const notification = useSelector(state => state.notification);

  if (!notification) return null;

  return (
    <Alert variant='light'>
      {notification}
    </Alert>
  );
}

export default Notification;