# Gallery Studio

Gallery Studio is a modern web application built with Next.js that allows users to explore, curate, and manage art collections. The platform integrates Firebase for authentication and data management, and uses Tailwind CSS for styling. It features multiple pages including artist profiles, curated collections, user profiles, and contact information, providing a comprehensive experience for art enthusiasts and collectors.

## Features

- User authentication and profile management powered by Firebase
- Browse and explore curated art collections and individual artists
- Upload and manage personal art collections
- Responsive design with Tailwind CSS
- Cloudinary integration for image uploads and management
- Multiple informative pages including About, Contact, Terms, and more
- Modern Next.js app directory structure for scalable development

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [Firebase](https://firebase.google.com/) - Backend platform for authentication and database
- [Cloudinary](https://cloudinary.com/) - Cloud-based image and video management service

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gallerystudio.git
cd gallerystudio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure Firebase:

- Set up a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Copy your Firebase config and update `src/firebaseConfig.js` accordingly

4. Configure Cloudinary:

- Create a Cloudinary account at [Cloudinary](https://cloudinary.com/)
- Update the Cloudinary settings in the relevant component (`src/components/CloudinaryUpload.js`)

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
/public           # Static assets like images and icons
/src
  /app            # Next.js app directory with pages and layouts
  /components     # Reusable React components (Navbar, Footer, ThemeProvider, CloudinaryUpload, etc.)
  firebaseClient.js  # Firebase client initialization
  firebaseConfig.js  # Firebase configuration
tailwind.config.js  # Tailwind CSS configuration
next.config.mjs     # Next.js configuration
package.json        # Project dependencies and scripts
README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and Tailwind CSS.
