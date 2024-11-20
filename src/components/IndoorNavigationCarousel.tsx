import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import groundImg from "../assets/floormap/ground.jpg";
import upperGroundImg from "../assets/floormap/upper_ground.jpg";
import lowerGroundImg from "../assets/floormap/lower_ground.jpg";
import firstImg from "../assets/floormap/first.jpg";
import secondImg from "../assets/floormap/second.jpg";
import thirdImg from "../assets/floormap/third.jpg";
import ZoomableImage from "./zoomableImage";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type SectionedImages = {
  [sectionName: string]: { src: string; alt: string }[];
};

// Initial sectioned images
const initialSectionedImages: SectionedImages = {
  "Classrooms": [
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003181/4th%20floor%20indoor/heycx3lkfqlztfs7gnhm.jpg", alt: "Image 1" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003180/4th%20floor%20indoor/slbpu25td6gj3tuld9c8.jpg", alt: "Image 2" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/bc2nyerci1qrpdevdxyh.jpg", alt: "Image 2" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/h7dui9iwn7s42wved3hu.jpg", alt: "Image 2" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003178/4th%20floor%20indoor/zz9lp8jvmpfxo4eqwsba.jpg", alt: "Image 2" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003178/4th%20floor%20indoor/arv2owbovznue7y2o9oj.jpg", alt: "Image 2" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003177/4th%20floor%20indoor/ih6brml8otiewbtorntx.jpg", alt: "Image 2" },
  ],
  "Seminar Hall": [
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/kz6fuzwx5lifczieu0za.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/pea3efyi4ofauhs2p86h.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/k4ysk1mqseu0k9agtlvo.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/zyvutz8tdcyt51ef3zfv.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/hwzhdg60fevfhaklmyke.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/o6jswwpvjarlt1a1tpdd.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/lrrouswbvhucnuwzutiv.jpg", alt: "Image 3" },
    { src: "https://res.cloudinary.com/dvg8flzpt/image/upload/v1732003179/4th%20floor%20indoor/Seminar%20hall/oaluksxmypjrasqywiam.jpg", alt: "Image 3" },
  ],
};

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
  const [floorPlanImage, setFloorPlanImage] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionedImages>(initialSectionedImages);
  const [firstImageClicked, setFirstImageClicked] = useState(false);

  const handleImageClick = (src: string) => {
    if (!firstImageClicked) {
      // Only the first image clicked gets added to the "Floor Plan"
      setSections(prevSections => ({
        ...prevSections,
        "Floor Plan": [{ src, alt: "Current Floor Plan" }],
      }));
      setFirstImageClicked(true); // Mark that the first image has been clicked
    }
    setSelectedImage(src);
    setFloorPlanImage(src);
    setIsDialogOpen(true);
  };

  const handleSectionImageClick = (src: string) => {
    setSelectedImage(src); // Show the clicked image from the section on the left
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
                  className="max-h-[22rem] object-contain"
                  loading="lazy" // Lazy loading enabled
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute inset-y-0 right-0 my-auto z-10 translate-y-2 aspect-square py-6" />
      </Carousel>

      {/* Dialog for displaying the full-screen image */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="flex justify-between items-start p-4 m-auto w-screen h-screen max-w-[90vw]">
          {/* Selected Image */}
          <ZoomableImage selectedImage={selectedImage || ""} />

          {/* Sectioned Images */}
          <div className="w-1/2 pl-4 overflow-y-auto max-h-full">
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Floor Plan</h3>
              <div className="grid grid-cols-2 gap-2">
                <img
                  src={floorPlanImage || ""}
                  alt={"Floor Plan"}
                  className="cursor-pointer object-cover"
                  onClick={() => handleSectionImageClick(floorPlanImage || "")}
                  loading="lazy" // Lazy loading enabled
                />
              </div>
            </div>

            {Object.keys(sections)
              .map((sectionName, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-lg my-2">{sectionName}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sections[sectionName].map((img, idx) => (
                      <img
                        key={idx}
                        src={img.src}
                        alt={img.alt}
                        className="cursor-pointer w-[300px] h-[300px] object-cover aspect-square"
                        onClick={() => handleSectionImageClick(img.src)}
                        loading="lazy" // Lazy loading enabled
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndoorNavigationCarousel;
