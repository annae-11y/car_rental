import { useState } from 'react';

export const useImageUpload = (maxSize = 5 * 1024 * 1024, maxFiles = 5) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setError('');
    setIsUploading(true);

    // Validate file count
    if (images.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      setIsUploading(false);
      return;
    }

    const validImages = [];
    let processed = 0;

    for (const file of fileArray) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        setIsUploading(false);
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        setError('Images must be 5MB or less');
        setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        validImages.push({
          url: reader.result,
          name: file.name,
          size: file.size,
          type: file.type,
          timestamp: new Date().toISOString()
        });
        processed++;
        
        if (processed === fileArray.length) {
          setImages(prev => [...prev, ...validImages]);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearImages = () => {
    setImages([]);
    setError('');
  };

  return {
    images,
    error,
    isUploading,
    handleImageUpload,
    removeImage,
    clearImages
  };
};
