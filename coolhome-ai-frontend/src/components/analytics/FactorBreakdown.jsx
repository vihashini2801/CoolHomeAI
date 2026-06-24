export default function FactorBreakdown({
  factors,
  color = "bg-blue-600",
  textColor = "text-white"
}) {
  return (
    <div className="space-y-5">

      {factors.map((factor, index) => (

        <div key={index}>

          <div className="flex justify-between mb-2">

            <span className={`${textColor} font-medium`}>
              {factor.name}
            </span>

            <span className={`${textColor} font-semibold`}>
              {factor.value}%
            </span>

          </div>

          <div className="w-full bg-white/30 rounded-full h-3">

            <div
              className={`${color} h-3 rounded-full transition-all duration-700`}
              style={{
                width: `${factor.value}%`
              }}
            />

          </div>

        </div>

      ))}
    </div>
  );
}