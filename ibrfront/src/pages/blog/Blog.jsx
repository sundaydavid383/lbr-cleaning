import React, { useEffect, useState, useMemo } from "react";
import Loading from "../../component/loading/Loading";
import BlogModal from "../../component/blogModal/BlogModal";
import FeaturedPost from "../../component/featuredPost/FeaturedPost";
import CategoryFilter from "../../component/categoryFilter/CategoryFilter";
import NewsletterSignup from "../../component/newsletterSignup/NewsletterSignup";
import "./blog.css";
import { useCms, useCmsReady } from "../../hooks/useCmsContent";
import EditSection from "../../component/editable/EditSection";

export const BLOG_POST_FIELDS = [
  { key: "title", type: "text", label: "Title" },
  { key: "image_url", type: "image", label: "Cover picture" },
  {
    key: "summary",
    type: "textarea",
    rows: 14,
    label: "Article text",
    help: "Leave an empty line between paragraphs. A short line ending with a colon (:) becomes a sub-heading.",
  },
  { key: "author", type: "text", label: "Author" },
  { key: "pubDate", type: "text", label: "Date (YYYY-MM-DD)", placeholder: "2026-01-31" },
  { key: "readTime", type: "text", label: "Reading time (e.g. 5 min read)" },
  { key: "tags", type: "list", label: "Topics / tags", itemLabel: "tag", help: "Used for the topic filter buttons." },
  { key: "source_id", hidden: true },
];

export const newBlogPost = () => ({
  title: "New article",
  image_url: "",
  summary: "",
  author: "LBR Editorial",
  pubDate: new Date().toISOString().slice(0, 10),
  readTime: "3 min read",
  tags: [],
  source_id: "LBR",
});
import { BlogSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";

const NewsBlog = () => {
  const blogLoading = !useCmsReady();
  const storedArticles = useCms("blog.articles", []);
  const blogTitle = useCms("blog.title", "LBR Cleaning Insights");
  const showLiveNews = useCms("blog.show_live_news", true);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useManual, setUseManual] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const { isEditMode, openPanel } = useEditMode();

  const blogsPerPage = 6;

  const cmsArticles = Array.isArray(storedArticles) ? storedArticles : [];

  const managePosts = (index = null) =>
    openPanel({
      cmsKey: "blog.articles",
      root: cmsArticles,
      value: cmsArticles,
      title: "Blog posts",
      help: "Add, edit, delete or reorder articles. The first article is shown as the big 'Featured' post.",
      field: { type: "items", itemLabel: "article", fields: BLOG_POST_FIELDS, newItem: newBlogPost, initialOpen: index, label: "" },
      openedAt: Date.now(),
    });

  const displayArticles = useManual ? articles : cmsArticles;

  const allCategories = useMemo(() => {
    const cats = new Set(["All"]);
    displayArticles.forEach((a) => a.tags?.forEach((t) => cats.add(t)));
    return Array.from(cats);
  }, [displayArticles]);

  const filteredArticles = useMemo(() => {
    let result = [...displayArticles];

    if (activeCategory !== "All") {
      result = result.filter((a) => a.tags?.includes(activeCategory));
    }

    if (searchTerm.trim()) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
          a.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [displayArticles, searchTerm, activeCategory]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredArticles.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredArticles.length / blogsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    const fetchCleaningBlog = async () => {
      setLoading(true);

      try {
        if (useManual) {
          const res = await fetch(
            `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en&q=clean OR hygiene OR sanitiz`
          );
          const json = await res.json();
          if (json?.results?.length > 0) {
            setArticles(json.results);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (useManual) {
      fetchCleaningBlog();
    } else {
      setLoading(false);
    }
  }, [apiKey, useManual]);

  const handleToggleSource = () => {
    setUseManual((prev) => !prev);
    setCurrentPage(1);
  };

  if (blogLoading) {
    return <BlogSkeleton />;
  }

  return (<>
    <section className="blog-container">
      <EditableText cmsKey="blog.title" value={blogTitle} as="h2" className="blog-title" label="Page heading" />

      {isEditMode && (
        <div className="cms-section-bar">
          <button type="button" className="cms-section-btn primary" onClick={() => managePosts(null)}>
            <i className="fa-solid fa-newspaper"></i> Manage blog posts ({cmsArticles.length})
          </button>
          <EditSection
            inline
            cmsKey="blog.show_live_news"
            root={true}
            label={`"Live news" button: ${showLiveNews === false ? "hidden" : "shown"}`}
            icon="fa-rss"
            field={{ type: "boolean", label: "Show the button that switches to live cleaning news from the internet", onText: "Shown", offText: "Hidden" }}
          />
        </div>
      )}

      {!isEditMode && showLiveNews !== false && (
        <div className="blog-toggle">
          <button
            className={useManual ? "toggle-btn active" : "toggle-btn"}
            onClick={handleToggleSource}
          >
            {`${useManual ? "Showing Live News" : "Showing Our Articles"} — Click to Switch`}
          </button>
        </div>
      )}

      {!loading && !useManual && cmsArticles.length > 0 && (
        <>
          <FeaturedPost articles={cmsArticles.slice(0, 1)} onEdit={isEditMode ? () => managePosts(0) : undefined} />
          <CategoryFilter
            categories={allCategories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </>
      )}

      {loading ? (
        <Loading message="Fetching expert cleaning insights..." />
      ) : (
        <>
          {!useManual && cmsArticles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <EditableText cmsKey="blog.empty_state" value="No articles yet — check back soon." as="p" label="Message when there are no articles" />
            </div>
          )}

          <div className="blog-grid">
            {currentBlogs.map((a, idx) => (
              <article
                key={idx}
                className={`blog-card ${isEditMode && !useManual ? "editable-list-item-wrap" : ""}`}
                onClick={() => (isEditMode && !useManual ? managePosts(cmsArticles.indexOf(a)) : openModal(a))}
                title={isEditMode && !useManual ? "Click to edit this article" : undefined}
              >
                {isEditMode && !useManual && (
                  <span className="editable-list-controls" aria-hidden="true">
                    <i className="fa-solid fa-pen"></i> Edit
                  </span>
                )}
                {a.image_url && (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="blog-image"
                    loading="lazy"
                  />
                )}
                <div className="blog-content">
                  <h3 className="blog-headline">{a.title}</h3>
                  <p className="blog-desc">
                    {a.summary || a.description
                      ? (a.summary || a.description).slice(0, 120) + "..."
                      : "No description available."}
                  </p>
                  {!useManual && (
                    <div className="blog-meta-block">
                      <p className="blog-author-meta">
                        <span>By <strong>{a.author}</strong></span> • <span>{a.readTime}</span>
                      </p>
                      {a.tags && (
                        <div className="blog-tags">
                          {a.tags.map((tag, i) => (
                            <span key={i} className="blog-tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <small className="blog-meta-bottom">
                    {useManual ? `Source: ${a.source_id || "unknown"} | ` : ""}{a.pubDate ? new Date(a.pubDate).toLocaleDateString() : ""}
                  </small>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button onClick={prevPage} disabled={currentPage === 1}>
                ⬅ Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next ➡
              </button>
            </div>
          )}
        </>
      )}
    </section>
    {modalOpen && selectedArticle && (
      <BlogModal article={selectedArticle} onClose={closeModal} />
    )}
    <NewsletterSignup />
   </>
  );
};

export default NewsBlog;
