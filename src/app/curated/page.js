"use client";

import { useEffect, useState } from "react";

export default function Curated() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Replace with your actual API key and endpoint
  const API_KEY = "4pxDtwprvtxRmQPALmBY6oE0HmKFkZme5Wv7Uss84Vv66fLJ3uWeKtMB";
  const API_URL = "https://api.pexels.com/v1/curated";

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?page=${page}&per_page=24`, {
          headers: {
            Authorization: API_KEY,
          },
        });
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Error fetching curated photos:", error);
        alert("Failed to fetch curated photos. Please check your network connection and API key.");
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <section className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Curated Pictures</h1>
      {loading ? (
        <p>Loading curated photos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group rounded-lg overflow-hidden shadow-lg">
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-48"
                >
                  <img
                    src={photo.src.small}
                    alt={photo.alt || "Curated photo"}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
                  />
                </a>
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
                  >
                    View
                  </a>
                  <a
                    href={photo.src.original}
                    download
                    className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
