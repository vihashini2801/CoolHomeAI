import { useRef, useState, useEffect } from "react";

export default function CameraCapture({ setCapturedImage }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    if (
      cameraOn &&
      videoRef.current &&
      streamRef.current
    ) {
      videoRef.current.srcObject =
        streamRef.current;
    }
  }, [cameraOn]);

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      streamRef.current = stream;

      setCameraOn(true);

    } catch (error) {
      console.error(error);

      alert(
        `Camera Error: ${error.message}`
      );
    }
  };

  const capturePhoto = () => {

    const canvas =
      document.createElement("canvas");

    canvas.width =
      videoRef.current.videoWidth;

    canvas.height =
      videoRef.current.videoHeight;

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0
    );

    const imageData =
      canvas.toDataURL("image/png");

    setCapturedImage(imageData);

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach(track => track.stop());
    }

    setCameraOn(false);
  };

  return (
    <div className="mt-8">

      {!cameraOn ? (

        <div className="text-center">

          <button
            onClick={startCamera}
            className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-green-700
            "
          >
            Open Camera
          </button>

        </div>

      ) : (

        <div>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="
            w-full
            h-96
            object-cover
            rounded-xl
            border
            "
          />

          <div className="text-center">

            <button
              onClick={capturePhoto}
              className="
              mt-4
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-blue-700
              "
            >
              Take Picture
            </button>

          </div>

        </div>

      )}

    </div>
  );
}