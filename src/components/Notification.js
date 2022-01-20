const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={isError ? "errorStyle" : "successStyle"}>{message}</div>
  );
};
