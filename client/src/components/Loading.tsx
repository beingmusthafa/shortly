import loading from "../assets/shortly-loading.gif";

const Loading = () => {
  return (
    <div
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      className="w-full h-full _screen-center z-30"
    >
      <img src={loading} className="h-20 w-20" alt="" />
    </div>
  );
};

export default Loading;
