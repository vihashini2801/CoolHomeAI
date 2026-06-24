import { motion } from "framer-motion";

const steps = [
  "Uploading Room Image",
  "Detecting Windows",
  "Analyzing Ventilation",
  "Evaluating Sunlight Exposure",
  "Generating Recommendations",
  "Calculating Cooling Score"
];

export default function ProgressSteps() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-xl font-semibold mb-6">
        Analysis Progress
      </h2>

      <div className="space-y-4">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.5
            }}
            className="
            flex
            items-center
            gap-4
            p-3
            bg-slate-50
            rounded-lg
            "
          >

            <div
              className="
              h-4
              w-4
              bg-green-500
              rounded-full
              "
            />

            <span>{step}</span>

          </motion.div>
        ))}

      </div>

    </div>
  );
}