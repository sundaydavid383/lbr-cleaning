import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

const UserGuideContext = createContext(null);

const STORAGE_KEY = "lbr_user_guide_completed";

const GUIDE_STEPS = {
  "/": [
    { target: ".hero", title: "Welcome to LBR Cleaning!", description: "This is your homepage. Here you'll find our latest cleaning offers, services, and a quick way to book your cleaning session.", icon: "fa-solid fa-house" },
    { target: ".home-how-it-works", title: "How It Works", description: "Booking a clean is fast and simple. Just follow these 4 easy steps and we'll take care of the rest.", icon: "fa-solid fa-list-check" },
    { target: ".home-guarantee", title: "Our Promise", description: "We guarantee 100% satisfaction. If you're not happy, we'll re-clean for free within 24 hours.", icon: "fa-solid fa-shield-halved" },
    { target: ".guarantee-cta, .nav-cta, a[href='/apply']", title: "Ready to Book?", description: "Click here to start your booking in under 60 seconds. It's quick, easy, and secure.", icon: "fa-solid fa-calendar-check" },
  ],
  "/service": [
    { target: ".service-hero, .hero", title: "Our Services", description: "Discover our full range of professional cleaning services designed for every space and budget.", icon: "fa-solid fa-broom" },
    { target: ".service-section, .service-card", title: "Service Categories", description: "From home cleaning to post-construction cleanup — tap any card to see details, FAQs, and pricing.", icon: "fa-solid fa-grid-2" },
    { target: ".deal-section, .pricing-card", title: "Transparent Pricing", description: "No hidden fees. Choose the plan that fits your needs and book instantly.", icon: "fa-solid fa-tags" },
  ],
  "/about": [
    { target: ".about-hero, .hero", title: "About LBR Cleaning", description: "Learn about our mission, values, and the team behind Nigeria's most trusted cleaning company.", icon: "fa-solid fa-building" },
    { target: ".intro-section", title: "Who We Are", description: "We're a registered Nigerian company with years of experience in professional cleaning solutions.", icon: "fa-solid fa-circle-info" },
    { target: ".team-grid, .team-section", title: "Meet the Team", description: "Our trained and vetted professionals are the heart of our service quality.", icon: "fa-solid fa-users" },
  ],
  "/contact": [
    { target: ".contact-hero, .hero", title: "Get in Touch", description: "Have a question or ready to book? Reach out via phone, email, or WhatsApp — we respond fast.", icon: "fa-solid fa-phone" },
    { target: ".contact-form", title: "Send Us a Message", description: "Fill out this quick form and our team will get back to you within 24 hours.", icon: "fa-solid fa-envelope" },
    { target: ".info-card", title: "Contact Details", description: "Prefer to call or email? All our contact info is right here.", icon: "fa-solid fa-address-card" },
  ],
  "/blog": [
    { target: ".blog-container", title: "Cleaning Insights", description: "Read expert tips, industry news, and cleaning guides from the LBR team.", icon: "fa-solid fa-newspaper" },
    { target: ".blog-card, .blog-grid", title: "Latest Articles", description: "Tap any article to read the full story and discover helpful cleaning advice.", icon: "fa-solid fa-book-open" },
  ],
  "/information": [
    { target: ".hub-hero", title: "Information Hub", description: "Everything you need to know about our services, pricing, and process in one place.", icon: "fa-solid fa-circle-question" },
    { target: ".hub-tabs", title: "Quick Navigation", description: "Use these tabs to jump between How It Works, Services, Pricing, FAQ, and more.", icon: "fa-solid fa-compass" },
  ],
  "/apply": [
    { target: ".apply-hero, .hero", title: "Book Your Clean", description: "Fill out this simple form and we'll confirm your booking within 24 hours.", icon: "fa-solid fa-calendar-check" },
    { target: ".apply-form, form", title: "Your Details", description: "Tell us about your space, preferred date, and service type. It only takes a minute.", icon: "fa-solid fa-pen" },
  ],
};

export function UserGuideProvider({ children }) {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const location = useLocation();

  const currentSteps = useMemo(() => GUIDE_STEPS[location.pathname] || [], [location.pathname]);
  const currentStep = currentSteps[stepIndex] || null;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === currentSteps.length - 1;

  useEffect(() => {
    if (!currentSteps.length) {
      setActive(false);
      return;
    }
    const completed = localStorage.getItem(STORAGE_KEY);
    if (completed === "true" || dismissed) {
      setActive(false);
      return;
    }
    const timer = setTimeout(() => setActive(true), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname, currentSteps.length, dismissed, resetSignal]);

  const next = useCallback(() => {
    if (isLast) {
      localStorage.setItem(STORAGE_KEY, "true");
      setActive(false);
      return;
    }
    setStepIndex((prev) => prev + 1);
  }, [isLast]);

  const prev = useCallback(() => {
    if (!isFirst) setStepIndex((prev) => prev - 1);
  }, [isFirst]);

  const skip = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setActive(false);
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStepIndex(0);
    setDismissed(false);
    setResetSignal((s) => s + 1);
  }, []);

  const value = useMemo(() => ({
    active,
    stepIndex,
    currentSteps,
    currentStep,
    isFirst,
    isLast,
    next,
    prev,
    skip,
    restart,
    dismissed,
    setDismissed,
  }), [active, stepIndex, currentSteps, currentStep, isFirst, isLast, next, prev, skip, restart, dismissed, resetSignal]);

  return (
    <UserGuideContext.Provider value={value}>
      {children}
    </UserGuideContext.Provider>
  );
}

export function useUserGuide() {
  const ctx = useContext(UserGuideContext);
  if (!ctx) throw new Error("useUserGuide must be used within UserGuideProvider");
  return ctx;
}
