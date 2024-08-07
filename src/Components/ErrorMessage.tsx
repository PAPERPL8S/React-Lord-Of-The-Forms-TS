import React from "react";

interface ErrorMessageProps {
  message: string;
  show: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show }) => {
  if (!show) return null;
  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
