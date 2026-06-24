export default function RoomSummaryCard({
  summary
}) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">

      <div className="flex items-center gap-3 mb-4">

        <div
          className="
          w-10
          h-10
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          "
        >
          🤖
        </div>

        <h2 className="font-bold text-2xl">
          AI Summary
        </h2>

      </div>

      <p className="text-gray-600 leading-8 text-lg">
        {summary}
      </p>

    </div>
  );
}