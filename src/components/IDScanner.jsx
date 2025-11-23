import React, { useCallback, useMemo, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import Tesseract from 'tesseract.js';
import useStore from '../store/useStore';

function getCroppedImg(imageSrc, crop, zoom, aspect, rotation = 0) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      const cropX = (crop.x / 100) * naturalWidth;
      const cropY = (crop.y / 100) * naturalHeight;
      const cropW = (crop.width / 100) * naturalWidth;
      const cropH = (crop.height / 100) * naturalHeight;

      canvas.width = cropW;
      canvas.height = cropH;

      if (!ctx) return reject(new Error('Canvas not supported'));

      ctx.drawImage(image, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas is empty'));
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.95);
    };
    image.onerror = reject;
    image.src = imageSrc;
  });
}

const IDScanner = ({ onClose, onConfirm, expectedName }) => {
  const { currentUser, recordIdVerificationAttempt } = useStore();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [validationError, setValidationError] = useState('');

  const onSelectFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setImageSrc(reader.result));
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const validateID = (text, userName) => {
    const normalizedText = text.toLowerCase();
    const normalizedName = (userName || '').toLowerCase();
    
    // Check 1: ID type keywords
    const idTypeKeywords = ['driver', 'license', 'passport', 'national id', 'identification'];
    const hasIdType = idTypeKeywords.some(kw => normalizedText.includes(kw));
    if (!hasIdType) {
      return { valid: false, reason: 'ID type not recognized. Please use Driver\'s License, Passport, or National ID.' };
    }
    
    // Check 2: User's name in OCR text (split name and check each part) when a name is provided
    if (normalizedName) {
      const nameParts = normalizedName.split(' ').filter(p => p.length > 2);
      const hasName = nameParts.some(part => normalizedText.includes(part));
      if (!hasName) {
        return { valid: false, reason: 'Name on ID does not match your profile. Please upload your own ID.' };
      }
    }
    
    // Check 3: ID number pattern (at least 5 consecutive digits)
    const hasIdNumber = /\d{5,}/.test(text);
    if (!hasIdNumber) {
      return { valid: false, reason: 'No valid ID number detected. Ensure the photo is clear and readable.' };
    }
    
    return { valid: true };
  };

  const handleScan = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setProcessing(true);
      setValidationError('');
      const cropDataUrl = await getCroppedImg(imageSrc, {
        x: (croppedAreaPixels.x / (new Image().width || 1)) * 100,
        y: (croppedAreaPixels.y / (new Image().height || 1)) * 100,
        width: 100,
        height: 100,
      }, zoom, 4/3);

      const { data } = await Tesseract.recognize(cropDataUrl, 'eng', { logger: () => {} });
      const extractedText = data.text || '';
      setOcrText(extractedText);
      
      // Validate the ID
      const nameForValidation = expectedName || (currentUser && currentUser.name) || '';
      const validation = validateID(extractedText, nameForValidation);
      if (!validation.valid) {
        // Record failed attempt only for logged-in users
        if (currentUser) {
          recordIdVerificationAttempt(false);
        }
        setValidationError(validation.reason);
        setProcessing(false);
        return;
      }
      
      // Success: record and confirm for logged-in users
      if (currentUser) {
        recordIdVerificationAttempt(true);
      }
      onConfirm && onConfirm(cropDataUrl, extractedText);
      setProcessing(false);
      onClose && onClose();
    } catch (e) {
      setValidationError('OCR processing failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-poppins text-lg font-semibold text-charcoal">Scan Valid ID</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-charcoal">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {!imageSrc ? (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onSelectFile}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-coral file:text-white file:font-semibold hover:file:bg-red-500"
              />
              <p className="text-xs text-gray-500">Use your camera or upload a clear photo of the ID. Max 5MB.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative w-full h-72 bg-softwhite">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={4/3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  showGrid={true}
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
                <button
                  onClick={handleScan}
                  disabled={processing}
                  className={`gradient-btn text-white font-semibold px-6 py-2 rounded-lg ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {processing ? 'Scanning…' : 'Scan ID'}
                </button>
                <button
                  onClick={() => { setImageSrc(null); setOcrText(''); }}
                  className="border px-4 py-2 rounded-lg text-charcoal"
                >
                  Choose Another
                </button>
              </div>
              {ocrText && (
                <div className="bg-softwhite border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{ocrText}</p>
                </div>
              )}
              {validationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700 font-semibold">{validationError}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t text-right">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg text-charcoal">Close</button>
        </div>
      </div>
    </div>
  );
};

export default IDScanner;
