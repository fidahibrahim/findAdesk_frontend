import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ImageSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const goToNext = () => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
  
    const goToSlide = (slideIndex: number) => {
      setCurrentIndex(slideIndex);
    };
  
    if (!images || images.length === 0) return null;
  
    return (
      <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
        {/* Main Image */}
        <div className="h-full w-full">
          <img
            src={images[currentIndex]}
            alt={`Workspace ${currentIndex + 1}`}
            className="h-full w-full object-cover transition-opacity duration-300"
          />
        </div>
  
        {/* Navigation Arrows */}
        <div className="absolute top-0 left-0 h-full w-full flex justify-between items-center">
          <button
            onClick={goToPrevious}
            className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full m-4 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full m-4 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
  
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  export default ImageSlider