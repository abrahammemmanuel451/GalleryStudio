"use client";

import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setUser(null);
  }

  if (user) {
    return (
      <section className="max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{isNewUser ? "Sign Up" : "Login"}</h1>
      <form onSubmit={isNewUser ? handleSignUp : handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isNewUser ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => setIsNewUser(!isNewUser)}
        className="mt-4 text-blue-600 underline"
      >
        {isNewUser ? "Already have an account? Login" : "New user? Sign Up"}
      </button>
    </section>
  );
}
