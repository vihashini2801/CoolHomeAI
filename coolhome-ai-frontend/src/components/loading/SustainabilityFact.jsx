export default function SustainabilityFact() {

  const facts = [
    "Reflective curtains can reduce indoor heat gain by up to 30%.",
    "Cross-ventilation improves thermal comfort.",
    "Indoor plants help regulate room temperature."
  ];

  const randomFact =
    facts[Math.floor(Math.random() * facts.length)];

  return (
    <div className="mt-10 bg-green-100 p-6 rounded-2xl">
      <h3 className="font-semibold">
        Sustainability Fact
      </h3>

      <p>{randomFact}</p>
    </div>
  );
}