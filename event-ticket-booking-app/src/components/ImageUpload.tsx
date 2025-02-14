import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ImageUpload = ({
  cloudinaryUrl,
  setCloudinaryUrl,
  ticketDetails,
  setTicketDetails,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "event-booking-app-user-photo-upload");
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsx7seohr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const results = await response.json();

      if (results?.url) {
        setCloudinaryUrl(results.url);
        setTicketDetails({ ...ticketDetails, userImageUrl: results.url });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) =>
      file.type.match(/^image\/(png|jpeg|jpg|svg\+xml)$/)
    );

    if (imageFile) {
      handleUpload(imageFile);
    } else {
      toast.error("Please drop a valid image file (PNG, JPEG, JPG, or SVG)");
    }
  }, []);

  return (
    <div
      className={`h-32 md:h-52 w-36 md:w-52 rounded-lg border-4 transition-colors duration-200 relative
        ${isDragging ? "border-green-400" : "border-[#24A0B5]"}
        ${isDragging ? "bg-green-400/10" : ""}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {cloudinaryUrl ? (
        <div
          className="w-full h-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={cloudinaryUrl}
            alt=""
            className="w-full h-full object-cover aspect-auto rounded-md"
          />
          {isHovered && (
            <label
              htmlFor="photo-upload"
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition-opacity duration-200"
            >
              <img
                src="./cloud-download.svg"
                alt="Upload new"
                className="w-8 h-8"
              />
            </label>
          )}
        </div>
      ) : (
        <div className="h-full w-full rounded-md bg-[#0E464F]">
          <label
            htmlFor="photo-upload"
            className={`text-white text-center text-sm font-normal roboto h-full w-full 
              flex flex-col justify-center items-center gap-2 cursor-pointer
              ${isDragging ? "text-green-400" : ""}`}
          >
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <>
                <div>
                  <img
                    src="./cloud-download.svg"
                    alt=""
                    className={
                      isDragging
                        ? "scale-110 transition-transform duration-200"
                        : ""
                    }
                  />
                </div>
                {isDragging
                  ? "Drop image here"
                  : "Drag & drop or click to upload"}
              </>
            )}
          </label>
        </div>
      )}
      <input
        id="photo-upload"
        type="file"
        className="hidden"
        onChange={handleImageUpload}
        accept="image/png, image/jpeg, image/jpg, image/svg"
        disabled={isLoading}
      />
    </div>
  );
};

export default ImageUpload;
