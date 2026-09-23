const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: isError ? "red" : "lightgreen",
    backgroundColor: isError ? "darkred" : "darkgreen",
    borderStyle: "solid",
    borderWidth: "2px",
  };

  if (message === "") {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
