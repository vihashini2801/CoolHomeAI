import api from "./api";

export const analyzeRoom = async (
  image,
  roomData
) => {
  const formData = new FormData();

  formData.append("image", image);

  if (roomData.location) {
    formData.append("location", roomData.location);
  }

  if (roomData.direction) {
    formData.append(
      "window_direction",
      roomData.direction
    );
  }

  formData.append(
    "current_temperature",
    roomData.temperature
  );

  const response = await api.post(
    "/api/analyze-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};