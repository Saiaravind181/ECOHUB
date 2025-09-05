export const Button = ({ text, onClick }) => {
  return (
    
    <button
      onClick={onClick}
      className="relative inline-block px-8 py-3 font-semibold text-white transition-all duration-300 ease-out bg-secondary shadow-md hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="absolute inset-0 border border-primary bg-secondary -translate-x-2 translate-y-2"></span>
      <span className="relative top-2 right-2">{text}</span>
    </button>
  );
};




