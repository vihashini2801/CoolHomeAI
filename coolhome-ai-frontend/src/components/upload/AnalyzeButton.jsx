import { useNavigate } from "react-router-dom";
import { analyzeRoom } from "../../services/roomService";

export default function AnalyzeButton({
  image,
  capturedImage,
  formData,
}) {
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    // Validate image
    if (!image && !capturedImage) {
      alert("Please upload or capture a room image.");
      return;
    }

    // Validate temperature
    if (!formData.temperature) {
      alert("Please enter temperature.");
      return;
    }

    try {
      // Show loading page immediately
      navigate("/loading");

      // Use uploaded image if available,
      // otherwise use captured image
      const imageFile = image || capturedImage;

      const result = await analyzeRoom(
        imageFile,
        formData
      );

      console.log("========== ANALYSIS RESULT ==========");
      console.log(result);
      console.log("SUMMARY:", result?.summary);
      console.log(
        "ROOM FEATURES:",
        result?.room_features
      );
      console.log(
        "RECOMMENDATIONS:",
        result?.recommendations
      );
      console.log("====================================");

      // Save analysis result
      localStorage.setItem(
        "analysisResult",
        JSON.stringify(result)
      );

      // Save image permanently
      if (image) {
        const reader = new FileReader();

        reader.onloadend = () => {
          localStorage.setItem(
            "uploadedImage",
            reader.result
          );

          navigate("/dashboard");
        };

        reader.readAsDataURL(image);
      } else {
        // Camera image already comes as Base64
        localStorage.setItem(
          "uploadedImage",
          capturedImage
        );

        navigate("/dashboard");
      }

    } catch (error) {
      console.error(
        "Analysis Error:",
        error
      );

      localStorage.setItem(
        "analysisResult",
        JSON.stringify({
          status: "error",
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Analysis failed",
        })
      );

      navigate("/dashboard");
    }
  };

  return (
    <div className="mt-10 text-center">
      <button
        onClick={handleAnalyze}
        className="
          bg-gradient-to-r
          from-blue-600
          to-green-600
          text-white
          px-10
          py-4
          rounded-xl
          font-semibold
          hover:scale-105
          transition
          duration-300
          shadow-lg
        "
      >
        Analyze My Room
      </button>
    </div>
  );
}