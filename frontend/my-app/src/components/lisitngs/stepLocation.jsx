const StepLocation = ({data, update, next, prev, errors}) => {
    const handleChange = (e) => {
        update({[e.target.name] : e.target.value});
    };

    return (
        <div>
            <h3>Location Details</h3>

            <input type="text" 
                    name="address"
                    placeholder="address"
                    value={data.address}
                    onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <input type="text"
                    name="city"
                    placeholder="City"
                    value={data.city}
                    onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
            <input type="text" 
                    name="state"
                    placeholder="State"
                    value={data.state}
                    onChange={handleChange}
            />
            {errors.state && <p className="error">{errors.state}</p>}
            <input type="text" 
                    name="zip"
                    placeholder="Zip Code"
                    value={data.zip}
                    onChange={handleChange}
                />
            {errors.zip && <p className="error">{errors.zip}</p>}
                <div className="button-group">
                    <button className="secondary-btn" onClick={prev}>Back</button>
                    <button className="primary-btn" onClick={next}>Next</button>
                </div>
        </div>
    );
};

export default StepLocation;