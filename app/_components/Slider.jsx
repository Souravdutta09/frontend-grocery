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
            const imageUrl =
             
              (
                item.image?.formats?.small?.url ||  // Use "small" version if available
                item.image?.url ||                  // Fallback to original image
                ''
              );

            return (
              <CarouselItem key={item.id || index}>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    width={1000}
                    height={300}
                    className="object-cover rounded-2xl w-full h-[200px] md:h-[450px] "
                  />
                )}
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
