import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

interface RoomSliderProps {
  thumbnail: string;
  images: string[];
}

function RoomSlider({ thumbnail, images }: RoomSliderProps) {
  const roomImages =
    thumbnail && images
      ? [thumbnail, ...(images || []).filter((img) => img !== thumbnail)]
      : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    axis: "x",
    align: "center",
    dragFree: true,
    containScroll: "keepSnaps",
  });

  useEffect(() => {
    if (!emblaThumbsApi) return;
    const onSelect = () => {
      const idx = emblaThumbsApi.selectedScrollSnap();
      setSelectedIndex(idx);
    };
    emblaThumbsApi.on("select", onSelect);
    return () => {
      emblaThumbsApi.off("select", onSelect);
    };
  }, [emblaThumbsApi]);

  useEffect(() => {
    if (emblaThumbsApi) emblaThumbsApi.scrollTo(selectedIndex, true);
  }, [emblaThumbsApi, selectedIndex]);

  return (
    <div className="mt-6">
      <div className="relative">
        {roomImages[selectedIndex] && (
          <div className="aspect-video w-full">
            <img
              src={roomImages[selectedIndex]}
              alt={`Room image ${selectedIndex + 1}`}
              className="h-full w-full rounded-lg object-cover"
              loading={selectedIndex > 0 ? "lazy" : "eager"}
            />
          </div>
        )}

        {roomImages.length > 1 && (
          <div className="embla absolute right-4 bottom-4 mt-4 h-fit w-70 max-w-[60%] rounded-md bg-gray-500 p-3 backdrop-blur-2xl backdrop-opacity-30">
            <div
              className="embla__viewport"
              ref={emblaThumbsRef}
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="embla__container duration-300"
                style={{ display: "flex", touchAction: "pan-y pinch-zoom" }}
              >
                {roomImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="embla__slide px-1"
                    style={{
                      flex: "0 0 33.333%",
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedIndex(idx);
                        if (emblaThumbsApi) emblaThumbsApi.scrollTo(idx);
                      }}
                      className={`block w-full overflow-hidden rounded-md border-2 transition focus:outline-none ${
                        selectedIndex === idx
                          ? "border-accent-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                      aria-current={selectedIndex === idx}
                    >
                      <img
                        src={src}
                        alt="thumbnail"
                        className="rouned-md block aspect-[4/3] h-auto w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomSlider;
