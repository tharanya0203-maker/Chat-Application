const OnlineStatus = ({ online }) => {
  return (
    <span className={online ? "online" : "offline"}>
      {online ? "🟢 Online" : "⚪ Offline"}
    </span>
  );
};

export default OnlineStatus;