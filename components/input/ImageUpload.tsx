import React, { useState } from "react";

const Upload: React.FC<any> = ({
  currentImg = null,
  uploadConfig,
  setImageUrl,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [src, setSrc] = useState<string | null>(currentImg);

  const uploadImage = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files ? evt.target.files[0] : null;
    if (!file) {
      alert("You must select an image to upload.");
      return;
    }

    try {
      setUploading(true);

      let formData = new FormData();
      formData.append("image", file);
      formData.append("uploadPath", uploadConfig.path);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);
      setSrc(data.url);
      setImageUrl(data.url); // Set the image URL in the parent component
    } catch (error) {
      console.error("Upload error:", error);
      alert((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setSrc(null);
    setImageUrl(null); // Reset the image URL in the parent component
  };

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      {src ? (
        <div className="mb-4">
          <div className="flex flex-col justify-center w-full rounded-full relative">
            <img
              src={src}
              alt="Uploaded"
              className="mt-2 w-full rounded-xl mx-auto"
            />
            <button
              onClick={removeImage}
              className="mt-2 btn bg-accent text-accent-content"
            >
              ❌ Upload different image
            </button>
          </div>
        </div>
      ) : uploading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <div className="mb-4">
          <div className="w-[350px] rounded-full">
            <label
              htmlFor="single"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x600px)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                id="single"
                accept="image/*"
                onChange={uploadImage}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
