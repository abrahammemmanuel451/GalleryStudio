"use client";

import Image from "next/image";

const historicalPics = [
  {
    src: "/histo art.jpg",
    alt: "The Mona Lisa",
    description: "This is the famous painting Mona Lisa, created by Leonardo da Vinci between 1503 and 1506, during the Italian Renaissance.",
  },
  {
    src: "/his art.jpg",
    alt: "The medieval stone sculptures",
    description: "This image shows a set of medieval stone sculptures from the façade of Notre-Dame Cathedral in Paris, France.",
  },
  {
    src: "/histo3.jpg",
    alt: "sculpture of Buddha",
    description: "This image shows a magnificent stone sculpture of Buddha in meditation, carved directly into rock.",
  },
   {
    src: "/histo4.jpg",
    alt: "The Trevi Fountain",
    description: "This image depicts the iconic Trevi Fountain (Fontana di Trevi) in Rome, Italy, a celebrated masterpiece of late Baroque art and one of the most famous fountains in the world.",
  },
   {
    src: "/histo5.jpg",
    alt: "The medieval statue",
    description: "This image shows a statue of a medieval figure, richly dressed in ornate robes and holding a model of a castle in one hand and a sword in the other",
  },
];

const fictionalRealPics = [
  {
    src: "/fircs.jpg",
    alt: "Fictional Person 1",
    description: "The person stands gracefully in an open field, gazing toward the horizon, dressed in a flowing white skirt and a red vest over a white long-sleeved shirt.",
  },
  {
    src: "/fric1.jpg",
    alt: "Real Person 2",
    description: "This image beautifully captures a pigeon perched on the edge of a corrugated roof. The bird’s grey body, patterned wings, and iridescent reddish-purple patch on its neck make for a striking visual against the soft gradient sky.",
  },
  {
    src: "/fric2.jpg",
    alt: "Real Person 3",
    description: "This image beautifully captures a breathtaking natural scene—a crystal-clear turquoise lake surrounded by lush green hills and towering mountains.",
  },
  {
    src: "/fric3.jpg",
    alt: "Real Person 4",
    description: "This image showcases a stunning European cityscape along a serene river. A grand stone bridge with elegant arches gracefully spans the water, connecting both sides of the city.",
  },
  {
    src: "/fric4.jpg",
    alt: "Real Person 5",
    description: "This image captures the mesmerizing beauty of jellyfish drifting gracefully in the water. Their translucent, bell-shaped bodies glow against a dark background, with long, flowing tentacles adding to their ethereal presence.",
  },
];

const petPics = [
  {
    src: "/pet1.jpg",
    alt: "Pet Picture 1",
    description: "This image features a small dog with a white and brown coat, likely a terrier breed, looking directly at the camera. ",
  },
  {
    src: "/pet2.jpg",
    alt: "Pet Picture 2",
    description: "This image shows a woodpecker perched on the trunk of a tree. The bird is easily identified by its striking black and white plumage, with a vivid red patch on its head.",
  },
  {
    src: "/pet3.jpg",
    alt: "Pet Picture 3",
    description: "This image highlights a beautiful gray cat with striking blue eyes, gazing up curiously with a gentle, innocent expression.",
  },
  {
    src: "/pet4.jpg",
    alt: "Pet Picture 4",
    description: "This image melts the heart with a sleeping dog cuddled up to a tiny orange kitten, showing pure friendship and peace.",
  },
  {
    src: "/pet5.jpg",
    alt: "Pet Picture 5",
    description: "This image shows a happy golden retriever cozy under a blanket, radiating warmth and joy.",
  },
];

function PictureCard({ pic }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
      <Image
        src={pic.src}
        alt={pic.alt}
        width={150}
        height={150}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-center text-sm rounded px-2 py-1">{pic.description}</p>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { auth } from "../firebaseClient";
export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-ssans)] bg-white">
      <main className="max-w-7xl mx-auto">
        {user ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
              Welcome back, {user.displayName || user.email}!
            </h1>
            <p className="text-center mb-12 text-gray-700">
              Explore and showcase beautiful artwork in our digital gallery.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Welcome to GalleryStudio
            </h1>
            <p className="text-center mb-12 text-gray-700">
              Explore and showcase beautiful artwork in our digital gallery.
            </p>
          </>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Historical Pics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {historicalPics.map((pic, index) => (
              <PictureCard key={index} pic={pic} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Fictional and Real People Pics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {fictionalRealPics.map((pic, index) => (
              <PictureCard key={index} pic={pic} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Animals Pics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {petPics.map((pic, index) => (
              <PictureCard key={index} pic={pic} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
