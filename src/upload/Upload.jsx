import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploadedPath, setUploadedPath] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select an image first");

    const formData = new FormData();
    formData.append("image", file); // MUST match upload.single("image")

    try {
      const res = await fetch("http://localhost:3003/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.imagePath) {
        setUploadedPath(`http://localhost:3003${data.imagePath}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {uploadedPath && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedPath}
            alt="uploaded"
            width="200"
            style={{ marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default Upload;
