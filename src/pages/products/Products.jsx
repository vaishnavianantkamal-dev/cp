import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../../components/PageHero";
import SEO from "../../components/SEO";
import ProductsImg from "../../assets/ProductHeader.jpeg";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import grainsHeroImg from "../../assets/grains.jpeg";
import riceImg from "../../assets/Rice.jpeg";
import pulseImg from "../../assets/Pulse.jpeg";
import pulse1Img from "../../assets/Pulse1.jpeg";
import spicesImg from "../../assets/spices.jpeg";
import haldiImg from "../../assets/Haldi.jpeg";
import fruitsImg from "../../assets/Fruits.jpeg";
import fruits1Img from "../../assets/Fruits1.jpeg";
import vegitableImg from "../../assets/vegitable.jpeg";
import onionImg from "../../assets/Onion.jpg";
import teaImg from "../../assets/Tea.jpeg";
import coffeeImg from "../../assets/coffee.jpeg";
import coconutesImg from "../../assets/Coconutes.jpeg";
import coconutImg from "../../assets/coconut.jpg";
import herbsImg from "../../assets/Herbs.jpeg";
import floristsImg from "../../assets/Florists.jpeg";
import oilseedsImg from "../../assets/oilseeds.jpeg";
import turmericImg from "../../assets/turmeric.jpg";
import {
  useProductCategories,
  useProductsByCategory,
  useBannerData,
} from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const CATEGORY_LOCAL_IMAGES = {
  "grains-and-cereal":     { hero: grainsHeroImg,  secondary: riceImg      },
  "pulses":                { hero: pulseImg,        secondary: pulse1Img    },
  "spices":                { hero: spicesImg,       secondary: haldiImg     },
  "fruits":                { hero: fruitsImg,       secondary: fruits1Img   },
  "vegetables":            { hero: vegitableImg,    secondary: onionImg     },
  "dry-fruits":            { hero: coconutesImg,    secondary: coconutImg   },
  "beverages":             { hero: teaImg,          secondary: coffeeImg    },
  "dehydrated-products":   { hero: oilseedsImg,     secondary: turmericImg  },
  "organic-natural-products": { hero: herbsImg,     secondary: floristsImg  },
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function ProductTile({ to, name, image, priority = false }) {
  const resolvedImage =
    image ||
    `https://via.placeholder.com/800x500/E2E8F0/334155?text=${encodeURIComponent(
      name || "Product",
    )}`;

  return (
    <ProductCategoryCard
      to={to}
      name={name}
      resolvedImage={resolvedImage}
      priority={priority}
    />
  );
}

function CategoryTile({ to, name, image, priority = false }) {
  const resolvedImage =
    image ||
    `https://via.placeholder.com/1200x700/E2E8F0/334155?text=${encodeURIComponent(
      name || "Category",
    )}`;

  return (
    <ProductCategoryCard
      to={to}
      name={name}
      resolvedImage={resolvedImage}
      priority={priority}
    >
      <div className="mt-2 ml-2 inline-flex items-center text-sm font-semibold text-[#434343]">
        View Categories
        <span className="ml-2 transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </ProductCategoryCard>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      {action ? action : null}
    </div>
  );
}

export function ProductsIndex() {
  const { data: categories = [], isLoading: loadingCategories } =
    useProductCategories();
  const { data: banners, isLoading: loadingBanners } = useBannerData();

  const loading = loadingCategories || loadingBanners;
  const bannerData = banners?.["product_range"];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full bg-white">
      <SEO
        title="Products"
        description="Explore our wide range of premium Indian spices, grains, pulses, fruits, and vegetables available for export."
      />
      <PageHero
        title={bannerData?.title || "Products"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        backgroundImage={bannerData?.image || ProductsImg}
      >
        <div className="max-w-2xl">
          <p className="text-white/90 text-sm md:text-base">
            Browse categories, then choose a subcategory and view product
            details.
          </p>
        </div>
      </PageHero>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#FF2801] rounded-full blur-3xl opacity-15" />
          <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#434343] rounded-full blur-3xl opacity-12" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FF2801]/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#434343]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2801]" />
            Our Catalogue
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">Explore Product Categories</h2>
          <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-linear-to-r from-[#FF2801] to-[#434343]" />
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {categories.map((category, index) => (
            <motion.div key={category.slug} variants={gridItem} whileHover={{ y: -6 }}>
              <CategoryTile
                to={`/products/${category.slug}`}
                name={category.name}
                description={category.description}
                image={category.image}
                priority={index < 4}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const HERO_FEATURES = [
  { icon: "🏆", label: "Premium Quality" },
  { icon: "🌍", label: "Global Export" },
  { icon: "✅", label: "Trusted & Certified" },
  { icon: "❤️", label: "Customer Satisfaction" },
];

const ABOUT_FEATURES = [
  { icon: "🥇", label: "Premium Quality Products" },
  { icon: "🚚", label: "Timely & Safe Deliveries" },
  { icon: "💰", label: "Best Prices Guaranteed" },
];

export function ProductsCategory() {
  const { category: categorySlug } = useParams();

  const { data: products = [], isLoading: loadingProducts, isError: productsError } =
    useProductsByCategory(categorySlug);
  const { data: categories, isLoading: loadingCategories, isError: categoriesError } =
    useProductCategories();

  const categoryData = categories?.find((c) => c.slug === categorySlug) || null;

  useEffect(() => { window.scrollTo(0, 0); }, [categorySlug]);

  // Show "not found" only when categories loaded successfully but slug not found
  if (!loadingCategories && !categoriesError && !categoryData) {
    return (
      <div className="w-full bg-white">
        <PageHero
          title="Category Not Found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Not Found" },
          ]}
          backgroundColor="from-slate-700 to-slate-900"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-[#434343] px-6 py-3 text-white font-semibold hover:bg-[#2a2a2a] transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Derive title from slug immediately (no API wait needed)
  const slugTitle = categorySlug
    ? categorySlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "";

  const fullTitle = categoryData?.heading || categoryData?.name || slugTitle;
  const titleWords = fullTitle.split(" ");
  const titleMain = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(" ");
  const titleAccent = titleWords.slice(Math.ceil(titleWords.length / 2)).join(" ");
  const descriptionHtml = categoryData?.description || "";
  const localImgs = CATEGORY_LOCAL_IMAGES[categorySlug];
  const heroImage = localImgs?.hero || categoryData?.image || null;
  const secondaryImage = localImgs?.secondary || products.find((p) => p.image && p.image !== heroImage)?.image || null;

  return (
    <div className="w-full bg-white overflow-x-hidden" key={categorySlug}>
      <SEO
        title={fullTitle}
        description={categoryData?.name || slugTitle}
        image={categoryData?.image}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative bg-white pt-28 pb-14 overflow-hidden">
        {/* Decorative red circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF2801] opacity-[0.07] pointer-events-none" />
        <div className="absolute top-8 right-12 w-48 h-48 rounded-full bg-[#FF2801] opacity-[0.10] pointer-events-none" />
        <div className="absolute top-36 right-48 w-20 h-20 rounded-full bg-[#FF2801] opacity-[0.13] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
            <Link to="/" className="hover:text-[#FF2801] transition">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-[#FF2801] transition">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-[#434343]">{categoryData.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Content */}
            <motion.div
              className="flex-1 max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#FF2801]" />
                <span className="text-sm font-bold text-[#FF2801] uppercase tracking-widest">Premium Quality</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="text-[#434343]">{titleMain} </span>
                {titleAccent && <span className="text-[#FF2801]">{titleAccent}</span>}
              </h1>
              <p className="mt-5 text-slate-600 text-base md:text-lg leading-relaxed">
                Delivering the finest {categoryData.name.toLowerCase()} products to the world with quality, care and commitment.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF2801] text-white font-semibold hover:bg-[#d42200] transition-colors shadow-lg shadow-red-200"
                >
                  Explore Products <span>→</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[#434343] text-[#434343] font-semibold hover:bg-[#434343] hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Feature badges */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                {HERO_FEATURES.map((feat) => (
                  <div
                    key={feat.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm"
                  >
                    <span className="text-xl flex-shrink-0">{feat.icon}</span>
                    <span className="text-sm font-semibold text-[#434343]">{feat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            {heroImage && (
              <motion.div
                className="flex-1 w-full max-w-lg relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-100">
                  <img
                    src={heroImage}
                    alt={categoryData.name}
                    className="w-full h-auto max-h-[480px] object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#FF2801] opacity-15 pointer-events-none" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-20 bg-[#FFF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Images with overlap */}
            <motion.div
              className="relative h-[400px] md:h-[460px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {heroImage && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={heroImage}
                    alt={categoryData.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              {secondaryImage && (
                <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                  <img
                    src={secondaryImage}
                    alt="product"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="absolute bottom-6 left-4 z-10 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-2">
                <span className="text-lg">🌏</span>
                <span className="text-xs font-bold text-[#434343]">Trusted by Buyers Worldwide</span>
              </div>
            </motion.div>

            {/* Right: Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-[#FF2801] uppercase tracking-widest">About Us</span>
                <span className="flex-1 max-w-[60px] h-[2px] bg-[#FF2801]/30" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#434343] mb-6 leading-tight">
                {fullTitle}
              </h2>
              {loadingCategories ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                  <div className="h-3 bg-slate-200 rounded w-4/6" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                </div>
              ) : (
                <div
                  className="text-slate-600 leading-relaxed prose prose-sm max-w-none prose-a:text-[#FF2801] prose-strong:text-[#434343]"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              )}
              <div className="mt-8 space-y-3">
                {ABOUT_FEATURES.map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FF2801]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-base">{f.icon}</span>
                    </div>
                    <span className="font-semibold text-[#434343]">{f.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#FF2801]" />
              <span className="text-sm font-bold text-[#FF2801] uppercase tracking-widest">Our Products</span>
              <span className="w-8 h-[2px] bg-[#FF2801]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#434343]">
              Our Range of{" "}
              <span className="text-[#FF2801]">{categoryData.name}</span>
            </h2>
            <div className="mt-3 h-1 w-20 mx-auto rounded-full bg-[#FF2801]/30" />
          </motion.div>

          {/* Grid */}
          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="rounded-2xl border-2 border-slate-100 bg-slate-100 h-44 md:h-52" />
                  <div className="mt-3 h-4 bg-slate-200 rounded-full w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : productsError ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">📡</div>
              <p className="text-slate-700 font-semibold text-lg mb-2">Unable to load products</p>
              <p className="text-slate-400 text-sm mb-6">Please check your internet connection and try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full bg-[#FF2801] text-white font-semibold hover:bg-[#d42200] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : products.length > 0 ? (
            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
              key={`grid-${categorySlug}`}
            >
              {products.map((item, index) =>
                item.image ? (
                  <motion.div key={item.id || item.slug} variants={gridItem} whileHover={{ y: -6 }}>
                    <Link to={`/products/${categorySlug}/${item.slug}`} className="group block">
                      <div className="overflow-hidden rounded-2xl border-[3px] border-[#FF2801] bg-white shadow-md shadow-red-100 hover:shadow-xl hover:shadow-red-200 transition-all duration-300">
                        <div className="relative h-44 md:h-52 w-full bg-[#FFF8F0]">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading={index < 4 ? "eager" : "lazy"}
                            fetchPriority={index < 4 ? "high" : "auto"}
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                      <h3 className="mt-3 text-sm md:text-base font-bold text-[#434343] group-hover:text-[#FF2801] transition-colors text-center">
                        {item.name}
                      </h3>
                    </Link>
                  </motion.div>
                ) : null
              )}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductsIndex;
