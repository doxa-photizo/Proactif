import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Maximize2 } from "lucide-react";
import Head from "next/head";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  category: "Outreaches" | "Skills Training" | "Campaigns" | "Community";
  date: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/pics/518226923_1053274810205884_6026172535522266822_n.jpg.jpeg",
    title: "Auntie Olivia Interactive Sessions",
    category: "Campaigns",
    date: "May 2026",
    description: "One of our lively interactive sessions hosted by Auntie Olivia, translating critical HIV prevention and statistics data into accessible conversations for youth."
  },
  {
    id: "2",
    src: "/pics/513339070_1045077647692267_2937331783500375861_n.jpg.jpeg",
    title: "Youth Outreach and Advocacy Program",
    category: "Outreaches",
    date: "April 2026",
    description: "Our dedicated advocacy team interacting with members of the community during a sexual and reproductive health rights (SRHR) outreach campaign."
  },
  {
    id: "3",
    src: "/pics/512622255_1045077861025579_6316323764039927434_n.jpg.jpeg",
    title: "Advocacy Discussion in Community Space",
    category: "Outreaches",
    date: "April 2026",
    description: "Engaging local youth in discussions regarding reproductive health rights, stigma reduction, and access to wellness resources."
  },
  {
    id: "4",
    src: "/pics/499568633_1041522131381152_1360240325143299074_n.jpg.jpeg",
    title: "Hyɛ Fa YƆ Condom Activation",
    category: "Campaigns",
    date: "February 2026",
    description: "Community organizers presenting resources and materials for our flagship Hyɛ Fa YƆ condom activation program to reduce STIs and unplanned pregnancies."
  },
  {
    id: "5",
    src: "/pics/493276356_1000158738850825_8837086453588687174_n.jpg.jpeg",
    title: "Peer Support Session",
    category: "Community",
    date: "January 2026",
    description: "Facilitators guiding a peer support group discussion, encouraging participants to open up in a safe and supportive space."
  },
  {
    id: "6",
    src: "/pics/491354364_1000158678850831_7794252359931159666_n.jpg.jpeg",
    title: "In-School Educational Campaign",
    category: "Outreaches",
    date: "December 2025",
    description: "Delivering important health and advocacy education to junior high and high school students to raise awareness on reproductive health."
  },
  {
    id: "7",
    src: "/pics/483062697_966365055563527_7572722531427655458_n.jpg.jpeg",
    title: "Hands-on Skills Workshop",
    category: "Skills Training",
    date: "November 2025",
    description: "Providing training to young women under the Skills Acquisition Program (SAP) to promote economic independence and career development."
  },
  {
    id: "8",
    src: "/pics/482197166_966366308896735_5985049562207227629_n.jpg.jpeg",
    title: "Socio-Economic Mentorship Seminar",
    category: "Skills Training",
    date: "October 2025",
    description: "Vocational coaches and educators offering mentorship and sharing entrepreneurship insights with our project beneficiaries."
  },
  {
    id: "9",
    src: "/pics/482022501_966365645563468_5816751096030092575_n.jpg.jpeg",
    title: "Volunteer Capacity Training",
    category: "Community",
    date: "October 2025",
    description: "Building capacity and preparation skills for our passionate community health advocates and volunteer organizers."
  },
  {
    id: "10",
    src: "/pics/481991141_966367578896608_3932129211364578454_n.jpg.jpeg",
    title: "Myth Busters Public Launch",
    category: "Campaigns",
    date: "September 2025",
    description: "The public launch of the Myth Busters Campaign, bringing awareness to correct common misconceptions surrounding HIV and transmission routes."
  },
  {
    id: "11",
    src: "/pics/476979939_948122450721121_8783551046445758990_n.jpg.jpeg",
    title: "Community Distribution Drive",
    category: "Outreaches",
    date: "August 2025",
    description: "Organizing and packing materials for a health distribution drive, delivering items directly to marginalized communities."
  },
  {
    id: "12",
    src: "/pics/orientation.jpeg",
    title: "Volunteer Orientation and Team Alignment",
    category: "Community",
    date: "July 2025",
    description: "A gathering of volunteers and team leaders aligning goals for the upcoming community engagement schedules."
  },
  {
    id: "13",
    src: "/pics/skill acquire.jpeg",
    title: "Tailoring and Fashion Design Class",
    category: "Skills Training",
    date: "June 2025",
    description: "Participants learning dressmaking and fashion design as part of their vocational track in the Skills Acquisition Program (SAP)."
  },
  {
    id: "14",
    src: "/pics/drinks productions.jpeg",
    title: "Beverage and Food Production Session",
    category: "Skills Training",
    date: "May 2025",
    description: "Women learning food processing and beverage production techniques to start small-scale retail and catering businesses."
  },
  {
    id: "15",
    src: "/pics/condoms.jpeg",
    title: "Safer Sex Awareness Materials",
    category: "Campaigns",
    date: "April 2025",
    description: "Educational brochures and resources organized for the Hyɛ Fa YƆ activation to help reduce HIV transmission rate."
  },
  {
    id: "16",
    src: "/pics/Volunteer.jpeg",
    title: "Our Community Outreach Volunteers",
    category: "Community",
    date: "March 2025",
    description: "Our dedicated group of volunteer peer educators posing at the start of a regional community health outreach."
  },
  {
    id: "17",
    src: "/pics/mentoring.png",
    title: "Mentorship and Leadership Program",
    category: "Community",
    date: "January 2025",
    description: "A collaborative mentorship session for young leaders, focused on building self-esteem and decision-making capacities."
  },
  {
    id: "18",
    src: "/pics/Outreaches.png",
    title: "Regional Health Outreach Planning",
    category: "Outreaches",
    date: "November 2024",
    description: "Planning and implementing healthcare resource distribution to youth in underserved municipalities."
  }
];

const categories = ["All", "Outreaches", "Skills Training", "Campaigns", "Community"] as const;
type CategoryType = typeof categories[number];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <>
      <Head>
        <title>Gallery | ProActif Global</title>
        <meta
          name="description"
          content="Explore moments of impact, community outreach, skills training programs, and advocacy campaigns run by ProActif Global."
        />
      </Head>

      <Navbar />

      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Gallery</h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                Capturing moments of change, empowerment, learning, and connection across our communities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null); // Reset lightbox on category change just in case
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-red-600 text-white shadow-md shadow-red-200 scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-red-500 hover:text-red-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Grid Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item.id}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] flex flex-col justify-end"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Content Layer */}
                    <div className="relative p-6 z-10 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-red-600/90 rounded-full text-xs font-semibold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-300 flex items-center gap-1 font-medium">
                          <Calendar className="size-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold line-clamp-1 mb-1 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Maximize Icon */}
                    <div className="absolute top-4 right-4 z-20 size-10 bg-black/40 backdrop-blur-[2px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="size-4 text-white" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-gray-500">No images found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div className="relative flex justify-between items-center w-full px-6 py-4 z-10">
              <div className="text-white">
                <span className="px-3 py-1 bg-red-600 text-xs font-semibold rounded-full uppercase tracking-wider mr-3">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="size-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Middle Container (Image + Arrows) */}
            <div className="relative flex-grow flex items-center justify-center px-4 md:px-12 max-h-[70vh]">
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
                }}
                className="absolute left-4 md:left-8 z-10 size-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="size-7" />
              </button>

              {/* Main Image Container */}
              <div
                className="relative max-w-5xl max-h-full aspect-[4/3] w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
                }}
                className="absolute right-4 md:right-8 z-10 size-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="size-7" />
              </button>
            </div>

            {/* Bottom Info Details */}
            <div
              className="relative bg-gradient-to-t from-black via-black/90 to-transparent w-full text-white px-6 pb-12 pt-8 text-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-3xl mx-auto space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-red-500">
                  {filteredItems[lightboxIndex].title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Tag className="size-4" />
                  <span>Category: {filteredItems[lightboxIndex].category}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="size-4" />
                  <span>Date: {filteredItems[lightboxIndex].date}</span>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
