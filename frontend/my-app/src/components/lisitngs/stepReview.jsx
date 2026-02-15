const StepReview = ({ data, prev }) => {

    const handleSubmit = () => {
      console.log("Final Data:", data);
      alert("Listing Ready to Publish 🚀");
    };
  
    return (
      <div>
        <h3>Review Your Listing</h3>
  
        <p><strong>Title:</strong> {data.title}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Location:</strong> {data.address}, {data.city}, {data.state}</p>
        <p><strong>Size:</strong> {data.size} sq ft</p>
        <p><strong>Temperature Controlled:</strong> {data.temperatureControlled ? "Yes" : "No"}</p>
        <p><strong>Price Per Day:</strong> ${data.pricePerDay}</p>
        <p><strong>Negotiable:</strong> {data.negotiable ? "Yes" : "No"}</p>
  
        <div className="button-group">
          <button className="secondary-btn" onClick={prev}>Back</button>
          <button className="primary-btn" onClick={handleSubmit}>Publish 🚀</button>
        </div>
      </div>
    );
  };
  
  export default StepReview;
  