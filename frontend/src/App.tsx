import { useState } from "react";

import PredictionInput from "./sections/PredictionInput";
import PredictionResult from "./sections/PredictionResult";
import ModelMetrics from "./sections/ModelMetrics";
import PredictionInsights from "./sections/PredictionInsights";
import ModelInfo from "./sections/ModelInfo";
import Loader from "./components/Loader";

// form props
type FormState = {
  bedrooms: string;
  bathrooms: string;
  sqft_living: string;
  yr_built: string;
  zipcode: string;
};

// raw data props
type PredictionResponse = {
  ok: boolean;
  raw: string;
  metrics: {
    rmse: number;
    mae: number;
    r2: number;
  };
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

const App = () => {
  const [result, setResult] = useState<ResultData | null>(null);
  const [form, setForm] = useState<FormState>({
    bedrooms: "",
    bathrooms: "",
    sqft_living: "",
    yr_built: "",
    zipcode: "",
  });
  const [submittedForm, setSubmittedForm] = useState<FormState | null>(null);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // search
  const handleSearch = async () => {
    // year built validation
    const year = Number(form.yr_built);
    const currentYear = new Date().getFullYear();
    // square feet validation
    const sqft = Number(form.sqft_living);
    // zipcode validation
    const zipcode = form.zipcode;

    // basic validation
    if (
      !form.bedrooms ||
      !form.bathrooms ||
      !form.sqft_living ||
      !form.yr_built ||
      !form.zipcode ||
      isNaN(Number(form.bedrooms)) ||
      isNaN(Number(form.bathrooms)) ||
      isNaN(Number(form.sqft_living)) ||
      isNaN(Number(form.yr_built)) ||
      isNaN(Number(form.zipcode))
    ) {
      setFormError("All fields must be filled with numbers");
      return;
    }

    // year built validation
    if (year < 1800 || year > currentYear) {
      setFormError("Year must be between 1800 and current year");
      return;
    }
    // square feet validation
    if (sqft < 300 || sqft > 20000) {
      setFormError("Square feet must be between 300 and 20000");
      return;
    }
    // zipcode validation (5 digits check)
    if (!/^\d{5}$/.test(zipcode)) {
      setFormError("Zipcode must be 5 digits");
      return;
    }

    const payload = {
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqft_living: Number(form.sqft_living),
      yr_built: Number(form.yr_built),
      zipcode: Number(form.zipcode),
    };

    setLoading(true);

    try {
      const res = await fetch(`/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Network Error...");
      }

      const data: PredictionResponse = await res.json();
      const parsed = JSON.parse(data.raw);

      setResult({
        ...parsed,
        metrics: data.metrics,
      });
      setSubmittedForm(form);

      setForm({
        bedrooms: "",
        bathrooms: "",
        sqft_living: "",
        yr_built: "",
        zipcode: "",
      });

      setFormError("");

      console.log("SUCCESS!!!", data);
    } catch (err: any) {
      console.error("ERROR...", err.message);
      setFormError("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  // format number to usd
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 bg-gray-100 p-6 min-h-screen lg:grid-cols-3 lg:p-14 lg:h-screen">
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-full lg:col-span-1">
          <PredictionInput title="Prediction Search" handleSearch={handleSearch} form={form} setForm={setForm} formError={formError} setFormError={setFormError} />
        </section>
        <div className="flex flex-col gap-4 lg:col-span-2 overflow-hidden">
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <PredictionResult title="Prediction Result" result={result} submittedForm={submittedForm} formatCurrency={formatCurrency} />
          </section>
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm flex-1 p-6 overflow-y-auto">
            <ModelMetrics title="Model Metrics" result={result} />
          </section>
          <div className="grid grid-cols-1 gap-4 flex-1 lg:grid-cols-2 overflow-hidden">
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-y-auto">
              <PredictionInsights title="Prediction Insights" result={result} formatCurrency={formatCurrency} submittedForm={submittedForm} />
            </section>
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-y-auto">
              <ModelInfo title="Model Info" result={result} />
            </section>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default App;
