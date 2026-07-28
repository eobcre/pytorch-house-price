// form props
type FormState = {
  bedrooms: string;
  bathrooms: string;
  sqft_living: string;
  yr_built: string;
  zipcode: string;
};

// result props
type ResultData = {
  prediction: number;
  metrics: {
    rmse: number;
    mae: number;
    r2: number;
  };
};

type PredictionResultProps = {
  title: string;
  result: ResultData | null;
  submittedForm: FormState | null;
  formatCurrency: (value: number) => string;
};

const PredictionResult = ({ title, result, submittedForm, formatCurrency }: PredictionResultProps) => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-gray-600 font-bold">{title}</h1>
      {result !== null ? (
        <div className="flex flex-col gap-1">
          <p className="text-gray-700 text-4xl font-bold mt-1 mb-8">{formatCurrency(result.prediction)}</p>
          <div className="flex flex-col">
            <h1 className="text-gray-600 text-sm font-semibold mb-2">Estimated price for:</h1>
            <div className="flex gap-4">
              {submittedForm && (
                <div className="flex gap-4">
                  {[
                    { label: "bedrooms", value: submittedForm.bedrooms },
                    { label: "bathrooms", value: submittedForm.bathrooms },
                    { label: "sqft", value: submittedForm.sqft_living },
                    { value: submittedForm.yr_built },
                    { value: submittedForm.zipcode },
                  ].map((item, index) => (
                    <div key={index}>
                      <span className="inline-block bg-gray-300 mr-1.5 w-2 h-2" />
                      <span className="text-gray-700 mr-1">{item.value}</span>
                      <span className="text-gray-700 italic">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 italic mt-3">Enter inputs to generate a price prediction.</p>
      )}
    </div>
  );
};

export default PredictionResult;
