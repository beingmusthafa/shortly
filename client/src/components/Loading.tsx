import loading from "../assets/shortly-loading.gif";

const Loading = () => {
  return (
    <div className="min-w-full min-h-full _screen-center top-[30vh] z-30">
      <img src={loading} className="h-20 w-20" alt="" />
    </div>
  );
};

export default Loading;
