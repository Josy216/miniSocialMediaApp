import React, { useEffect, useState } from "react";

function Getupload() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const res = await fetch("http://localhost:3003/images");
      const data = await res.json();

      setImages(data);
    };

    loadImages();
  }, []);

  return (
    <div>
      <h2>All Uploaded Images</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {images.map((img) => (
          <div key={img.id}>
            <img
              src={`http://localhost:3003${img.image_path}`}
              alt="uploaded"
              width="200"
              style={{ borderRadius: 8 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Getupload;
