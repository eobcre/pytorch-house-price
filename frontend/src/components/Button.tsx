type ButtonType = {
  name: string;
  onClick: () => void;
};

const Button = ({ name, onClick }: ButtonType) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white rounded cursor-pointer shadow-md transition duration-150 hover:translate-y-1 hover:shadow-sm p-3">
      {name}
    </button>
  );
};

export default Button;
