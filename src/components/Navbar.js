"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../firebaseClient";

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white text-gray-800 p-4 fixed w-full z-50 top-0 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:underline">
            GalleryStudio
          </Link>
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          {/* Removed About and Contact Us links as per user request */}
          <Link href="/curated" className="hover:underline">Curated Pic</Link>
          <Link href="/mycollection" className="hover:underline">My Collection</Link>
          {/* Removed Artist link as per user request */}
          {user ? (
            <>
              <Link href="/profile" className="hover:underline">Profile</Link>
              <button
                onClick={() => auth.signOut()}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">Login</Link>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark mode"
            className="ml-4 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="text-2xl font-bold">Menu</div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
          {/* Removed About and Contact Us links as per user request */}
          <Link href="/curated" className="hover:underline" onClick={() => setIsOpen(false)}>Curated Pic</Link>
          <Link href="/mycollection" className="hover:underline" onClick={() => setIsOpen(false)}>My Collection</Link>
          {/* Removed Artist link as per user request */}
          {user ? (
            <>
              <Link href="/profile" className="hover:underline" onClick={() => setIsOpen(false)}>Profile</Link>
              <button
                onClick={() => {
                  auth.signOut();
                  setIsOpen(false);
                }}
                className="hover:underline text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline" onClick={() => setIsOpen(false)}>Login</Link>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark mode"
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </nav>
      </div>
    </nav>
  );
}
