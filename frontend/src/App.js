// React component
import React, { useEffect, useState } from 'react';
import axios from './axios.config';
import Select from 'react-select';

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState({});
  const [sList, setSList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = 
    sList.map((item)=>({value:item.Symptom,label:item.Symptom}))
   
    
  ;
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  const clearAll = () => {
    setSelectedOptions([]);
  };

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
  };

  const handlePredict = () => {
    const selectedValues = selectedOptions.map((option) => option.value);
    axios.post('http://localhost:5000/predict', {symptoms: selectedValues })
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getSymptoms = () => {
    axios.get('http://localhost:5000/symptoms',)
      .then(response => {
        setSList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
   getSymptoms()
}, [])
  return (
    <div>
      <h1>Health Diagnosis</h1>
      <div>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange}
        isSearchable  // Enable search
        placeholder="Select options..."
      />
      <button onClick={clearAll}>Clear All</button>
      <div>
        {selectedOptions.map((option) => (
          <span key={option.value}>
            {option.label}
            <button onClick={() => removeOption(option)}>Remove</button>
          </span>
        ))}
      </div>
      <button onClick={handlePredict}>Submit</button> {/* Add a Submit button */}
    </div>
      {/* <div>
        <label>Enter Symptoms:</label>
        {sList.map((item,i)=>{
          return(
            <div style={{display:'flex'}}>
              <p>{item.Symptom.replaceAll('_',' ')}</p>
              <input type='checkbox'
          value={i}
          onChange={(e) => setSymptoms([...symptoms+e.target.value])}/>
            </div>
          )
        })}
       
      </div> */}
      <button onClick={handlePredict}>Predict</button>
      {result.Disease && (
        <div>
          <h2>Disease: {result.Disease}</h2>
          <p>Description: {result.Disease_Description}</p>
          <p>Precautions: {result.Precautions.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
