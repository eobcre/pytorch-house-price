const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-500/40 z-50 rounded-2xl">
      <div className="flex gap-2">
        <span className="bg-white rounded-full animate-bounce [animation-delay:-0.3s] w-3 h-3"></span>
        <span className="bg-white rounded-full animate-bounce [animation-delay:-0.15s] w-3 h-3"></span>
        <span className="bg-white rounded-full animate-bounce w-3 h-3"></span>
      </div>
    </div>
  );
};

export default Loader;
