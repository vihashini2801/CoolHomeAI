export default function RoomImageCard({ image }) {

  if (!image) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Uploaded Room
        </h2>

        <div
          className="
          h-80
          flex
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-gray-500
          "
        >
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold mb-5">
        Uploaded Room
      </h2>

      <img
        src={image}
        alt="Room"
        className="
          w-full
          h-[420px]
          object-cover
          rounded-2xl
          border
        "
      />

    </div>
  );
}