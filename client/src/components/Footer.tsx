import Logo from "./Logo";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { fadeAnimProps } from "../utils/animation";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", to: "#" },
      { name: "Careers", to: "#" },
      { name: "Blog", to: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", to: "#" },
      { name: "FAQ", to: "#" },
      { name: "Help Center", to: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms", to: "#" },
      { name: "Privacy", to: "#" },
      { name: "Cookies", to: "#" },
    ],
  },
  {
    title: "Discover",
    links: [
      { name: "Rooms", to: "#" },
      { name: "Reviews", to: "#" },
      { name: "Wishlist", to: "#" },
    ],
  },
];

function Footer() {
  return (
    <motion.footer className="bg-dark-900 text-gray-main mt-10 overflow-hidden border-t border-gray-700 px-4 pt-10 pb-4">
      <nav className="mx-auto mb-8 grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {footerLinks.map((section, idx) => (
          <motion.div
            {...fadeAnimProps}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            key={section.title}
          >
            <h3 className="text-accent-500 mb-3 text-lg font-bold">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-main hover:text-accent-500 relative inline-block pb-1 font-medium transition-colors duration-200"
                  >
                    {link.name}
                    <span className="bg-accent-500 absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </nav>
      <div className="mt-6 flex flex-col items-center gap-2">
        <Logo />
        <span className="text-xs text-gray-400">
          © {new Date().getFullYear()} Hotel Booking. Demo project for
          portfolio.
        </span>
      </div>
    </motion.footer>
  );
}

export default Footer;
