import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Ensure correct imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import images
import groundImg from "../assets/floormap/ground.jpg";
import upperGroundImg from "../assets/floormap/upper_ground.jpg";
import lowerGroundImg from "../assets/floormap/lower_ground.jpg";
import firstImg from "../assets/floormap/first.jpg";
import secondImg from "../assets/floormap/second.jpg";
import thirdImg from "../assets/floormap/third.jpg";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Array of image sources
const images = [
  { src: groundImg, alt: "Ground Floor" },
  { src: upperGroundImg, alt: "Upper Ground Floor" },
  { src: lowerGroundImg, alt: "Lower Ground Floor" },
  { src: firstImg, alt: "First Floor" },
  { src: secondImg, alt: "Second Floor" },
  { src: thirdImg, alt: "Third Floor" },
];
const IndoorNavigationCarousel = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Carousel className="w-full flex flex-row justify-center">
        <CarouselPrevious className="" />
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex justify-center items-center p-0">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[22rem] object-contain rounded-lg shadow-md"
                      onClick={() => handleImageClick(image.src)}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="" />
      </Carousel>

      {/* Dialog for displaying the full-screen image */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="p-0 m-24">
          <div className="flex justify-center items-center p-4">
            <img 
              src={selectedImage || ''} 
              alt="Full Screen" 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndoorNavigationCarousel;
