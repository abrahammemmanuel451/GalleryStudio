"use client";

import { useState } from "react";

export default function CloudinaryUpload() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Use environment variables for Cloudinary config
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const unsignedUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET;

  const handleFileChange = async (event) => {
    setError(null);
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    try {
      const response = await fetch(
        `CLOUDINARY_URL=cloudinary://734131915457437:7bl2sqd_UNs6Qq7Q3kHGdnqKzV8@dkzmitknj`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setImage(data.secure_url);
      } else {
        setError("Upload failed");
      }
    } catch (err) {
      setError("Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Image to Cloudinary</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-4"
      />
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {image && (
        <div>
          <p className="mb-2">Uploaded Image:</p>
          <img src={image} alt="Uploaded" className="max-w-full rounded" />
          <p className="break-all mt-2">{image}</p>
        </div>
      )}
    </div>
  );
}
