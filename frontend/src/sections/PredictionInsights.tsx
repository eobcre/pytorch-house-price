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

type InsightProps = {
  title: string;
  result: ResultData | null;
  formatCurrency: (value: number) => string;
  submittedForm: FormState | null;
};

const PredictionInsights = ({ title, result, formatCurrency, submittedForm }: InsightProps) => {
  //console.log("result:", result);

  if (!result || !submittedForm) {
    return (
      <div>
        <h1 className="text-gray-600 font-bold mb-3">{title}</h1>
        <p className="col-span-2 text-gray-400 italic mt-2">Enter inputs to see the insights.</p>
      </div>
    );
  }

  // estimated range
  const low = Math.max(0, result.prediction - result.metrics.mae);
  const high = result.prediction + result.metrics.mae;

  const estimatedRangeText = `${formatCurrency(low)} - ${formatCurrency(high)}`;

  // price level
  const getPriceLevel = (price: number) => {
    if (price < 300000) return "Budget";
    if (price < 700000) return "Mid-range";
    return "High-end";
  };

  const priceLevelText = `${getPriceLevel(result.prediction)}`;

  // home size
  const getHomeSize = (sqft: number) => {
    if (sqft < 1400) return "Small home";
    if (sqft < 2500) return "Mid-size home";
    return "Large home";
  };

  const homeSizeText = `${getHomeSize(result.prediction)}`;

  // console.log("submittedForm:", submittedForm);

  // home age
  const currentYear = new Date().getFullYear();
  const homeAgeText = `${currentYear - Number(submittedForm.yr_built)} years`;

  // data
  const items = [
    { id: 1, title: "Estimated range:", desc: estimatedRangeText },
    { id: 2, title: "Price Level:", desc: priceLevelText },
    { id: 3, title: "Home Size:", desc: homeSizeText },
    { id: 4, title: "Home Age:", desc: homeAgeText },
  ];

  return (
    <div>
      <h1 className="text-gray-600 font-bold mb-3">{title}</h1>
      {items.map((item) => (
        <div key={item.id} className="col-span-2 mt-4 text-sm text-gray-600">
          <h2 className="font-semibold mb-2">{item.title}</h2>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default PredictionInsights;
