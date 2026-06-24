import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          CoolHome AI
        </h1>

        <div className="space-x-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            🏠 Home
          </Link>

          <Link
            to="/upload"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Analyze Room
          </Link>

        </div>

      </div>

    </nav>
  );
}