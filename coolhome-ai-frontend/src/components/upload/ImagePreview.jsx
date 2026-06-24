export default function ImagePreview({ image }) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-4 text-lg">
        Image Preview
      </h3>

      <img
        src={image}
        alt="Room Preview"
        className="
          w-full
          max-h-[450px]
          object-cover
          rounded-xl
          border
          shadow
        "
      />
    </div>
  );
}