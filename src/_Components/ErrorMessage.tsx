import React from 'react';

type ErrorMessageProps = {
  message: string;
  show: boolean;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show }) => {
  return show ? <div className="error-message">{message}</div> : <div></div>;
};
