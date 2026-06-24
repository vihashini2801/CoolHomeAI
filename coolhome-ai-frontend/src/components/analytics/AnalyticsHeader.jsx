import { Link } from "react-router-dom";

export default function AnalyticsHeader() {
  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Sustainability Analytics
            </h1>

            <p className="text-gray-600 mt-2">
              Detailed score breakdown and cooling performance analysis.
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              to="/"
              className="px-4 py-2 rounded-xl border hover:bg-gray-100"
            >
              🏠 Home
            </Link>

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white"
            >
              📊 Dashboard
            </Link>

            <Link
              to="/recommendations"
              className="px-4 py-2 rounded-xl bg-green-600 text-white"
            >
              💡 Recommendations
            </Link>

          </div>

        </div>

      </div>

      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500" />

    </header>
  );
}