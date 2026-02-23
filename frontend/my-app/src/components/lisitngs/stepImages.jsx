import { useState } from "react";

const StepImages = ({ data, update, next, prev }) => {
  const [preview, setPreview] = useState([]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    update({ images: files });

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  return (
    <div>
      <h3>Upload Images</h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImages}
      />
      
      <div className="image-preview">
        {preview.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="preview"
            width="100"
            height="100"
          />
        ))}
      </div>

      <div className="button-group">
        <button className="secondary-btn" onClick={prev}>Back</button>
        <button className="primary-btn" onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default StepImages;
