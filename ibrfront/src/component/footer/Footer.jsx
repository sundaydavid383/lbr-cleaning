import { useRef, useEffect, useState } from "react";
import "./footer.css";
import houseimage from "../../assets/house-cleaning.png";
import { Link } from "react-router";
import CustomAlert from "../../component/customAlert/CustomAlert";
import Loading from "../../component/loading/Loading";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const observer = useRef(null);

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

    const elements = document.querySelectorAll(".futup");
    elements.forEach((em) => observer.current.observe(em));

    return () => {
      if (observer.current) {
        elements.forEach((em) => observer.current.unobserve(em));
      }
    };
  }, []);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/subscribe`, {
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

  return (
    <div className="footer">
      {loading && <Loading message="Subscribing..." />}
      <CustomAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "success" })}
      />

      <div className="subscribe container">
        <h2>Stay in Touch</h2>
        <form onSubmit={onSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Enter Your Email"
          />
          <button type="submit" className="btn">
            <p>
              Subscribe <i className="fa-solid fa-arrow-right-long"></i>
            </p>
          </button>
        </form>

        <div className="socials">
          <Link className="iconactive" target="_blank" to="https://www.facebook.com/lbrcleaning">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link className="iconactive" target="_blank" to="https://www.instagram.com/lbrcleaning">
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link className="iconactive" target="_blank" to="https://www.youtube.com/@lbrcleaning">
            <i className="fa-brands fa-youtube"></i>
          </Link>
        </div>
      </div>

      <div className="main_footer container">
        <div className="main futup">
          <div className="logo">
            <img src={houseimage} alt="" />
            <p>LBR Cleaning</p>
          </div>
          <p>
            At LBR Cleaning, we offer professional, reliable, and affordable cleaning services tailored to meet your needs. From residential homes to commercial offices, our trained staff ensures every space shines with excellence. Your satisfaction is our top priority.
          </p>
        </div>

        <ul className="explore futup">
          <h2>Explore Links</h2>
          <li><Link to="/blog"><i className="fa-solid fa-blog"></i> Blog</Link></li>
          <li><Link to="/about"><i className="fa-solid fa-address-card"></i> About Us</Link></li>
          <li><Link to="/services"><i className="fa-brands fa-servicestack"></i> Services</Link></li>
          <li><Link to="/contact"><i className="fa-solid fa-phone"></i> Contact</Link></li>
        </ul>

        <div className="footer_details futup">
          <a 
  href="tel:08068686953" rel="noopener" aria-label="Call 08068686953" 
>
  <i className="fa-solid fa-phone"></i> 08068686953
  </a>

 <a 
  href="tel:08035331656"  rel="noopener" aria-label="Call 08035331656"
>
  <i className="fa-solid fa-phone"></i> 08035331656
          </a>
          <a href="whatsapp://send?phone=2348068686953">
              <i className="fa-brands fa-whatsapp"></i> 2348068686953
          </a>
          <a href="mailto:info@lbrcleaningservices">
            <p><i className="fa-solid fa-envelope"></i> info@lbrcleaningservices</p>
          </a>
        <a
        href="https://www.google.com/maps?q=Block+A6,+suite+39,+Sura+shopping+complex+Simpson+Street,+Lagos+Island"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-solid fa-location-dot"></i> 
        Block A6, suite 39, Sura shopping complex Simpson Street, Lagos Island
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