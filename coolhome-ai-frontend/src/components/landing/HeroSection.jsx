import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        <div className="flex flex-col justify-center">

          <span className="text-green-600 font-semibold mb-3">
            AI FOR CLIMATE ACTION
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">

            CoolHome AI

          </h1>

          <h2 className="text-2xl text-blue-600 font-semibold mt-4">

            AI-Powered Passive Cooling Advisor

          </h2>

          <p className="text-gray-600 mt-6 text-lg">

            Upload a room image and receive intelligent
            recommendations to reduce heat, improve
            ventilation, save electricity, and create a
            climate-resilient home.

          </p>

          <div className="mt-8 flex gap-4">

            <Link
  to="/upload"
  className="
  bg-blue-600
  text-white
  px-8
  py-4
  rounded-xl
  font-semibold
  hover:bg-blue-700
  transition
  "
>
  Start Analysis
</Link>

            <button
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl"
            >
              Learn More
            </button>

          </div>

        </div>

        <div className="flex items-center justify-center">

          <div className="bg-white p-10 rounded-3xl shadow-xl">

            <div className="text-center">

              <h3 className="text-xl font-bold">

                Room Analysis

              </h3>

              <div className="mt-6 space-y-3">

                <div className="bg-red-100 p-3 rounded-lg">
                  High Sunlight Exposure
                </div>

                <div className="bg-yellow-100 p-3 rounded-lg">
                  Poor Ventilation
                </div>

                <div className="bg-green-100 p-3 rounded-lg">
                  Suggested Cooling Score: 78
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}