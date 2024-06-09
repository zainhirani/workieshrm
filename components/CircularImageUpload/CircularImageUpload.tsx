import React, { useState } from "react";

interface CircularImageUploadProps {
  onImageChange: (file: File) => void;
}

const CircularImageUpload: React.FC<CircularImageUploadProps> = ({ onImageChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files?.[0];
    if (uploadFile) {
      const imageUrl = URL.createObjectURL(uploadFile);
      setImage(imageUrl);
      onImageChange(uploadFile);
    }
  };

  return (
    <div>
      <div
        onClick={handleImageClick}
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: image ? "" : "2px solid",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {image && (
          <img
            src={image || "default-image-url"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* <Button variant="contained" color="primary" onClick={handleImageClick}>
        Upload Photo
      </Button> */}
    </div>
  );
};

export default CircularImageUpload;
