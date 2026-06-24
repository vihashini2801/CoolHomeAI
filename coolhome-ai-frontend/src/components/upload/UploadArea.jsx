import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadArea({
  image,
  setImage
}) {

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center">

      <FaCloudUploadAlt
        size={60}
        className="mx-auto text-blue-500"
      />

      <h2 className="mt-4 text-xl font-semibold">
        Upload Room Photo
      </h2>

      <p className="text-gray-500 mt-2">
        JPG, JPEG or PNG
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mt-6"
      />

    </div>
  );
}