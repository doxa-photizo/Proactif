import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../Components/admin/AdminLayout';
import {
  Upload, Plus, Search, Pencil, Trash2, X, ImageIcon,
  Calendar, MoreVertical, AlertTriangle, FolderOpen, Loader2, LogOut, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { galleryApi, GalleryItem } from '../../lib/api';

// ─── Types ──────────────────────────────────────────────────────────────────────
type CategoryFilter = "All Gallery" | "Outreach" | "Campaign" | "Community" | "Skill Training";
const CATEGORIES: CategoryFilter[] = ["All Gallery", "Outreach", "Campaign", "Community", "Skill Training"];
const UPLOAD_CATEGORIES: GalleryItem["category"][] = ["Outreach", "Campaign", "Community", "Skill Training"];

// ─── Helper: Generate current month/year string ─────────────────────────────
function getCurrentMonthYear(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
  const router = useRouter();

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

  // Action menu on cards
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Upload form state
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<GalleryItem["category"]>("Outreach");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState(getCurrentMonthYear());
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Async operation states
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // ── Auth guard: redirect to login if no session ──────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin');
      } else {
        loadGallery();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load gallery from API ────────────────────────────────────────────────
  async function loadGallery() {
    try {
      const items = await galleryApi.getAll();
      setGalleryItems(items);
    } catch {
      setApiError("Failed to load gallery items. Check your connection.");
    } finally {
      setIsLoaded(true);
    }
  }

  // ── Sign out ─────────────────────────────────────────────────────────────
  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin');
  }

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
    setSelectedFile(null);
    setEditingItem(null);
    setApiError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    setFormImagePreview(item.src);
    setUploadMode("file");
    setFormImageUrl("");
    setSelectedFile(null);
    setApiError(null);
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
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    setApiError(null);
    setIsSaving(true);

    try {
      let imageSrc = uploadMode === "url" ? formImageUrl : formImagePreview;
      let storagePath: string | null = editingItem?.storage_path ?? null;

      // If a new file was selected, upload it first
      if (uploadMode === "file" && selectedFile) {
        const uploaded = await galleryApi.uploadImage(selectedFile);
        imageSrc = uploaded.url;
        storagePath = uploaded.storage_path;
      }

      if (!imageSrc || !formTitle.trim()) return;

      const payload = {
        src: imageSrc,
        storage_path: storagePath,
        title: formTitle.trim(),
        category: formCategory,
        description: formDescription.trim(),
        date: formDate,
        sort_order: editingItem?.sort_order ?? galleryItems.length + 1,
      };

      if (editingItem) {
        const updated = await galleryApi.update(editingItem.id, payload);
        setGalleryItems((prev) =>
          prev.map((item) => (item.id === editingItem.id ? updated : item))
        );
      } else {
        const created = await galleryApi.create(payload);
        setGalleryItems((prev) => [created, ...prev]);
      }

      setShowUploadModal(false);
      resetForm();
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Save failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      await galleryApi.delete(deletingItem.id);
      setGalleryItems((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setShowDeleteModal(false);
      setDeletingItem(null);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Delete failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  // Don't render until initial load completes
  if (!isLoaded) {
    return (
      <AdminLayout title="Gallery Management | ProActif Global">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="size-8 border-red-600 animate-spin text-red-600" />
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
        <div className="flex items-center gap-3">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-red-400 hover:text-red-600 transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
          <button
            onClick={openUploadModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Plus className="size-4" />
            Upload Image
          </button>
        </div>
      </div>

      {/* ── Global API error banner ─────────────────────────────────────── */}
      {apiError && !showUploadModal && !showDeleteModal && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
          <AlertCircle className="size-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{apiError}</p>
          <button onClick={() => setApiError(null)} className="ml-auto text-red-400 hover:text-red-600">
            <X className="size-4" />
          </button>
        </div>
      )}

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

                    {/* Category Badge */}
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

                      {/* Dropdown */}
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
                {/* API error inside modal */}
                {apiError && (
                  <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="size-5 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700">{apiError}</p>
                  </div>
                )}

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
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="absolute top-2 right-2 size-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                        >
                          <X className="size-4 text-gray-600" />
                        </button>
                        {selectedFile && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded-md">
                            New file selected — will upload on save
                          </div>
                        )}
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
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={
                    isSaving ||
                    !formTitle.trim() ||
                    (uploadMode === "file" && !formImagePreview) ||
                    (uploadMode === "url" && !formImageUrl.trim())
                  }
                  className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Upload className="size-4" />
                      {editingItem ? "Save Changes" : "Upload Image"}
                    </>
                  )}
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
                {apiError && (
                  <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg p-2">{apiError}</p>
                )}
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeletingItem(null); setApiError(null); }}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
