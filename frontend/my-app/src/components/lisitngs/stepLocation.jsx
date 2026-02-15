const StepLocation = ({data, update, next, prev}) => {
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

            <input type="text"
                    name="city"
                    placeholder="City"
                    value={data.city}
                    onChange={handleChange}
            />
            
            <input type="text" 
                    name="state"
                    placeholder="State"
                    value={data.state}
                    onChange={handleChange}
            />

            <input type="text" 
                    name="zip"
                    placeholder="Zip Code"
                    value={data.zip}
                    onChange={handleChange}
                />

                <div>
                    <button onClick={prev}>Back</button>
                    <button onClick={next}>Next</button>
                </div>
        </div>
    )
}