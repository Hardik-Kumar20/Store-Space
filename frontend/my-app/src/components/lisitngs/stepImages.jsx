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

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
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

      <div>
        <button onClick={prev}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default StepImages;
