import { useRef, useEffect, useState } from "react";
import "./footer.css";
import houseimage from "../../assets/house-cleaning.png";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/api";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";
import { SITE_CONFIG } from "../../config/site";
import { useCmsCategory } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableList from "../editable/EditableList";

const Footer = () => {
  const { value: footerContent, loading: footerLoading } = useCmsCategory("footer", {});
  const { isEditMode } = useEditMode();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const observer = useRef(null);

  useEffect(() => {
    // Don't query .futup while the loading spinner is still showing —
    // the real footer content isn't in the DOM yet, so nothing gets
    // observed and nothing ever gets the "active" class that makes it
    // visible. Wait until footerLoading flips to false.
    if (footerLoading) return;

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

    const elements = document.querySelectorAll(".futup");
    elements.forEach((em) => observer.current.observe(em));

    return () => {
      if (observer.current) {
        elements.forEach((em) => observer.current.unobserve(em));
      }
    };
  }, [footerLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const regEmail = /^[A-Za-z0-9%._+-]{2,}@[A-Za-z0-9\-]{2,}\.[A-Za-z]{2,}$/;

    if (email.trim() === "") {
      setAlert({ message: "Please enter your email", type: "danger" });
      return;
    } else if (!regEmail.test(email)) {
      setAlert({ message: "Enter a valid email address", type: "danger" });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(apiUrl('/api/subscribe'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({ message: data.message, type: "success" });
        setEmail("");
      } else {
        setAlert({ message: data.message || "Something went wrong", type: "danger" });
      }
    } catch (err) {
      setAlert({ message: "Server error. Try again later.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  if (footerLoading) {
    return (
      <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-bars" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    );
  }

  const footerAbout = footerContent?.about || "At LBR Cleaning, we offer professional, reliable, and affordable cleaning services tailored to meet your needs. From residential homes to commercial offices, our trained staff ensures every space shines with excellence. Your satisfaction is our top priority.";
  const subscribeHeading = footerContent?.subscribe_heading || "Stay in Touch";
  const subscribePlaceholder = footerContent?.subscribe_placeholder || "Enter Your Email";
  const exploreLinks = footerContent?.explore_links || [
    { label: "Blog", to: "/blog", icon: "fa-solid fa-blog" },
    { label: "About Us", to: "/about", icon: "fa-solid fa-address-card" },
    { label: "Services", to: "/services", icon: "fa-brands fa-servicestack" },
    { label: "Contact", to: "/contact", icon: "fa-solid fa-phone" }
  ];
  const socialLinks = footerContent?.social_links || [
    { url: "https://www.facebook.com/lbrcleaning", icon: "fa-brands fa-facebook-f" },
    { url: "https://www.instagram.com/lbrcleaning", icon: "fa-brands fa-instagram" },
    { url: "https://www.youtube.com/@lbrcleaning", icon: "fa-brands fa-youtube" }
  ];

  return (
    <div className="footer">
      {loading && <Loading message="Subscribing..." />}
      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "success" })}
      />

      <div className="subscribe container">
        <h2><EditableText cmsKey="footer.subscribe_heading" type="text" value={subscribeHeading} /></h2>

        {isEditMode && (
          <div className="editable-inline-note">
            <span className="editable-inline-note-label">Placeholder text:</span>
            <EditableText cmsKey="footer.subscribe_placeholder" type="text" value={subscribePlaceholder} />
          </div>
        )}

        <form onSubmit={onSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder={subscribePlaceholder}
            disabled={isEditMode}
          />
          <button type="submit" className="btn" disabled={isEditMode}>
            <p>
              Subscribe <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </button>
        </form>

        <div className="socials">
          <EditableList
            cmsKey="footer.social_links"
            type="array"
            value={socialLinks}
            itemWrapperTag="span"
            fields={[
              { key: "url", label: "Link URL" },
              { key: "icon", label: "Icon class (e.g. fa-brands fa-instagram)" },
            ]}
          >
            {(link, idx) => (
              <a key={idx} className="iconactive" target="_blank" rel="noopener noreferrer" href={link.url}>
                <i className={link.icon}></i>
              </a>
            )}
          </EditableList>
        </div>
      </div>

      <div className="main_footer container">
        <div className="main futup">
          <div className="logo">
            <img src={houseimage} alt="" />
          </div>
          <p><EditableText cmsKey="footer.about" type="text" value={footerAbout} /></p>
        </div>

        <ul className="explore futup">
          <h2>Explore Links</h2>
          <EditableList
            cmsKey="footer.explore_links"
            type="array"
            value={exploreLinks}
            itemWrapperTag="li"
            fields={[
              { key: "label", label: "Label" },
              { key: "to", label: "Link (e.g. /about)" },
              { key: "icon", label: "Icon class (e.g. fa-solid fa-blog)" },
            ]}
          >
            {(link, idx) => (
              <Link key={idx} to={link.to}><i className={link.icon}></i> {link.label}</Link>
            )}
          </EditableList>
        </ul>

        <div className="footer_details futup">
          
          <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
            rel="noopener"
            aria-label={`Call ${SITE_CONFIG.phone}`}
          >
            <i className="fa-solid fa-phone"></i> {SITE_CONFIG.phone}
          </a>

          
          <a href=""={`https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`}>
            <p><i className="fa-solid fa-envelope"></i> {SITE_CONFIG.email}</p>
          </a>
          
          <a href=""={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-location-dot"></i>
            {SITE_CONFIG.address}
          </a>
        </div>
      </div>

      <div className="copyright">
        ©{new Date().getFullYear()} All Rights Reserved <span>LBR Cleaning</span>. Designed & Built by DavidFoster.
      </div>
    </div>
  );
};

export default Footer;