"use client";

import { useState, useEffect } from "react";
import { auth, firestore } from "../../firebaseClient";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
          setFullName(data.fullName || "");
          setBio(data.bio || "");
          setLocation(data.location || "");
          setProfilePic(data.profilePic || "");
        }
      } else {
        setUser(null);
        setUsername("");
        setFullName("");
        setBio("");
        setLocation("");
        setProfilePic("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    try {
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(
        docRef,
        { username, fullName, bio, location, profilePic },
        { merge: true }
      );
      await updateProfile(user, {
        displayName: fullName || username,
        photoURL: profilePic || null,
      });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <section className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p>Email: {user.email}</p>

      <div className="mb-4">
        <label className="block mb-1">Profile Picture:</label>
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-2 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
        <input
          type="text"
          placeholder="Paste image URL here"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <p className="text-sm text-gray-500 mt-1">
          You can paste an image URL or upload below.
        </p>
      </div>

      <label className="block mb-4">
        Full Name:
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
        />
      </label>

      <label className="block mb-4">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
        />
      </label>

      <label className="block mb-4">
        Bio:
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          rows={3}
        />
      </label>

      <label className="block mb-4">
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
        />
      </label>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
      {message && <p className="mt-2">{message}</p>}
    </section>
  );
}
