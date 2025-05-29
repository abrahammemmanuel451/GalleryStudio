export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-6 mt-auto w-full shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} GalleryStudio. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/about" className="hover:underline text-sm text-gray-700">About</a>
          <a href="/contact" className="hover:underline text-sm text-gray-700">Contact</a>
          <a href="/privacy" className="hover:underline text-sm text-gray-700">Privacy Policy</a>
          <a href="/terms" className="hover:underline text-sm text-gray-700">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
