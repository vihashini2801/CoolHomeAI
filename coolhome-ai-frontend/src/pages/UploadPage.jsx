import { useState } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import UploadArea from "../components/upload/UploadArea";
import CameraCapture from "../components/upload/CameraCapture";
import ImagePreview from "../components/upload/ImagePreview";
import RoomDetailsForm from "../components/upload/RoomDetailsForm";
import AnalyzeButton from "../components/upload/AnalyzeButton";

export default function UploadPage() {

  const [image, setImage] = useState(null);

  const [capturedImage, setCapturedImage] =
    useState(null);

  const [formData, setFormData] = useState({
    location: "",
    direction: "",
    temperature: "",
  });

  return (
    <div className="bg-slate-50 min-h-screen">

      <Navbar />

      <div className="max-w-5xl mx-auto py-16 px-6">

        <h1 className="text-4xl font-bold text-center mb-3">
          Upload Room Image
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Let CoolHome AI analyze your room and provide
          personalized cooling recommendations.
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* Upload From Gallery */}
          <UploadArea
            image={image}
            setImage={setImage}
          />

          {/* Camera Capture */}
          <CameraCapture
            setCapturedImage={setCapturedImage}
          />

          {/* Uploaded Image Preview */}
          {image && (
            <ImagePreview
              image={URL.createObjectURL(image)}
            />
          )}

          {/* Captured Image Preview */}
          {capturedImage && (
            <ImagePreview
              image={capturedImage}
            />
          )}

          {/* Room Details */}
          <RoomDetailsForm
            formData={formData}
            setFormData={setFormData}
          />

          {/* Analyze Button */}
          <AnalyzeButton
            image={image}
            capturedImage={capturedImage}
            formData={formData}
          />

        </div>

      </div>

      <Footer />

    </div>
  );
}