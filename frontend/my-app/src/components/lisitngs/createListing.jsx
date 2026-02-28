import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StepBasicInfo from "./stepBasicInfo";
import StepLocation from "./stepLocation";
import StepDetails from "./stepDetails";
import StepPricing from "./stepPricing";
import StepImages from "./stepImages";
import StepReview from "./stepReview";
import "../../styles/createListing.css"

const CreateListing = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [shake, setShake] = useState(false);
    const [listingId, setListingId] = useState(null);

    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        try{
            const data = new FormData();

            //Append text fields
            Object.keys(formData).forEach(key => {
                if(key !== "images"){
                    data.append(key, formData[key]);
                }
            })

            //Append images 
            formData.images.forEach(image => {
                data.append("images", image);
            })
            const response = await axios.post(
                "/api/listings", 
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "content-type": "multipart/form-data"
                    }
                }
            )
            console.log("Listing created", response.data);
            navigate("/dashboard");
        }
        catch(error){   
            console.error("Error creating listing", error);
        }
    }

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

    const validateStep = () => {
        let newErrors = {};
        switch (step) {
            case 1:
                if (!formData.title.trim())
                    newErrors.title = "Title is required";
    
                if (!formData.description.trim())
                    newErrors.description = "Description is required";
    
                if (!formData.type.trim())
                    newErrors.type = "Type is required";
                break;
    
            case 2:
                if (!formData.address.trim())
                    newErrors.address = "Address is required";
    
                if (!formData.city.trim())
                    newErrors.city = "City is required";
    
                if (!formData.state.trim())
                    newErrors.state = "State is required";
    
                if (!formData.zip.trim())
                    newErrors.zip = "Zip code is required";
                break;
    
            case 3:
                if (!formData.size.trim())
                    newErrors.size = "Size is required";
                else if (isNaN(formData.size))
                    newErrors.size = "Size must be a number";
                break;
    
            case 4:
                if (!formData.pricePerDay)
                    newErrors.pricePerDay = "Price is required";
                else if (isNaN(formData.pricePerDay) || Number(formData.pricePerDay) <= 0)
                    newErrors.pricePerDay = "Enter valid price";
                break;
    
            case 5:
                if (formData.images.length === 0)
                    newErrors.images = "At least one image is required";
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const nextStep = () => {
        if(!validateStep()){
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        };
        setStep(step + 1);
    }
    const prevStep = () => setStep(step - 1);

    const updateForm = (newData) => {
        setFormData(prev => ({...prev, ...newData}));

        // Remove error for the update field 
        setErrors(prev => {
            const updateErrors ={...prev};
            Object.keys(newData).forEach(key =>{
                delete updateErrors[key];
            });
            return updateErrors;
        });
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepBasicInfo data={formData} update={updateForm} next={nextStep} errors={errors} />;
            case 2:
                return <StepLocation data={formData} update={updateForm} next={nextStep} prev={prevStep} errors={errors}/>
            case 3:
                return <StepDetails data={formData} update={updateForm} next={nextStep} prev={prevStep} errors={errors}/>
            case 4:
                return <StepPricing data={formData} update={updateForm} next={nextStep} prev={prevStep} errors={errors}/>
            case 5:
                return <StepImages data={formData} update={updateForm} next={nextStep} prev={prevStep} errors={errors}/>
            case 6:
                return <StepReview data={formData} prev={prevStep} submit={handleSubmit} />
            default:
                return null;
        }
    };


    return(
        <div className="listing-container">
        <h2>List Your Space</h2>
        <ProgressBar step={step} />
        <div className={shake ? "shake" : ""}>
        {renderStep()}
        </div>
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