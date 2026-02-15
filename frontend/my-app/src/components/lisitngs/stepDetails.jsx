const StepDetails = ({ data, update, next, prev }) => {

    const handleCheckbox = (e) => {
      update({ [e.target.name]: e.target.checked });
    };
  
    return (
      <div>
        <h3>Space Details</h3>
  
        <input
          type="number"
          name="size"
          placeholder="Size (sq ft)"
          value={data.size}
          onChange={(e) => update({ size: e.target.value })}
        />
  
        <label>
          <input
            type="checkbox"
            name="temperatureControlled"
            checked={data.temperatureControlled}
            onChange={handleCheckbox}
          />
          Temperature Controlled
        </label>
  
        <label>
          <input
            type="checkbox"
            name="securityCameras"
            checked={data.securityCameras}
            onChange={handleCheckbox}
          />
          Security Cameras
        </label>
  
        <label>
          <input
            type="checkbox"
            name="access24hr"
            checked={data.access24hr}
            onChange={handleCheckbox}
          />
          24/7 Access
        </label>
  
        <div>
          <button onClick={prev}>Back</button>
          <button onClick={next}>Next</button>
        </div>
      </div>
    );
  };
  
  export default StepDetails;
  