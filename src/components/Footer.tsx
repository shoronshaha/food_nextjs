import { Business } from "@/types/business";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import Image from "./ui/atoms/image";

interface FooterProps {
  business: Business;
}

const Footer = function Footer({ business }: FooterProps) {
  return (
    <footer className="w-full bg-earth-50 dark:bg-earth-800 text-earth-700 dark:text-earth-light">
      {/* Thin organic top border */}
      <div className="bg-organic-100 h-1 w-full"></div>

      <div className=" px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Logo + Text */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <Link href="/">
              <Image
                src={business?.alterImage?.secure_url || "/assets/logo.png"}
                alt="Logo"
                sizes="(max-width: 768px) 240px, 240px"
                className="w-60"
                loading="lazy"
                variant="small"
              />
            </Link>
            <p className="mt-6 text-sm leading-7 text-earth-600 dark:text-earth-light text-center md:text-left">
              Taste the difference with our farm-fresh organic produce. Fresh
              ingredients, sustainably sourced from trusted farms.
            </p>

            {/* Newsletter */}
            <div className="mt-6 w-full md:w-3/4">
              <label className="text-sm font-medium text-earth-700 dark:text-earth-light">
                Join our newsletter
              </label>
              <p className="text-xs text-earth-600 dark:text-earth-light/80 mt-1">
                Get seasonal picks, recipes, and farm updates.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <input
                  aria-label="Email"
                  type="email"
                  placeholder="you@yourmail.com"
                  className="flex-1 rounded-full border border-organic-100 px-4 py-2 focus:ring-2 focus:ring-organic-100/50 bg-white"
                />
                <button className="bg-organic-600 hover:bg-organic-700 text-white px-4 py-2 rounded-full">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          {/* Explore More */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-lg text-organic-700">Discover</h4>
            <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  Our Menu
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          {/* Policies */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-lg text-organic-700">Legal</h4>
            <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-primary transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold text-lg text-organic-700">
              Contact Us
            </h4>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <p>
                Phone:{" "}
                <Link
                  href={`tel:${business?.phone}`}
                  className="hover:text-primary transition-colors"
                  prefetch={false}
                >
                  {business?.phone || ""}
                </Link>
              </p>
              <p className="text-base md:text-lg">
                Email:{" "}
                <Link
                  href={`mailto:${business?.email || ""}`}
                  className="hover:text-primary transition-colors md:break-words break-all"
                  prefetch={false}
                >
                  {business?.email || ""}
                </Link>
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-4 text-earth-800 dark:text-earth-light">
              <Link
                href="https://www.facebook.com/G'Lore/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
                prefetch={false}
              >
                <FaFacebookF size={20} />
              </Link>

              <Link
                href="https://www.facebook.com/messages/t/414489611749530"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Messenger"
                prefetch={false}
              >
                <RiMessengerLine size={20} />
              </Link>

              <Link
                href="https://wa.me/+8801907349009"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="WhatsApp"
                prefetch={false}
              >
                <FaWhatsapp size={20} />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
                prefetch={false}
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-earth-200 dark:border-earth-700 pt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-row items-center gap-1 text-sm text-earth-800 dark:text-earth-light">
              <p>© 2025 Powered by</p>
              <a href="https://calquick.app" aria-label="Calquick">
                <Image
                  src="https://calquick.app/images/logo/logo.png"
                  alt="CalQuick logo"
                  width={70}
                  height={20}
                  sizes="70px"
                  className="w-[70px] dark:hidden"
                  loading="lazy"
                />
              </a>
              <a href="https://calquick.app" aria-label="Calquick">
                <Image
                  src="https://calquick.app/images/logo/logo-white.png"
                  alt="CalQuick logo"
                  width={70}
                  height={20}
                  sizes="70px"
                  className="w-[70px] hidden dark:block"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="flex gap-2 text-sm text-earth-800 dark:text-earth-light">
              <span className="font-semibold">Trade License Number:</span>
              <span>TRAD/DNCC/050278/2022</span>
            </div>
          </div>

          <div className="w-full mt-7 border-t border-gray-800 pt-6 md:mb-0 mb-20">
            <div className="container mx-auto">
              <a
                href="https://www.sslcommerz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png"
                  alt="SSLCommerz Payment Methods"
                  width={1600}
                  height={100}
                  sizes="100vw"
                  className="w-full"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
