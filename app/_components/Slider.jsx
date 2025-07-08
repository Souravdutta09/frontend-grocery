import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

function Slider({ sliderList }) {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {sliderList.map((item, index) => {
            return (
              <CarouselItem key={item.id || index}>

                <Image
                  src={item.image?.formats?.small?.url ||  // Use "small" version if available
                    item.image?.url ||                  // Fallback to original image
                    ''}
                  width={1000}
                  height={300}
                  alt="imageName"
                  className="object-cover rounded-2xl w-full h-[200px] md:h-[400px] "
                />

              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Slider;
