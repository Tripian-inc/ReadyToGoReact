import React from 'react';
import styles from './ErrorMessage.scss';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (message === undefined || message === '') return null;

  return (
    <>
      <div className={styles.errorMessage}>
        <i className="fas fa-exclamation-triangle icon-3" />
        {message}
      </div>
    </>
  );
};

export default ErrorMessage;
