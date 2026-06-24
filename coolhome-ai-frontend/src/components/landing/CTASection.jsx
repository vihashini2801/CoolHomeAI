import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-100">

      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">

          Ready to Cool Your Home Naturally?

        </h2>

        <p className="mt-5 text-gray-600 text-lg">

          Discover practical cooling strategies and
          reduce energy consumption with AI-powered
          recommendations.

        </p>

        <Link
          to="/upload"
          className="inline-block mt-8 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700"
        >
          Start Analysis
        </Link>
        

      </div>

    </section>
  );
}