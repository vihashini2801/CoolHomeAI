import { Link } from "react-router-dom";

export default function RecommendationsHeader() {
  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-5">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Left Side */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              AI Recommendations
            </h1>

            <p className="text-gray-600 mt-2 max-w-2xl">
              Personalized suggestions to improve cooling,
              sustainability, and energy efficiency in your room.
            </p>
          </div>

          {/* Right Side Navigation */}
          <div className="flex flex-wrap gap-3">

            <Link
              to="/"
              className="
                px-5 py-2.5
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-700
                font-medium
                hover:bg-gray-100
                transition
              "
            >
              🏠 Home
            </Link>

            <Link
              to="/dashboard"
              className="
                px-5 py-2.5
                rounded-xl
                bg-blue-600
                text-white
                font-medium
                hover:bg-blue-700
                transition
                shadow-md
              "
            >
              📊 Dashboard
            </Link>

            <Link
              to="/analytics"
              className="
                px-5 py-2.5
                rounded-xl
                bg-emerald-600
                text-white
                font-medium
                hover:bg-emerald-700
                transition
                shadow-md
              "
            >
              📈 Analytics
            </Link>

          </div>

        </div>

      </div>

      {/* Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500" />

    </header>
  );
}