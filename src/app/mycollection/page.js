"use client";

import { useState, useEffect } from "react";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import { auth, firestore, storage, database } from "../../firebaseClient";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref as dbRef, push } from "firebase/database";

function getStoragePathFromUrl(url) {
  try {
    const startIndex = url.indexOf("/o/") + 3;
    const endIndex = url.indexOf("?");
    const fullPathEncoded = url.substring(startIndex, endIndex);
    const fullPath = decodeURIComponent(fullPathEncoded);
    return fullPath;
  } catch {
    return null;
  }
}

export default function MyCollection() {
  const [images, setImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // to reset file input
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch saved images from Firestore on component mount or user change
  useEffect(() => {
    async function fetchSavedImages() {
      setLoading(true);
      try {
        if (!user) {
          setImages([]);
          setLoading(false);
          return;
        }
        const q = query(
          collection(firestore, "userImages"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const savedImages = [];
        querySnapshot.forEach((doc) => {
          savedImages.push({ id: doc.id, ...doc.data() });
        });
        setImages(savedImages);
      } catch (error) {
        console.error("Error fetching saved images:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedImages();
  }, [user]);

  async function handleFileChange(event) {
    const files = event.target.files;
    if (files.length) {
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      setLoading(true);
      try {
        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log("Uploading file:", file.name);
          const storageReference = storageRef(
            storage,
            `userImages/${user.uid}/${file.name}-${Date.now()}`
          );
          await uploadBytes(storageReference, file);
          const downloadURL = await getDownloadURL(storageReference);
          console.log("Uploaded file URL:", downloadURL);
          const docRef = await addDoc(collection(firestore, "userImages"), {
            userId: user.uid,
            name: file.name,
            url: downloadURL,
          });
          console.log("Firestore doc created with ID:", docRef.id);
          // Save to Realtime Database
          const realtimeRef = dbRef(database, "userImagesRealtime");
          await push(realtimeRef, {
            userId: user.uid,
            name: file.name,
            url: downloadURL,
            createdAt: Date.now(),
          });
          console.log("Saved image metadata to Realtime Database");
          uploadedImages.push({ id: docRef.id, name: file.name, url: downloadURL });
        }
        setImages((prev) => [...prev, ...uploadedImages]);
        setFileInputKey(Date.now()); // reset file input
        console.log("Updated images state with new uploads");
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function removeImage(id, url) {
    setLoading(true);
    try {
      // Delete from Firestore
      await deleteDoc(doc(firestore, "userImages", id));
      // Delete from Storage
      const storagePath = getStoragePathFromUrl(url);
      if (storagePath) {
        const storageReference = storageRef(storage, storagePath);
        await deleteObject(storageReference);
      } else {
        console.error("Invalid storage path for deletion");
      }
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error removing image:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>
      <CloudinaryUpload />
      {loading && <p>Loading...</p>}
      {!user && !loading && (
        <p className="mb-4 text-red-600">Please login to add and view your images.</p>
      )}
      {images.length === 0 && !loading && user ? (
        <p>No images added yet. Use the button above to add images.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                <a
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
                >
                  View
                </a>
                <button
                  onClick={() => removeImage(img.id, img.url)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  aria-label="Remove image"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
