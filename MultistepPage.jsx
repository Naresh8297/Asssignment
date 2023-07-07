import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadFile, uploadMultipleFiles, captureGeolocation } from '../api';

const MultiStepFormPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [geolocationStatus, setGeolocationStatus] = useState('');

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async (data) => {
    try {
      // Step 3: File Upload
      const file = data.file[0];
      await uploadFile(file);

      // Step 4: Multi File Upload
      const multipleFiles = data.multipleFiles;
      await uploadMultipleFiles(multipleFiles);

      // Step 4: Geolocation
      setGeolocationStatus('Capturing geolocation...');
      const geolocation = await captureGeolocation();
      setGeolocationStatus(`Geolocation captured: ${geolocation.latitude}, ${geolocation.longitude}`);

      // Step 5: Submit
      // Handle form submission and display success message
    } catch (error) {
      // Handle error and display appropriate message
    }
  };

  return (
    <div>
      <h1>Multi-Step Form Page</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {currentStep === 1 && (
          <>
            <h2>Step 1: Basic Details</h2>
            <input type="text" {...register('name', { required: true })} placeholder="Name" />
            {errors.name && <span>Name is required</span>}

            <input type="email" {...register('email', { required: true })} placeholder="Email" />
            {errors.email && <span>Email is required</span>}

            <input type="tel" {...register('phone', { required: true })} placeholder="Phone" />
            {errors.phone && <span>Phone is required</span>}

            <button type="button" onClick={handleNextStep}>Next</button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <h2>Step 2: Address</h2>
            {/* Implement address fields */}
            <button type="button" onClick={handlePreviousStep}>Previous</button>
            <button type="button" onClick={handleNextStep}>Next</button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <h2>Step 3: File Upload</h2>
            {/* Implement file upload field */}
            <button type="button" onClick={handlePreviousStep}>Previous</button>
            <button type="button" onClick={handleNextStep}>Next</button>
          </>
        )}
        {currentStep === 4 && (
          <>
            <h2>Step 4: Multi File Upload</h2>
            {/* Implement multi file upload field */}
            <p>{geolocationStatus}</p>
            <button type="button" onClick={handlePreviousStep}>Previous</button>
            <button type="button" onClick={handleNextStep}>Next</button>
          </>
        )}
        {currentStep === 5 && (
          <>
            <h2>Step 5: Status</h2>
            {/* Implement status message */}
            <button type="button" onClick={handlePreviousStep}>Previous</button>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </div>
  );
};

export default MultiStepFormPage;
