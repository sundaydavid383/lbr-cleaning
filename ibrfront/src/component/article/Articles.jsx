import { useRef, useEffect, useState } from "react"; 
import "./articles.css";
import BlogModal from "../blogModal/BlogModal"; // make sure path is correct

const Articles = ({ articles }) => {
  const observer = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.current.unobserve(entry.target);
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".article_card");
    elements.forEach((lit) => observer.current.observe(lit));

    return () => {
      if (observer.current) {
        elements.forEach((lit) => observer.current.unobserve(lit));
      }
    };
  }, []);

  return (
    <div className="articles">
      <div className="title">
        <span className="primary">Pricing Plan</span>
        <h2 className="bright">Easy Steps to Works</h2>
      </div>

      <div className="articles_container container">
        {articles.map((article, index) => {
          // Safely split date
          const [year, month, day] = article.date ? article.date.split("-") : ["", "", ""];

          return (
            <div key={index} className={`article_card art${index}`}>
              <div className="articles_image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="author">{article.author || "Unknown"}</div>
              {article.date && (
                <span className="date">
                  <div className="day">{day}</div>
                  <div className="month">{month}</div>
                  <div className="year">{year}</div>
                </span>
              )}

              <h2>{article.title}</h2>
              <p className="articelp">{article.gist1?.slice(0, 199)}...</p>

              <button
                className="btn"
                onClick={() =>
                  setSelectedArticle({
                    title: article.title || "Untitled",
                    author: article.author || "Unknown",
                    pubDate: article.date || "",
                    image_url: article.image?.startsWith("http")
                      ? article.image
                      : article.image, // fallback if only filename
                    summary: article.gist1 || "",
                    link: article.link || "",
                    readTime: article.readTime || "N/A",
                    tags: article.tags || [],
                    source_id: article.source_id || "",
                    content: article.content || article.gist1 || "No content available",
                  })
                }
              >
                <p>
                  Read Blog <i className="fa-solid fa-arrow-right-long"></i>
                </p>
              </button>
            </div>
          );
        })}
      </div>

      {/* Show BlogModal if article is selected */}
      {selectedArticle && (
        <BlogModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Articles;