import Input from "../components/Input";
import Button from "../components/Button";

type FormState = {
  bedrooms: string;
  bathrooms: string;
  sqft_living: string;
  yr_built: string;
  zipcode: string;
};

type PredictionInputProps = {
  title: string;
  handleSearch: () => Promise<void>;
  form: FormState;
  setForm: (value: FormState | ((prev: FormState) => FormState)) => void;
  formError: string;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
};

const PredictionInput = ({ title, handleSearch, form, setForm, formError, setFormError }: PredictionInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  return (
    <div className="flex flex-col gap-7 pb-6">
      <h1 className="text-gray-600 font-bold">{title}</h1>
      <div>
        {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}
        <Input label="Bedrooms" name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="e.g. 3" />
      </div>
      <Input label="Bathrooms" name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="e.g. 4" />
      <Input label="Square Feet" name="sqft_living" value={form.sqft_living} onChange={handleChange} placeholder="e.g. 1680" />
      <Input label="Year Built" name="yr_built" value={form.yr_built} onChange={handleChange} placeholder="e.g. 1980" />
      <Input label="Zip Code" name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="e.g. 98074" />
      <Button name="Search" onClick={handleSearch} />
    </div>
  );
};

export default PredictionInput;
