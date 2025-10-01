import WhyUsCard, { type whyUsCardProps } from "./WhyUsCard";
import { SiHappycow } from "react-icons/si";
import { FaCampground } from "react-icons/fa";
import { FaRoad } from "react-icons/fa";
import { FaBridge } from "react-icons/fa6";

type combine = whyUsCardProps[];

const cardsData: combine = [
  {
    count: 4500,
    duration: 2000,
    heading: "Happy camper",
    className: "text-white bg-gradient-to-br from-cyan-900 to-cyan-700",
    icon: <SiHappycow size={30} />,
  },
  {
    count: 1500,
    duration: 2000,
    heading: "Trips sold",
    className: "text-white bg-gradient-to-br from-blue-900 to-blue-700",
    icon: <FaCampground size={30} />,
  },
  {
    count: 60,
    duration: 2000,
    heading: "Destinations",
    className: "text-white bg-gradient-to-br from-purple-900 to-purple-700",
    icon: <FaRoad size={30} />,
  },
  {
    count: 50000,
    duration: 2000,
    heading: "Travel buddies",
    className: "text-white bg-gradient-to-br from-gray-900 to-gray-700",
    icon: <FaBridge size={30} />,
  },
];

function WhyUsBody() {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
      {cardsData.map((data, idx) => (
        <WhyUsCard
          key={idx}
          {...data}
          className={`${data.className} ${
            idx === 0 || idx === 3
              ? "col-span-1 md:col-span-2 lg:col-span-4"
              : "col-span-1 lg:col-span-2"
          }`}
        />
      ))}
    </div>
  );
}

export default WhyUsBody;
