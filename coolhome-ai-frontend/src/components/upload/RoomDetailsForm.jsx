export default function RoomDetailsForm({
  formData,
  setFormData
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="mt-10">

      <h3 className="text-xl font-semibold mb-2">
        Additional Room Details
      </h3>

      <p className="text-gray-500 mb-6">
        Current room temperature is required for accurate
        cooling analysis. Location and window direction are optional.
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Location - Optional */}
        <div>
          <label className="block mb-2 font-medium">
            Location
            <span className="text-gray-400 text-sm ml-2">
              (Optional)
            </span>
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chennai, Tamil Nadu"
            className="
              w-full
              border
              rounded-lg
              p-3
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          />

          <p className="text-sm text-gray-500 mt-1">
            Helps provide more accurate climate-based recommendations.
          </p>
        </div>

        {/* Window Direction - Optional */}
        <div>
          <label className="block mb-2 font-medium">
            Window Direction
            <span className="text-gray-400 text-sm ml-2">
              (Optional)
            </span>
          </label>

          <select
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              p-3
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          >
            <option value="">
              Not Specified
            </option>

            <option value="north">
              North
            </option>

            <option value="south">
              South
            </option>

            <option value="east">
              East
            </option>

            <option value="west">
              West
            </option>
          </select>

          <p className="text-sm text-gray-500 mt-1">
            Helps improve sunlight and ventilation analysis.
          </p>
        </div>

        {/* Temperature - Mandatory */}
        <div>
          <label className="block mb-2 font-medium">
            Current Room Temperature
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="e.g. 38"
            min="0"
            max="60"
            required
            className="
              w-full
              border
              rounded-lg
              p-3
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          />

          <p className="text-sm text-gray-500 mt-1">
            Required for accurate cooling score calculations.
          </p>
        </div>

      </div>

    </div>
  );
}