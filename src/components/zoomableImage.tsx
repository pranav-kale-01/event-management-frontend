import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";


const ZoomableImage: React.FC<{ selectedImage: string }> = ({ selectedImage }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    setScale(1); // Reset scale when the image changes
    setPosition({ x: 0, y: 0 }); // Reset position when the image changes
  }, [selectedImage]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newScale = scale + e.deltaY * -0.001;
    if (newScale > 0.5 && newScale < 3) {
      setScale(newScale);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || !imgRef.current) return;

    const deltaX = e.movementX;
    const deltaY = e.movementY;

    setPosition({
      x: position.x + deltaX,
      y: position.y + deltaY,
    });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={selectedImage}
        alt="Zoomable"
        className="object-contain"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          className="p-2 bg-gray-500 text-white"
          onClick={() => setScale(scale + 0.1)}
        >
          +
        </Button>
        <Button
          className="p-2 bg-gray-500 text-white"
          onClick={() => setScale(scale - 0.1)}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default ZoomableImage;
