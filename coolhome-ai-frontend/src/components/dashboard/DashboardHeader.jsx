import { Link } from "react-router-dom";

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              CoolHome AI Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Room Cooling Analysis Results
            </p>

            <div className="mt-3">
              <span
                className="
                px-3 py-1
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-medium
                "
              >
                ✓ Analysis Complete
              </span>
            </div>
          </div>

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
              to="/recommendations"
              className="
                px-5 py-2.5
                rounded-xl
                bg-green-600
                text-white
                font-medium
                hover:bg-green-700
                transition
                shadow-md
              "
            >
              💡 Recommendations
            </Link>

            <Link
              to="/analytics"
              className="
                px-5 py-2.5
                rounded-xl
                bg-indigo-600
                text-white
                font-medium
                hover:bg-indigo-700
                transition
                shadow-md
              "
            >
              📊 Analytics
            </Link>

          </div>

        </div>

      </div>

      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500" />

    </header>
  );
}