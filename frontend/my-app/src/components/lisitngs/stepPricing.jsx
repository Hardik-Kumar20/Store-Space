const StepPricing = ({ data, update, next, prev }) => {

    const handleChange = (e) => {
      update({ [e.target.name]: e.target.value });
    };
  
    return (
      <div>
        <h3>Pricing</h3>
  
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price Per Day ($)"
          value={data.pricePerDay}
          onChange={handleChange}
        />
  
        <label>
          <input
            type="checkbox"
            name="negotiable"
            checked={data.negotiable}
            onChange={(e) => update({ negotiable: e.target.checked })}
          />
          Negotiable
        </label>
  
        <div>
          <button onClick={prev}>Back</button>
          <button onClick={next}>Next</button>
        </div>
      </div>
    );
  };
  
  export default StepPricing;
  