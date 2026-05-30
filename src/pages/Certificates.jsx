import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import CertificatesHeroBg from "../assets/slider-2.jpg";
import { useCertificatesData, useBannerByPage } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

/* ── derive a short description from the cert title ── */
function getDescription(title = "") {
  const t = title.toLowerCase();
  if (t.includes("gst"))
    return "Goods and Services Tax (GST) registration certificate authorizing us to conduct business and export as per Indian tax regulations.";
  if (t.includes("udyam") || t.includes("msme"))
    return "Udyam Registration certifies our enterprise under the Ministry of Micro, Small & Medium Enterprises (MSME), Government of India.";
  if (t.includes("iec") || t.includes("importer") || t.includes("exporter"))
    return "Importer Exporter Code (IEC) issued by DGFT, Ministry of Commerce & Industry, Government of India, enabling us to export globally.";
  if (t.includes("fssai") || t.includes("food"))
    return "FSSAI license certifying that our food products meet the safety and quality standards set by the Food Safety and Standards Authority of India.";
  if (t.includes("iso"))
    return "ISO certification demonstrating our commitment to internationally recognized quality management standards across our operations.";
  if (t.includes("apeda"))
    return "APEDA registration authorizing us to export scheduled products under the Agricultural and Processed Food Products Export Development Authority.";
  return "Government-issued certificate validating our compliance with applicable trade, quality, and export regulations in India.";
}

const BADGES = ["Govt. Issued", "Valid & Active", "Compliant"];

export default function CertificatesComponent() {
  const { data, isLoading: loadingCertificates } = useCertificatesData();
  const { data: bannerData, isLoading: loadingBanner } = useBannerByPage("certificates");

  const loading = loadingCertificates || loadingBanner;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNext = useCallback(() => {
    if (data?.items && selectedIndex !== null)
      setSelectedIndex((prev) => (prev + 1) % data.items.length);
  }, [data, selectedIndex]);

  const handlePrev = useCallback(() => {
    if (data?.items && selectedIndex !== null)
      setSelectedIndex((prev) => (prev === 0 ? data.items.length - 1 : prev - 1));
  }, [data, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, data, handleNext, handlePrev]);

  if (loading) return <LoadingSpinner />;
  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Failed to load certificates.</p>
      </div>
    );

  const { heading, description, items: certificates } = data;
  const currentCert = selectedIndex !== null ? certificates[selectedIndex] : null;

  return (
    <div className="w-full bg-[#f7f9fc]">
      <SEO
        title={heading}
        description="View our certifications and accreditations including TPCI, APEDA, and ISO."
      />

      <PageHero
        title={bannerData?.title || heading}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Certificates" }]}
        backgroundImage={bannerData?.image || CertificatesHeroBg}
        overlayOpacity={60}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md border border-white/20"
        >
          <Award className="h-4 w-4" />
          Certified Excellence
        </motion.div>
      </PageHero>

      {/* ── Main content ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* ── Red description banner ── */}
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-8 md:p-10 mb-16 shadow-lg"
              style={{ backgroundColor: "#FF2801" }}
            >
              <div
                className="text-base md:text-lg leading-relaxed text-white text-center"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          )}

          {/* Section heading */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Accreditations</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#FF2801]" />
            <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
              We are proudly certified and recognized by Government authorities.
            </p>
          </div>

          {/* ── Zigzag rows ── */}
          <div className="relative mt-16">
            {/* Vertical spine line */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-slate-200 top-10 bottom-10 z-0"
            />

            {certificates.map((cert, index) => {
              const isEven = index % 2 === 0; /* even → image left, odd → image right */
              const isPdf = cert.fileType === "pdf";
              const num = String(index + 1).padStart(2, "0");
              const desc = getDescription(cert.title);

              const ImageBlock = (
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onClick={() => setSelectedIndex(index)}
                  className="cursor-pointer rounded-2xl overflow-hidden border-2 border-[#FF2801]/25 shadow-lg hover:shadow-xl hover:border-[#FF2801] transition-all duration-300 bg-white"
                >
                  <div className="relative h-56 md:h-72 bg-slate-50">
                    {isPdf ? (
                      <iframe
                        src={`${cert.url}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={cert.title}
                        className="w-full h-full pointer-events-none"
                        tabIndex="-1"
                        scrolling="no"
                      />
                    ) : (
                      <img
                        src={cert.url}
                        alt={cert.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                    {/* top accent bar */}
                    <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-[#FF2801] to-[#434343]" />
                  </div>
                </motion.div>
              );

              const DescBlock = (
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl p-7 shadow-md border border-slate-100"
                >
                  <h3 className="text-xl font-bold text-slate-900">{cert.title}</h3>
                  <div className="mt-2 h-0.5 w-12 rounded-full bg-[#FF2801]" />
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{desc}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {BADGES.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#FF2801]" strokeWidth={2} />
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );

              return (
                <div
                  key={cert.id}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 mb-12"
                >
                  {/* Left slot */}
                  <div>{isEven ? ImageBlock : DescBlock}</div>

                  {/* Centre number circle */}
                  <div className="hidden md:flex flex-col items-center z-10">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full text-white text-base font-bold shadow-lg"
                      style={{ backgroundColor: "#FF2801" }}
                    >
                      {num}
                    </div>
                  </div>

                  {/* Right slot */}
                  <div>{isEven ? DescBlock : ImageBlock}</div>

                  {/* Mobile: number badge */}
                  <div className="md:hidden flex items-center gap-3 order-first">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: "#FF2801" }}
                    >
                      {num}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Certificate {num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Trust footer bar ── */}
          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FF2801]/10">
                <ShieldCheck className="h-7 w-7 text-[#FF2801]" strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-base">Your Trust. Our Responsibility.</p>
                <p className="text-sm text-slate-500 max-w-md mt-0.5">
                  We combine certifications, quality processes and ethical practices to deliver safe, authentic and world-class Indian products.
                </p>
              </div>
            </div>
            <a
              href={certificates[0]?.url || "#"}
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF2801]/25 hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: "#FF2801" }}
            >
              <Download className="h-4 w-4" />
              Download All Certificates
            </a>
          </div>

        </div>
      </div>

      {/* ── Lightbox Modal (unchanged) ── */}
      <AnimatePresence>
        {selectedIndex !== null && currentCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4"
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all hover:scale-110 hidden sm:flex"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all hover:scale-110 hidden sm:flex"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden ${
                currentCert.fileType === "pdf"
                  ? "w-full max-w-6xl h-[85vh]"
                  : "w-auto max-w-6xl h-auto max-h-[85vh]"
              }`}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="flex-1 bg-white overflow-hidden flex items-center justify-center">
                {currentCert.fileType === "pdf" ? (
                  <iframe
                    src={`${currentCert.url}#toolbar=0&navpanes=0`}
                    title={currentCert.title}
                    className="w-full h-full bg-white"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <img
                    src={currentCert.url}
                    alt={currentCert.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="sm:hidden flex items-center justify-between p-4 border-t border-slate-100 bg-white">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#434343] text-white"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
