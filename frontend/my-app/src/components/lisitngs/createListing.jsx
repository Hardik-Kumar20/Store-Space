import { useState } from "react";
import StepBasicInfo from "./stepBasicInfo";
import StepLocation from "./stepLocation";
import StepDetails from "./stepDetails";
import StepPricing from "./stepPricing";
import StepImages from "./stepImages";
import StepReview from "./stepReview";
import "../../styles/createListing.css"

const CreateListing = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        size: "",
        temperatureControlled: false,
        securityCameras: false,
        access24hr: false,
        pricePerDay: "",
        negotiable: false,
        images: []
    })

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const updateForm = (newData) => {
        setFormData(prev => ({...prev, ...newData}));
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepBasicInfo data={formData} update={updateForm} next={nextStep} />;
            case 2:
                return <StepLocation data={formData} update={updateForm} next={nextStep} prev={prevStep}/>
            case 3:
                return <StepDetails data={formData} update={updateForm} next={nextStep} prev={prevStep}/>
            case 4:
                return <StepPricing data={formData} update={updateForm} next={nextStep} prev={prevStep}/>
            case 5:
                return <StepImages data={formData} update={updateForm} next={nextStep} prev={prevStep}/>
            case 6:
                return <StepReview data={formData} prev={prevStep}/>
            default:
                return null;
        }
    };


    return(
        <div className="listing-container">
        <h2>List Your Space</h2>
        <ProgressBar step={step} />
        {renderStep()}
      </div>
    );
  };
  
  const ProgressBar = ({ step }) => {
    const percentage = (step / 6) * 100;
    return (
      <div style={{ marginBottom: "20px" }}>
        <div style={{
          height: "8px",
          background: "#ddd",
          borderRadius: "4px"
        }}>
          <div style={{
            height: "8px",
            width: `${percentage}%`,
            background: "#4CAF50",
            borderRadius: "4px"
          }} />
          </div>
          </div>
    );

};

export default CreateListing;