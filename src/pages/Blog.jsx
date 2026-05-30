import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { useBlogsData, useBannerByPage } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

/* strip HTML tags for plain text preview */
const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

/* format "2024-05-28" → "May 28, 2024" */
const fmtDate = (d) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch {
    return d;
  }
};

const TABS = ["All Articles", "Agriculture", "Spices", "Health & Wellness", "Sustainability"];

const BlogPage = () => {
  const { data: posts = [], isLoading: loadingPosts, error: blogError } = useBlogsData();
  const { data: bannerData, isLoading: loadingBanner } = useBannerByPage("blogs");
  const [activeTab, setActiveTab] = useState("All Articles");

  const loading = loadingPosts || loadingBanner;
  const error = blogError?.message;

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-white">
      <SEO
        title="Blog"
        description="Read the latest insights and articles about sustainable eating, food export, and healthy living from Covenant Peniel Exim."
      />

      <PageHero
        title={bannerData?.title || "Our Blog"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        backgroundColor={!bannerData?.image ? "from-red-600 to-emerald-700" : undefined}
        backgroundImage={bannerData?.image}
        overlayOpacity={45}
        className="min-h-64 md:min-h-72"
        priority={true}
      >
        <div className="max-w-2xl">
          <p className="text-white/90 text-sm md:text-base">
            Read our latest articles and insights from the team.
          </p>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">

        {/* ── Section header ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Latest insights
            </h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-[#FF2801]" />
            <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl">
              Stories and updates from Covenant Peniel Exim on global food trade, sourcing, and quality.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 ring-1 ring-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2801]" />
            Covenant Peniel Exim Blog
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="mb-12 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-none px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all border-b-2 ${
                activeTab === tab
                  ? "border-[#FF2801] text-[#FF2801]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Zigzag blog list ── */}
        <div className="space-y-0">
          {posts.map((post, index) => {
            const isOdd = index % 2 === 0;
            const num = String(index + 1).padStart(2, "0");
            const plainDesc = stripHtml(post.description).slice(0, 160);

            /* Number column — large faded number + vertical dashed line */
            const NumCol = (
              <div className="hidden md:flex flex-col items-center pt-2 w-16 shrink-0">
                <span className="text-5xl lg:text-6xl font-extrabold leading-none"
                  style={{ color: "rgba(255,40,1,0.12)" }}>
                  {num}
                </span>
                <div className="mt-3 flex flex-col items-center gap-1">
                  <span className="block h-2 w-2 rounded-full bg-[#FF2801]" />
                  <span className="block w-px flex-1 min-h-[80px] bg-slate-200" style={{ background: "repeating-linear-gradient(to bottom, #cbd5e1 0, #cbd5e1 4px, transparent 4px, transparent 8px)" }} />
                </div>
              </div>
            );

            /* Content card — red bg for odd posts (01, 03), white for even */
            const ContentCol = (
              <div
                className="flex flex-col justify-center py-6 px-5 md:px-8 rounded-2xl"
                style={isOdd ? { backgroundColor: "#FF2801" } : {}}
              >
                <span className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${isOdd ? "text-white/80" : "text-[#FF2801]"}`}>
                  {post.tag}
                </span>
                <Link to={`/blogs/${post.slug}`}>
                  <h3 className={`text-xl md:text-2xl font-bold leading-snug transition-colors ${isOdd ? "text-white hover:text-white/80" : "text-slate-900 hover:text-[#FF2801]"}`}>
                    {post.title}
                  </h3>
                </Link>
                <p className={`mt-3 text-sm leading-relaxed line-clamp-3 ${isOdd ? "text-white/80" : "text-slate-500"}`}>
                  {plainDesc}…
                </p>
                <div className={`mt-5 flex flex-wrap items-center gap-4 text-xs ${isOdd ? "text-white/70" : "text-slate-400"}`}>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {fmtDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                  <Link
                    to={`/blogs/${post.slug}`}
                    className={`inline-flex items-center gap-1 font-semibold hover:gap-2 transition-all ${isOdd ? "text-white" : "text-[#FF2801]"}`}
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );

            /* Image card */
            const ImageCol = (
              <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="h-56 md:h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#FF2801] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                  {post.tag}
                </span>
              </div>
            );

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`relative grid items-center gap-4 md:gap-8 border-b border-slate-100 py-8 last:border-0
                  ${isOdd
                    ? "grid-cols-1 md:grid-cols-[64px_1fr_1fr]"
                    : "grid-cols-1 md:grid-cols-[1fr_1fr_64px]"
                  }`}
              >
                {isOdd ? (
                  <>{NumCol}{ContentCol}{ImageCol}</>
                ) : (
                  <>{ImageCol}{ContentCol}{NumCol}</>
                )}

                {/* Mobile: show number as small badge */}
                <div className="md:hidden absolute top-8 right-0 text-3xl font-extrabold"
                  style={{ color: "rgba(255,40,1,0.12)" }}>
                  {num}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
