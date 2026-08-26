import React, { useEffect, useState, useMemo } from "react";
import Loading from "../../component/loading/Loading";
import BlogModal from "../../component/blogModal/BlogModal";
import FeaturedPost from "../../component/featuredPost/FeaturedPost";
import CategoryFilter from "../../component/categoryFilter/CategoryFilter";
import NewsletterSignup from "../../component/newsletterSignup/NewsletterSignup";
import "./blog.css";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { BlogSkeleton } from "../../component/pageSkeleton/PageSkeleton";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../../component/editable/EditableText";
import EditableList from "../../component/editable/EditableList";

const NewsBlog = () => {
  const { value: blogContent, loading: blogLoading } = useCmsCategory("blog", {});
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useManual, setUseManual] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const { isEditMode } = useEditMode();

  const blogsPerPage = 6;

  const cmsArticles = blogContent?.articles || [];

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

  if (!blogContent && !useManual) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No blog content available. Please configure the CMS or enable live news.</p>
      </div>
    );
  }

  return (<>
    <section className="blog-container">
      {isEditMode ? (
        <EditableText cmsKey="blog.title" type="text" value="LBR Cleaning Insights" as="h2" className="blog-title" />
      ) : (
        <h2 className="blog-title">LBR Cleaning Insights</h2>
      )}

      {!isEditMode && (
        <div className="blog-toggle">
          <button
            className={useManual ? "toggle-btn active" : "toggle-btn"}
            onClick={handleToggleSource}
          >
            {isEditMode ? (
              <EditableText cmsKey="blog.toggle_text" type="text" value={useManual ? "Showing Live News" : "Showing CMS Blogs"} as="span" />
            ) : (
              `${useManual ? "Showing Live News" : "Showing CMS Blogs"} — Click to Switch`
            )}
          </button>
        </div>
      )}

      {!loading && !useManual && cmsArticles.length > 0 && (
        <>
          <FeaturedPost articles={cmsArticles.slice(0, 1)} />
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
              {isEditMode ? (
                <EditableText cmsKey="blog.empty_state" type="text" value="No CMS articles found. Add blog articles in the CMS admin panel." as="p" />
              ) : (
                <p>No CMS articles found. Add blog articles in the CMS admin panel.</p>
              )}
            </div>
          )}

          <div className="blog-grid">
            {currentBlogs.map((a, idx) => (
              <article key={idx} className="blog-card" onClick={() => openModal(a)}>
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
                    Source: {a.source_id || "unknown"} | {new Date(a.pubDate).toLocaleDateString()}
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
