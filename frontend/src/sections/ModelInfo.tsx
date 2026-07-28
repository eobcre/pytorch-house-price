// result props
type ResultData = {
  prediction: number;
  metrics: {
    rmse: number;
    mae: number;
    r2: number;
  };
};

type ModelInfoProps = {
  title: string;
  result: ResultData | null;
};

const ModelInfo = ({ title, result }: ModelInfoProps) => {
  const items = [
    { id: 1, title: "Algorithm:", desc: `Random Forest Regressor` },
    { id: 2, title: "Features:", desc: `bedrooms, bathrooms, sqft_living, yr_built, zipcode` },
    { id: 3, title: "Dataset:", desc: `House Sales in King County, USA` },
  ];

  return (
    <div>
      <h1 className="text-gray-600 font-bold">{title}</h1>
      {result !== null ? (
        <>
          {items.map((item) => (
            <div key={item.id} className="col-span-2 text-gray-600 text-sm mt-4">
              <h2 className="font-semibold mb-2">{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          ))}
        </>
      ) : (
        <p className="col-span-2 text-gray-400 italic mt-2">Enter inputs to see the model info.</p>
      )}
    </div>
  );
};

export default ModelInfo;
