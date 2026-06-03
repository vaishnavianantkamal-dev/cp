import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SupplierForm from "../pages/Supplierform";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import footerBg from "../assets/slider-3.jpg";
import Logo from "/reallogo1.png";
import { useProductCategories } from "../hooks/useApi";

export default function OMKARAIMPEXFooter() {
  const _motion = motion;
  const [isVisible, setIsVisible] = useState(false);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      x: 5,
      color: "#FF2801",
      transition: { duration: 0.2 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.2,
      backgroundColor: "#FF2801",
      transition: { duration: 0.3 },
    },
  };

  const { data: categoriesData = [] } = useProductCategories();

  const productCategoriesFallback = [
    { name: "Grains and Cereal", slug: "grains-and-cereal" },
    { name: "Pulses", slug: "pulses" },
    { name: "Spices", slug: "spices" },
    { name: "Fruits", slug: "fruits" },
    { name: "Vegetables", slug: "vegetables" },
    { name: "Dehydrated Products", slug: "dehydrated-products" },
  ];

  const categories = categoriesData.length > 0 ? categoriesData : productCategoriesFallback;

  // Navigation data
  const footerData = {
    information: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Certificates", href: "/certificates" },
      { label: "Blogs", href: "/blogs" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
    branches: [
      { label: "Pune", href: "#" },
      { label: "Mumbai", href: "#" },
      { label: "Bangalore", href: "#" },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-slate-900 overflow-hidden">
      {/* Footer background photo */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${footerBg})` }}
        />
        {/* Dark overlay so text stays readable over the vibrant photo */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Slim brand accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-[#FF2801] via-[#FF2801]/70 to-[#434343]" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {/* About Section */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <img
                  src={Logo}
                  alt="Covenant Peniel Exim Pvt Ltd"
                  className="h-24 w-24 object-contain"
                />
                <p className="mt-2 text-lg md:text-xl font-extrabold tracking-wide text-[#434343] uppercase leading-tight">
                  Covenant Peniel Exim <span className="text-[#FF2801]">Pvt Ltd.</span>
                </p>
              </motion.div>

              <p className="text-slate-700 text-sm leading-relaxed mb-8">
                We safely move and deliver food with quality, care, and
                efficiency
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  {
                    icon: Facebook,
                    label: "Facebook",
                    url: "https://www.facebook.com/share/1DRvGZ16Nj/?mibextid=wwXIfr",
                  },
                  // {
                  //   icon: Youtube,
                  //   label: "YouTube",
                  //   url: "https://www.youtube.com/channel/UC333333333333333333333",
                  // },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    url: "https://www.instagram.com/oceanmark_exim?igsh=NXh2MDlxZjI1MXBs&utm_source=qr",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/in/rohit-nikumbh-483518366/",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialVariants}
                    whileHover="hover"
                    className="w-10 h-10 rounded-full bg-white ring-1 ring-black/10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                  >
                    <social.icon size={18} className="text-slate-700" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Information Section */}
            <motion.div variants={columnVariants}>
              <div className="mb-8">
                <h4 className="relative mb-5 pb-3 text-sm font-bold uppercase tracking-[0.15em] text-slate-900">
                  Information
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "32px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#FF2801] rounded-full"
                  />
                </h4>
              </div>
              <ul className="space-y-3">
                {footerData.information.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 text-slate-700 hover:text-[#FF2801] cursor-pointer transition-colors"
                  >
                    <ChevronRight size={16} className="text-[#FF2801] shrink-0" />
                    {item.label === "Become Supplier" ? (
                      <button
                        onClick={() => setIsSupplierFormOpen(true)}
                        className="text-left hover:text-[#FF2801] transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : item.href?.startsWith("/") ? (
                      <Link to={item.href}>{item.label}</Link>
                    ) : (
                      <a href={item.href}>{item.label}</a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Products Range Section */}
            <motion.div variants={columnVariants}>
              <div className="mb-8">
                <h4 className="relative mb-5 pb-3 text-sm font-bold uppercase tracking-[0.15em] text-slate-900">
                  Products Range
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "32px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#FF2801] rounded-full"
                  />
                </h4>
              </div>
              <ul className="space-y-3">
                {categories.slice(0, 6).map((category) => (
                  <motion.li
                    key={category.slug}
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 text-slate-700 hover:text-[#FF2801] cursor-pointer transition-colors"
                  >
                    <ChevronRight size={16} className="text-[#FF2801] shrink-0" />
                    <Link to={`/products/${category.slug}`}>
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Get In Touch Section */}
            <motion.div variants={columnVariants}>
              <div className="mb-8">
                <h4 className="relative mb-5 pb-3 text-sm font-bold uppercase tracking-[0.15em] text-slate-900">
                  Stay Connected
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "32px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#FF2801] rounded-full"
                  />
                </h4>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex gap-3"
                >
                  <MapPin
                    size={20}
                    className="text-[#FF2801] shrink-0 mt-1"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">
                      REGISTERED ADDRESS:
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      #4-166, Donka Road,
                      <br />
                      Chinnaravuru, TENALI, A.P. - 522201
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-3"
                >
                  <Phone size={20} className="text-[#FF2801] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">
                      PHONE NUMBER:
                    </p>
                    <p className="text-slate-700 text-sm hover:text-[#FF2801] cursor-pointer transition-colors">
                      +91 8885 111 263
                    </p>
                    <p className="text-slate-700 text-sm hover:text-[#FF2801] cursor-pointer transition-colors">
                      +91 8121 414 235
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      GSTIN: 37AAJCC1186B1ZV
                    </p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-3"
                >
                  <Mail size={20} className="text-[#FF2801] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">
                      EMAIL:
                    </p>
                    <p className="text-slate-700 text-sm hover:text-[#FF2801] cursor-pointer transition-colors">
                      sales@covenantpeniel.com
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="h-px bg-linear-to-r from-transparent via-slate-300 to-transparent origin-left"
          />
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-slate-600 text-sm text-center md:text-left">
              © 2026{" "}
              <span className="font-semibold text-slate-900">
                Covenant Peniel Exim Pvt Ltd
              </span>
              , Designed & Developed by{" "}
              <a
                href="#"
                className="text-[#FF2801] hover:text-[#e62500] font-semibold transition-colors"
              >
                AnantKamal Software Labs
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-15 z-50 p-3 rounded-full bg-[#434343] text-white shadow-lg hover:bg-[#FF2801] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF2801] focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Supplier Form Modal */}
      <AnimatePresence>
        {isSupplierFormOpen && (
          <div className="fixed inset-0 z-100">
            <SupplierForm onClose={() => setIsSupplierFormOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
