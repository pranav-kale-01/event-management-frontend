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
    <div className="mx-auto border px-2 w-fit">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="flex flex-row justify-center h-fit"
      >
        <CarouselPrevious className="absolute inset-y-0 left-0 my-auto z-10 translate-y-2 aspect-square py-6" />
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="flex flex-col items-center p-1 h-full w-full cursor-pointer"
                onClick={() => handleImageClick(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className=" max-h-[22rem] object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute inset-y-0 right-0 my-auto z-10 translate-y-2 aspect-square py-6" />
      </Carousel>

      {/* Dialog for displaying the full-screen image */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="flex justify-center items-center p-0 m-auto w-screen h-screen max-w-[90vw]">
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={selectedImage || ""}
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
