import {
  FaWind,
  FaSun,
  FaLeaf
} from "react-icons/fa";

export default function FeaturesSection() {

  const features = [
    {
      icon: <FaWind size={40} />,
      title: "Ventilation Analysis",
      desc: "Detect airflow issues and identify ventilation improvements."
    },
    {
      icon: <FaSun size={40} />,
      title: "Heat Gain Detection",
      desc: "Analyze sunlight exposure and heat-absorbing surfaces."
    },
    {
      icon: <FaLeaf size={40} />,
      title: "Eco Recommendations",
      desc: "Get sustainable and affordable cooling solutions."
    }
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">

          Smart Cooling Features

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-2xl shadow hover:shadow-xl transition"
            >
              <div className="text-blue-600">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}