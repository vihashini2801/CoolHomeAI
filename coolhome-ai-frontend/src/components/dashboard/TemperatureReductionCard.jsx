export default function TemperatureReductionCard({
  current,
  future
}) {

  const reduction = current - future;

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

      <h2 className="font-bold text-2xl text-slate-800">
        Estimated Temperature Reduction
      </h2>

      <p className="text-gray-500 mt-1">
        Expected improvement after recommendations
      </p>

      <div className="flex justify-center items-center gap-8 mt-10">

        <div className="text-center">

          <p className="text-gray-500 mb-2">
            Current
          </p>

          <p className="text-5xl font-bold text-red-500">
            {current}°
          </p>

        </div>

        <div className="text-4xl text-gray-400">
          →
        </div>

        <div className="text-center">

          <p className="text-gray-500 mb-2">
            Improved
          </p>

          <p className="text-5xl font-bold text-green-600">
            {future}°
          </p>

        </div>

      </div>

      <div className="mt-8 text-center">

        <span
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            bg-green-100
            text-green-700
            font-semibold
          "
        >
          ↓ {reduction}°C Reduction
        </span>

      </div>

    </div>
  );
}