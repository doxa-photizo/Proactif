import React, { useState, useEffect, useRef, useCallback } from 'react';
import AdminLayout from '../../Components/admin/AdminLayout';
import { 
  Upload, Plus, Search, Pencil, Trash2, X, ImageIcon, 
  Calendar, Tag, MoreVertical, AlertTriangle, FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Types ──────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  category: "Outreach" | "Skill Training" | "Campaign" | "Community";
  date: string;
}

type CategoryFilter = "All Gallery" | "Outreach" | "Campaign" | "Community" | "Skill Training";
const CATEGORIES: CategoryFilter[] = ["All Gallery", "Outreach", "Campaign", "Community", "Skill Training"];
const UPLOAD_CATEGORIES: GalleryItem["category"][] = ["Outreach", "Campaign", "Community", "Skill Training"];

const STORAGE_KEY = "proactif_gallery_items";

// ─── Default gallery items (same as public gallery page) ────────────────────
const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/pics/518226923_1053274810205884_6026172535522266822_n.jpg.jpeg",
    title: "Auntie Olivia Interactive Sessions",
    category: "Campaign",
    date: "May 2026",
    description: "One of our lively interactive sessions hosted by Auntie Olivia, translating critical HIV prevention and statistics data into accessible conversations for youth."
  },
  {
    id: "2",
    src: "/pics/513339070_1045077647692267_2937331783500375861_n.jpg.jpeg",
    title: "Youth Outreach and Advocacy Program",
    category: "Outreach",
    date: "April 2026",
    description: "Our dedicated advocacy team interacting with members of the community during a sexual and reproductive health rights (SRHR) outreach campaign."
  },
  {
    id: "3",
    src: "/pics/512622255_1045077861025579_6316323764039927434_n.jpg.jpeg",
    title: "Advocacy Discussion in Community Space",
    category: "Outreach",
    date: "April 2026",
    description: "Engaging local youth in discussions regarding reproductive health rights, stigma reduction, and access to wellness resources."
  },
  {
    id: "4",
    src: "/pics/499568633_1041522131381152_1360240325143299074_n.jpg.jpeg",
    title: "Hyɛ Fa YƆ Condom Activation",
    category: "Campaign",
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
    category: "Outreach",
    date: "December 2025",
    description: "Delivering important health and advocacy education to junior high and high school students to raise awareness on reproductive health."
  },
  {
    id: "7",
    src: "/pics/483062697_966365055563527_7572722531427655458_n.jpg.jpeg",
    title: "Hands-on Skills Workshop",
    category: "Skill Training",
    date: "November 2025",
    description: "Providing training to young women under the Skills Acquisition Program (SAP) to promote economic independence and career development."
  },
  {
    id: "8",
    src: "/pics/482197166_966366308896735_5985049562207227629_n.jpg.jpeg",
    title: "Socio-Economic Mentorship Seminar",
    category: "Skill Training",
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
    category: "Campaign",
    date: "September 2025",
    description: "The public launch of the Myth Busters Campaign, bringing awareness to correct common misconceptions surrounding HIV and transmission routes."
  },
  {
    id: "11",
    src: "/pics/476979939_948122450721121_8783551046445758990_n.jpg.jpeg",
    title: "Community Distribution Drive",
    category: "Outreach",
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
    category: "Skill Training",
    date: "June 2025",
    description: "Participants learning dressmaking and fashion design as part of their vocational track in the Skills Acquisition Program (SAP)."
  },
  {
    id: "14",
    src: "/pics/drinks productions.jpeg",
    title: "Beverage and Food Production Session",
    category: "Skill Training",
    date: "May 2025",
    description: "Women learning food processing and beverage production techniques to start small-scale retail and catering businesses."
  },
  {
    id: "15",
    src: "/pics/condoms.jpeg",
    title: "Safer Sex Awareness Materials",
    category: "Campaign",
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
    category: "Outreach",
    date: "November 2024",
    description: "Planning and implementing healthcare resource distribution to youth in underserved municipalities."
  }
];

// ─── Helper: Generate current month/year string ─────────────────────────────
function getCurrentMonthYear(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ─── Helper: Generate unique ID ─────────────────────────────────────────────
function generateId(): string {
  return `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

// ─── Category Badge Color Map ───────────────────────────────────────────────
const categoryColors: Record<GalleryItem["category"], { bg: string; text: string }> = {
  Outreach: { bg: "bg-blue-100", text: "text-blue-700" },
  Campaign: { bg: "bg-amber-100", text: "text-amber-700" },
  Community: { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Skill Training": { bg: "bg-purple-100", text: "text-purple-700" },
};

// ═════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function AdminGallery() {
  // ── State ───────────────────────────────────────────────────────────────
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All Gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);

  // Active action menu (for the 3-dot menu on cards)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Upload form state
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<GalleryItem["category"]>("Outreach");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState(getCurrentMonthYear());
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load from localStorage on mount ─────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as GalleryItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGalleryItems(parsed);
          setIsLoaded(true);
          return;
        }
      }
    } catch {
      // fall through
    }
    // Initialize with defaults
    setGalleryItems(defaultGalleryItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGalleryItems));
    setIsLoaded(true);
  }, []);

  // ── Persist to localStorage whenever items change ───────────────────────
  const persistItems = useCallback((items: GalleryItem[]) => {
    setGalleryItems(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  // ── Close menu when clicking outside ────────────────────────────────────
  useEffect(() => {
    function handleClickOutside() {
      setActiveMenuId(null);
    }
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  // ── Filtering ───────────────────────────────────────────────────────────
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeFilter === "All Gallery" || item.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ── Stats ───────────────────────────────────────────────────────────────
  const totalImages = galleryItems.length;
  const categoryStats = UPLOAD_CATEGORIES.map((cat) => ({
    name: cat,
    count: galleryItems.filter((i) => i.category === cat).length,
  }));

  // ── Form helpers ────────────────────────────────────────────────────────
  function resetForm() {
    setFormTitle("");
    setFormCategory("Outreach");
    setFormDescription("");
    setFormDate(getCurrentMonthYear());
    setFormImagePreview(null);
    setFormImageUrl("");
    setUploadMode("file");
    setEditingItem(null);
  }

  function openUploadModal() {
    resetForm();
    setShowUploadModal(true);
  }

  function openEditModal(item: GalleryItem) {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormDate(item.date);
    // Detect if the src is a URL or base64
    if (item.src.startsWith("data:") || item.src.startsWith("/")) {
      setFormImagePreview(item.src);
      setUploadMode("file");
      setFormImageUrl("");
    } else {
      setFormImageUrl(item.src);
      setUploadMode("url");
      setFormImagePreview(null);
    }
    setShowUploadModal(true);
    setActiveMenuId(null);
  }

  function openDeleteModal(item: GalleryItem) {
    setDeletingItem(item);
    setShowDeleteModal(true);
    setActiveMenuId(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    const imageSrc =
      uploadMode === "url" ? formImageUrl : formImagePreview;
    if (!imageSrc || !formTitle.trim()) return;

    if (editingItem) {
      // Update existing
      const updated = galleryItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              src: imageSrc,
              title: formTitle.trim(),
              category: formCategory,
              description: formDescription.trim(),
              date: formDate,
            }
          : item
      );
      persistItems(updated);
    } else {
      // Create new
      const newItem: GalleryItem = {
        id: generateId(),
        src: imageSrc,
        title: formTitle.trim(),
        category: formCategory,
        description: formDescription.trim(),
        date: formDate,
      };
      persistItems([newItem, ...galleryItems]);
    }
    setShowUploadModal(false);
    resetForm();
  }

  function handleDelete() {
    if (!deletingItem) return;
    const updated = galleryItems.filter((item) => item.id !== deletingItem.id);
    persistItems(updated);
    setShowDeleteModal(false);
    setDeletingItem(null);
  }

  // Don't render until localStorage is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <AdminLayout title="Gallery Management | ProActif Global">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="size-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <AdminLayout title="Gallery Management | ProActif Global">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">
            Manage and organize gallery images displayed on the website.
          </p>
        </div>
        <button
          onClick={openUploadModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Plus className="size-4" />
          Upload Image
        </button>
      </div>

      {/* ── Stats Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Images</div>
          <div className="text-3xl font-bold text-gray-900">{totalImages}</div>
        </div>
        {categoryStats.map((stat) => (
          <div key={stat.name} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="text-sm font-medium text-gray-500 mb-1">{stat.name}</div>
            <div className={`text-3xl font-bold ${categoryColors[stat.name].text}`}>{stat.count}</div>
          </div>
        ))}
      </div>

      {/* ── Search & Category Tabs ─────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-red-400 hover:text-red-600"
              }`}
            >
              {cat}
              {cat !== "All Gallery" && (
                <span className={`ml-1.5 text-xs ${activeFilter === cat ? "text-red-200" : "text-gray-400"}`}>
                  ({galleryItems.filter(i => i.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white text-gray-900 outline-none transition-colors"
            placeholder="Search images..."
          />
        </div>
      </div>

      {/* ── Gallery Grid or Empty State ────────────────────────────────── */}
      {filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200"
        >
          <div className="size-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <FolderOpen className="size-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">
            {searchQuery
              ? "No images match your search. Try a different keyword."
              : "Upload your first image to this category."}
          </p>
          {!searchQuery && (
            <button
              onClick={openUploadModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-700 transition-colors"
            >
              <Upload className="size-4" />
              Upload Image
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const colors = categoryColors[item.category];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                    {/* Category Badge on image */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                        {item.category}
                      </span>
                    </div>

                    {/* 3-dot menu */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === item.id ? null : item.id);
                        }}
                        className="size-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white cursor-pointer"
                      >
                        <MoreVertical className="size-4 text-gray-700" />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeMenuId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 w-36"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => openEditModal(item)}
                              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Pencil className="size-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(item)}
                              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="size-3.5" />
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="size-3" />
                        {item.date}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="size-7 rounded-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="size-7 rounded-md flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Results count */}
      {filteredItems.length > 0 && (
        <div className="mt-6 text-sm text-gray-500 text-center">
          Showing {filteredItems.length} of {totalImages} images
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          UPLOAD / EDIT MODAL
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setShowUploadModal(false); resetForm(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingItem ? "Edit Image" : "Upload Image"}
                </h2>
                <button
                  onClick={() => { setShowUploadModal(false); resetForm(); }}
                  className="size-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Image Source Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Source</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUploadMode("file")}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        uploadMode === "file"
                          ? "bg-red-50 border-red-300 text-red-700"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      onClick={() => setUploadMode("url")}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        uploadMode === "url"
                          ? "bg-red-50 border-red-300 text-red-700"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {/* File Upload Area */}
                {uploadMode === "file" ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {formImagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
                        <img
                          src={formImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setFormImagePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="absolute top-2 right-2 size-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                        >
                          <X className="size-4 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-400 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer"
                      >
                        <div className="size-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <ImageIcon className="size-6 text-red-500" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white text-gray-900 outline-none transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formImageUrl && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
                        <img
                          src={formImageUrl}
                          alt="URL Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Image Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white text-gray-900 outline-none transition-colors"
                    placeholder="Enter image title..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GalleryItem["category"])}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white text-gray-900 outline-none transition-colors appearance-none"
                  >
                    {UPLOAD_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white text-gray-900 outline-none transition-colors"
                    placeholder="e.g. August 2026"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description (optional)</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white text-gray-900 outline-none transition-colors resize-none"
                    placeholder="Describe this image..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={() => { setShowUploadModal(false); resetForm(); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={
                    !formTitle.trim() ||
                    (uploadMode === "file" && !formImagePreview) ||
                    (uploadMode === "url" && !formImageUrl.trim())
                  }
                  className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  <Upload className="size-4" />
                  {editingItem ? "Save Changes" : "Upload Image"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════
          DELETE CONFIRMATION MODAL
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showDeleteModal && deletingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setShowDeleteModal(false); setDeletingItem(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-6 text-center">
                <div className="size-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="size-7 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Image?</h3>
                <p className="text-sm text-gray-500 mb-1">
                  You are about to delete <strong className="text-gray-700">&ldquo;{deletingItem.title}&rdquo;</strong>.
                </p>
                <p className="text-sm text-red-500 font-medium">This action cannot be undone.</p>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeletingItem(null); }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
