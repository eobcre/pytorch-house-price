type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input = ({ label, name, value, onChange, placeholder }: InputProps) => {
  return (
    <div>
      <label htmlFor="" className="text-gray-600 text-sm font-medium">
        {label}
      </label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className="border border-gray-300 bg-white rounded p-2 w-full" />
    </div>
  );
};

export default Input;
