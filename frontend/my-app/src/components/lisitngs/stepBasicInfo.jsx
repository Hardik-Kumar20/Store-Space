const StepBasicInfo = ({data, update, next}) => {
    
    const handleChange = (e) => {
        update({[e.target.name]: e.target.value});
    };

    return (
        <div>
            <h3>About Your Space</h3>

            <input
            name="title"
            placeholder="Listing Title"
            value={data.title}
            onChange={handleChange}
            />

            <textarea
            name="description"
            placeholder="Describe your space"
            value={data.description}
            onChange={handleChange}
            />

            <select
            name="type"
            value={data.type}
            onChange={handleChange}
            >
            <option value="">Select Type</option>
            <option value="Garage">Garage</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Room">Room</option>
            <option value="Container">Container</option>
            </select>

            <button onClick={next}>Next</button>
        </div>
    );
};

export default StepBasicInfo;