import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const priceTimeoutID = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const lowPrice = searchParams.get("price[gte]");
    const highPrice = searchParams.get("price[lte]");
    setPrice([Number(lowPrice), Number(highPrice)]);
  }, [searchParams]);

  return (
    <div>
      <h3 className="mt-4 mb-2 text-xl font-semibold">Price Range</h3>

      <Slider
        range
        min={0}
        value={price}
        max={1000}
        trackStyle={[{ backgroundColor: "#000", height: 6 }]}
        railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
        handleStyle={[{ borderColor: "#000" }, { borderColor: "#000" }]}
        onChange={(value: number | number[]) => {
          value = value as [number, number];
          const urlSearchParams = new URLSearchParams(searchParams);
          const lowPrice = String(value[0]);
          const highPrice = String(value[1]);
          urlSearchParams.set("price[gte]", lowPrice);
          urlSearchParams.set("price[lte]", highPrice);

          if (priceTimeoutID.current) clearTimeout(priceTimeoutID.current);

          setPrice(value as [number, number]);
          priceTimeoutID.current = setTimeout(() => {
            setSearchParams(urlSearchParams);
          }, 300);
        }}
      />
      <div className="mt-2 flex justify-between text-sm text-gray-700">
        <span>${price[0]}</span>
        <span>${price[1]}</span>
      </div>
    </div>
  );
}

export default PriceFilter;
