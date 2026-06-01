import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Globe,
  Package,
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Users,
  Truck,
  Leaf,
  Award,
  Lightbulb,
  Handshake,
  Plane,
} from "lucide-react";
import PageHero from "../../components/PageHero";
import AboutBanner from "../../../public/new.jpeg";
import AboutImg from "../../assets/AboutUs.jpeg";
import HomeAboutImg from "../../assets/HomeAbout.jpg";
import OcenCoconut from "../../assets/ocenProduct/Coconut.png";
import OcenCoffee from "../../assets/ocenProduct/Coffee.png";
import OcenCumin from "../../assets/ocenProduct/Cumin.png";
import OcenOnion from "../../assets/ocenProduct/Onion.png";
import OcenPotato from "../../assets/ocenProduct/Potato.png";
import OcenRice from "../../assets/ocenProduct/Rice.png";
import OcenTea from "../../assets/ocenProduct/Tea.jpeg";
import OcenTurmeric from "../../assets/ocenProduct/Turmeric.png";
import SEO from "../../components/SEO";
import { useAboutPageData, useBannerByPage } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const AboutUs = () => {
  const {
    data: aboutData,
    isLoading: loadingAbout,
    error: aboutError,
  } = useAboutPageData();
  const { data: bannerData, isLoading: loadingBanner } =
    useBannerByPage("about_us");

  const loading = loadingAbout || loadingBanner;
  const error = aboutError;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imageHover = {
    hover: { scale: 1.03, transition: { duration: 0.4, ease: "easeOut" } },
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !aboutData) {
    return null;
  }

  // ---- same content, pulled from the API (with safe fallbacks) ----
  const about = aboutData.about || {};
  const questions = aboutData.questions || [];
  const visionCards = aboutData.vision_cards || [];
  const values = aboutData.values || {};
  const whatWeDo = questions[1];
  const whoWeAre = questions[0];

  // Product thumbnails for the "What We Do" grid (existing folder images).
  const productThumbs = [
    OcenCoconut,
    OcenCoffee,
    OcenCumin,
    OcenOnion,
    OcenPotato,
    OcenRice,
    OcenTea,
    OcenTurmeric,
  ];

  // Split the heading so the last word gets the red accent + flight trail.
  const headingText = "Welcome To Covenant Peniel Exim Pvt Ltd";
  const headingWords = headingText.split(/\s+/).filter(Boolean);
  const lastWord = headingWords[headingWords.length - 1] || "";
  const leadWords = headingWords.slice(0, -1).join(" ");

  const stats = [
    { num: "25+", label: "Countries Served", Icon: Globe },
    { num: "100+", label: "Products", Icon: Package },
    { num: "100%", label: "Quality Assured", Icon: BadgeCheck },
    { num: "24/7", label: "Support", Icon: Headphones },
  ];

  const valueIcons = [
    ShieldCheck,
    Users,
    Truck,
    Leaf,
    Award,
    Lightbulb,
    Globe,
    Package,
  ];

  const whoBadges = [
    { label: "Premium Quality", Icon: Award },
    { label: "Trusted Partnership", Icon: Handshake },
    { label: "Global Reach", Icon: Globe },
  ];

  return (
    <div className="w-full bg-white relative overflow-x-hidden">
      <SEO
        title="About Us"
        description="Learn more about Covenant Peniel Exim, a leading exporter of premium Indian spices, grains, and food products."
      />

      <PageHero
        title={bannerData?.title || "About Us"}
        backgroundImage={bannerData?.image || AboutBanner}
        overlayOpacity={55}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* ===== HERO — editorial sky theme (Bringing Goodness style) ===== */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#e9f2fb] via-[#f4f9fd] to-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#2f6fed] opacity-[0.10] blur-3xl" />
          <div className="absolute top-40 -left-16 h-80 w-80 rounded-full bg-[#FF2801] opacity-[0.06] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-28 md:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT — content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#FF2801]" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF2801]">
                  About Us
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-slate-900"
              >
                {leadWords}
                {leadWords ? " " : ""}
                <span className="relative inline-block whitespace-nowrap text-[#FF2801]">
                  {lastWord}
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    height="14"
                    viewBox="0 0 200 14"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 9 C 45 1, 110 13, 198 5"
                      stroke="#FF2801"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1 8"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
                    />
                  </svg>
                  <Plane
                    className="absolute -right-8 -top-2 h-6 w-6 rotate-[35deg] text-[#FF2801]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="mt-7 max-w-xl text-base md:text-[17px] leading-relaxed text-slate-600"
                dangerouslySetInnerHTML={{ __html: about.description }}
              />
            </motion.div>

            {/* RIGHT — immersive composite image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 m-auto h-[80%] w-[80%] rounded-full bg-white/60 blur-2xl" />
              <div className="pointer-events-none absolute right-4 top-0 h-44 w-44 rounded-full bg-[#2f6fed]/10 blur-3xl" />
              <img
                src={about.image || AboutImg}
                alt={about.heading || "About us"}
                className="relative z-10 w-full h-auto object-contain mix-blend-multiply"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS — elevated cards overlapping the hero ===== */}
      <section className="relative z-10 -mt-12 sm:-mt-16 lg:-mt-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map(({ num, label, Icon }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-5 md:p-7 text-center shadow-xl transition"
              style={{ backgroundColor: '#FF2801', boxShadow: '0 10px 40px rgba(255,40,1,0.30)' }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
              </div>
              <div className="mt-4 text-3xl md:text-4xl font-extrabold text-white">
                {num}
              </div>
              <div className="mt-1 text-xs md:text-sm font-semibold text-white/80">
                {label}
              </div>
              <div className="mx-auto mt-3 h-[3px] w-8 rounded-full bg-white/50" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== WHAT WE DO + WHO WE ARE — side by side ===== */}
      {(whatWeDo || whoWeAre) && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

            {/* ── What We Do ── */}
            {whatWeDo && (
              <motion.div variants={fadeUp} className="flex flex-col">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  {whatWeDo.heading}
                </h2>
                <motion.div
                  variants={underlineVariants}
                  className="mt-4 h-1 w-24 bg-linear-to-r from-[#FF2801] to-[#434343] rounded-full origin-left"
                />
                {/* product thumbnail grid — images first */}
                <div className="relative mt-6">
                  <Leaf className="pointer-events-none absolute -right-3 -top-6 h-16 w-16 rotate-12 text-[#FF2801]/10" />
                  <Leaf className="pointer-events-none absolute -left-5 bottom-2 h-14 w-14 -rotate-12 text-[#434343]/10" />
                  <div className="grid grid-cols-4 gap-3">
                    {productThumbs.map((src, i) => (
                      <div
                        key={i}
                        className="aspect-square overflow-hidden rounded-full bg-white ring-2 ring-white shadow-lg shadow-slate-200/70 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-105"
                      >
                        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* description below images */}
                <div
                  className="mt-6 text-slate-600 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: whatWeDo.description }}
                />
              </motion.div>
            )}

            {/* ── Who We Are ── */}
            {whoWeAre && (
              <motion.div variants={fadeUp} className="flex flex-col">
                {/* image */}
                <motion.div
                  whileHover="hover"
                  className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200 shadow-xl"
                >
                  <motion.img
                    variants={imageHover}
                    src={whoWeAre.image || HomeAboutImg}
                    alt={whoWeAre.heading}
                    className="w-full h-64 md:h-72 object-cover"
                  />
                </motion.div>
                {/* text */}
                <h2 className="mt-7 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  {whoWeAre.heading}
                </h2>
                <motion.div
                  variants={underlineVariants}
                  className="mt-4 h-1 w-24 bg-linear-to-r from-[#FF2801] to-[#434343] rounded-full origin-left"
                />
                <div
                  className="mt-5 text-slate-600 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: whoWeAre.description }}
                />
                {/* badges */}
                <div className="mt-7 flex flex-wrap gap-6">
                  {whoBadges.map(({ label, Icon }) => (
                    <div key={label} className="flex w-24 flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF2801]/10 ring-1 ring-[#FF2801]/20">
                        <Icon className="h-7 w-7 text-[#FF2801]" strokeWidth={1.7} />
                      </div>
                      <span className="mt-3 text-sm font-semibold leading-tight text-slate-700">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}

      {/* ===== MISSION & VISION — kept content, restyled ===== */}
      {visionCards.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {visionCards.map((card, index) => {
              const isMission = (card.card_name || "")
                .toLowerCase()
                .includes("mission");
              const Icon = isMission ? Target : Eye;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl p-7 md:p-8 shadow-lg transition"
                  style={{ backgroundColor: '#FF2801', boxShadow: '0 10px 40px rgba(255,40,1,0.30)' }}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 rounded-2xl bg-white/20 p-3">
                      <Icon
                        className="h-8 w-8 text-white"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {card.card_name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* ===== VALUES — icon grid ===== */}
      {values.cards && values.cards.length > 0 && (
        <section className="bg-linear-to-b from-[rgba(67,67,67,0.05)] to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {values.heading}
              </h2>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#FF2801]" />
              <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-slate-600">
                Principles that guide how we serve customers and deliver quality
                at every step.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {values.cards.map((card, index) => {
                const Icon = valueIcons[index % valueIcons.length];
                return (
                  <div
                    key={index}
                    className="group rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:ring-[#FF2801]/30"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF2801]/10 transition-colors group-hover:bg-[#FF2801]">
                      <Icon
                        className="h-7 w-7 text-[#FF2801] transition-colors group-hover:text-white"
                        strokeWidth={1.7}
                      />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default AboutUs;
