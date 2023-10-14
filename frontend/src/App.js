import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "tailwindcss/tailwind.css";

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState({});

  const handleSymptomSelect = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions);
  };

  const handlePredict = () => {
    const selectedValues = selectedSymptoms.map((option) => option.value);
    axios
      .post("http://127.0.0.1:5000/predict", { symptoms: selectedValues })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch symptoms from your API endpoint
    axios
      .get("http://127.0.0.1:5000/symptoms")
      .then((response) => {
        const formattedSymptoms = response.data.map((symptom) => ({
          value: symptom.Symptom,
          label: symptom.Symptom,
        }));
        setSymptoms(formattedSymptoms);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Health Diagnosis</h1>
      <div className="mb-4">
        <Select
          isMulti
          options={symptoms}
          value={selectedSymptoms}
          onChange={handleSymptomSelect}
          placeholder="Select symptoms..."
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
        onClick={handlePredict}
      >
        Predict
      </button>
      {result.Disease && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-indigo-700">
            Disease: {result.Disease}
          </h2>
          <p className="mb-2 text-gray-700">
            Description: {result.Disease_Description}
          </p>
          <div className="mb-2 text-gray-700">
            <span className="text-indigo-700 font-semibold">Precautions:</span>
          </div>
          <ul className="list-disc ml-4">
            {result.Precautions.map((precaution, index) => (
              <li key={index} className="text-gray-700">
                {precaution}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
