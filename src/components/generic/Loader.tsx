
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          {/* Desk shape */}
          <div className="absolute bottom-0 left-0 w-20 h-3 bg-blue-600 rounded"></div>
          <div className="absolute bottom-3 left-2 w-16 h-2 bg-blue-500 rounded"></div>
          
          {/* Legs that pulse */}
          <div className="absolute bottom-0 left-3 w-2 h-8 bg-blue-700 animate-pulse"></div>
          <div className="absolute bottom-0 right-3 w-2 h-8 bg-blue-700 animate-pulse"></div>
          
          {/* Loading circles */}
          <div className="absolute top-1 left-0 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="absolute top-1 left-6 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="absolute top-1 left-12 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="absolute top-1 left-18 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
        </div>
        <p className="mt-4 text-gray-700 font-medium">Finding your desk...</p>
      </div>
    </div>
  );
};

export default Loader;