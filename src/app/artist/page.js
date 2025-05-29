"use client";

import { useState } from "react";

export default function Artist() {
  const [artworks, setArtworks] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  function handleFileChange(event) {
    const files = event.target.files;
    if (files.length) {
      const newArtworks = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        newArtworks.push({ id: url, src: url, name: file.name });
      }
      setArtworks((prev) => [...prev, ...newArtworks]);
      setFileInputKey(Date.now());
    }
  }

  function removeArtwork(id) {
    setArtworks((prev) => prev.filter((art) => art.id !== id));
  }

  function handleSell(artwork) {
    alert(`Selling artwork: ${artwork.name} (This is a placeholder action)`);
  }

  return (
    <section className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Artist Upload & Sell Artwork</h1>
      <input
        key={fileInputKey}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {artworks.length === 0 ? (
        <p>No artworks uploaded yet. Use the file input above to upload your artwork.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {artworks.map((art) => (
            <div key={art.id} className="relative group">
              <img
                src={art.src}
                alt={art.name}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <button
                onClick={() => removeArtwork(art.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove artwork"
              >
                &times;
              </button>
              <button
                onClick={() => handleSell(art)}
                className="mt-2 w-full bg-green-600 text-white rounded-md py-1 hover:bg-green-700 transition"
              >
                Sell
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
