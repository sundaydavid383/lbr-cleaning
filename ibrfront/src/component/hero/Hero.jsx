import React, { useEffect, useState, useRef, useCallback } from "react";
import "./hero.css";
import Feature from "../feature/Feature";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import EditSection from "../editable/EditSection";
import EditZone from "../editable/EditZone";
import { useCms } from "../../hooks/useCmsContent";
import fallbackImage from "../../assets/about-intro.jpg";

// How a hero slide is edited in the side panel.
export const HERO_SLIDE_FIELDS = [
  { key: "questions", type: "text", label: "Small heading (above the title)" },
  { key: "header", type: "text", label: "Title — first line" },
  { key: "headerspan", type: "text", label: "Title — highlighted second line" },
  { key: "ps", type: "list", label: "Paragraphs", itemLabel: "paragraph", itemField: { type: "textarea" } },
  { key: "sectionimage", type: "image", label: "Main picture" },
  { key: "talks", type: "list", label: "Speech bubble messages (they take turns)", itemLabel: "message" },
  { key: "talksReport", type: "text", label: "Phone number in the speech bubble" },
  { key: "sectionimageStar", type: "image", label: "Decoration picture 1 (stars)" },
  { key: "sectionimageSpark", type: "image", label: "Decoration picture 2 (sparkle)" },
];

const NEW_SLIDE = {
  questions: "New slide",
  header: "Your title",
  headerspan: "goes here",
  ps: ["Write a short sentence about this slide."],
  talks: ["Call now"],
  talksReport: "",
  sectionimage: "/assets/cleaner1.png",
  sectionimageStar: "/assets/star.png",
  sectionimageSpark: "/assets/spark.png",
};

/**
 * Props
 *  section / features / backgroundImage / backgroundVideo: content to show
 *  slidesKey:     CMS key holding the slides list (enables editing)
 *  featuresKey:   CMS key holding the feature strip list
 *  backgroundKey: CMS key for the background picture
 *  videoKey:      CMS key for the background video address
 */
const Hero = ({
  section = [],
  features = [],
  backgroundImage,
  backgroundVideo,
  slidesKey,
  featuresKey,
  backgroundKey,
  videoKey,
}) => {
  const { isAuthenticated } = useAuth();
  const { isEditMode } = useEditMode();
  const buttonText = useCms("site.hero_button_text", "Apply Now");
  const [printedTalk, setPrintedTalk] = useState(0);
  const [printedSection, setPrintedSection] = useState(0);

  const bgImage = useCms(backgroundKey || "__none__", backgroundImage) || backgroundImage;
  const bgVideo = useCms(videoKey || "__none__", backgroundVideo);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  // Keep the current slide valid when slides are added/removed.
  useEffect(() => {
    if (printedSection >= section.length && section.length > 0) setPrintedSection(section.length - 1);
  }, [section.length, printedSection]);

  // Rotating talks
  useEffect(() => {
    const interval = setInterval(() => {
      setPrintedTalk((prev) => {
        const currentTalks = section[printedSection]?.talks || [];
        if (currentTalks.length === 0) return 0;
        return (prev + 1) % currentTalks.length;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [section, printedSection]);

  // Auto-advance slides (paused while editing so the slide doesn't change under you)
  useEffect(() => {
    if (section.length <= 1 || isEditMode) return;
    const interval = setInterval(() => {
      setPrintedSection((prev) => (prev + 1) % section.length);
    }, 44000);
    return () => clearInterval(interval);
  }, [section.length, isEditMode]);

  useEffect(() => {
    setPrintedTalk(0);
  }, [printedSection]);

  const handleNext = useCallback(() => {
    setPrintedSection((prev) => (prev + 1) % section.length);
  }, [section.length]);

  const handlePrev = useCallback(() => {
    setPrintedSection((prev) => (prev - 1 + section.length) % section.length);
  }, [section.length]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      deltaX > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const onMouseDown = (e) => {
    if (isEditMode) return;
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };

  const onMouseMove = (e) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  };

  const onMouseUp = (e) => {
    if (!isDragging.current || dragStartX.current === null) {
      dragStartX.current = null;
      return;
    }
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? handleNext() : handlePrev();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  const page = section[printedSection];
  if (!page) {
    return isEditMode && slidesKey ? (
      <EditSection
        cmsKey={slidesKey}
        root={[]}
        label="banner slides"
        field={{ type: "items", fields: HERO_SLIDE_FIELDS, itemLabel: "slide", newItem: NEW_SLIDE }}
      />
    ) : null;
  }

  const idx = printedSection;
  const canEdit = isEditMode && !!slidesKey;
  const text = (field, value, Tag, props = {}) =>
    canEdit ? (
      <EditableText cmsKey={slidesKey} root={section} path={`${idx}.${field}`} value={value} as={Tag} {...props} />
    ) : (
      <Tag className={props.className}>{value}</Tag>
    );

  const ps = Array.isArray(page.ps) ? page.ps : [];

  return (
    <>
      {isEditMode && (slidesKey || backgroundKey || videoKey) && (
          <div className="hero-edit-tools">
            <EditSection
              inline
              label="Banner"
              icon="fa-panorama"
              items={[
                slidesKey && {
                  cmsKey: slidesKey,
                  root: section,
                  path: String(idx),
                  label: `This slide (${idx + 1} of ${section.length})`,
                  fields: HERO_SLIDE_FIELDS,
                },
                slidesKey && {
                  cmsKey: slidesKey,
                  root: section,
                  label: "Add / remove / reorder slides",
                  field: { type: "items", fields: HERO_SLIDE_FIELDS, itemLabel: "slide", newItem: NEW_SLIDE },
                },
                backgroundKey && {
                  cmsKey: backgroundKey,
                  root: backgroundImage,
                  label: "Background picture",
                  field: { type: "image", label: "" },
                  help: "This picture fills the back of the banner. Wide landscape pictures work best.",
                },
                videoKey && {
                  cmsKey: videoKey,
                  root: backgroundVideo || "",
                  label: "Background video",
                  field: { type: "url", label: "Video address (leave empty to use the picture)", placeholder: "https://…/video.mp4" },
                  help: "Paste the web address of an .mp4 video. When set, the video plays instead of the background picture.",
                },
                featuresKey && {
                  cmsKey: featuresKey,
                  root: features,
                  label: "Feature boxes",
                  field: {
                    type: "items",
                    itemLabel: "feature",
                    fields: [
                      { key: "icon", type: "icon", label: "Icon" },
                      { key: "title", type: "text", label: "Title" },
                      { key: "description", type: "textarea", label: "Description" },
                    ],
                  },
                },
              ].filter(Boolean)}
            />
          </div>
        )}
    <div
      className="hero"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {bgVideo ? (
        <div className="background-video-wrapper">
          <video autoPlay loop muted playsInline className="background-video" src={bgVideo} poster={fallbackImage} />
        </div>
      ) : (
        <div className="background-image" style={{ backgroundImage: `url(${bgImage})` }} />
      )}


      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className={`bubble b${i + 1}`}>
          <small></small>
        </div>
      ))}

      {section.length > 1 && (
        <>
          <div onClick={handlePrev} className="moveleft iconactive" aria-label="Previous slide">
            <i className="fa-solid fa-arrow-left-long"></i>
          </div>
          <div onClick={handleNext} className="moveright iconactive" aria-label="Next slide">
            <i className="fa-solid fa-arrow-right-long"></i>
          </div>
        </>
      )}

      <div className="container columnreverseonmobile">
        <div className="text">
          {text("questions", page.questions, "div", { className: "question", label: "Small heading" })}
          {canEdit ? (
            <h1 className="hero-lines-wrap">
              <EditableText cmsKey={slidesKey} root={section} path={`${idx}.header`} value={page.header} as="span" label="Title — first line" />
              <EditableText cmsKey={slidesKey} root={section} path={`${idx}.headerspan`} value={page.headerspan} as="span" label="Title — highlighted line" />
            </h1>
          ) : (
            <h1>
              {page.header}
              <span>{page.headerspan}</span>
            </h1>
          )}
          <div className="ps">
            {ps.map((p, i) =>
              canEdit ? (
                <EditableText key={i} cmsKey={slidesKey} root={section} path={`${idx}.ps.${i}`} value={p} as="p" multiline label="Paragraph" />
              ) : (
                <p key={i}>{p}</p>
              )
            )}
          </div>
          {(!isAuthenticated || isEditMode) && (
            <Link to="/apply" className="btn">
              <p>
                {isEditMode ? (
                  <EditableText cmsKey="site.hero_button_text" value={buttonText} label="Banner button text" help="Shown on the button in every page banner." />
                ) : (
                  buttonText
                )}{" "}
                <i className="fa-solid fa-arrow-right-long"></i>
              </p>
            </Link>
          )}
        </div>

        <div className="image">
          {canEdit ? (
            <EditableImage
              cmsKey={slidesKey}
              root={section}
              path={`${idx}.sectionimage`}
              value={page.sectionimage}
              alt="Cleaning professional"
              className="person"
              label="Slide picture"
            />
          ) : (
            page.sectionimage && <img className="person" src={page.sectionimage} alt="Cleaning professional" />
          )}
          {page.sectionimageStar &&
            (canEdit ? (
              <EditableImage cmsKey={slidesKey} root={section} path={`${idx}.sectionimageStar`} value={page.sectionimageStar} className="stars" alt="" label="Decoration picture (stars)" />
            ) : (
              <img className="stars" src={page.sectionimageStar} alt="" aria-hidden="true" />
            ))}
          {page.sectionimageSpark &&
            (canEdit ? (
              <EditableImage cmsKey={slidesKey} root={section} path={`${idx}.sectionimageSpark`} value={page.sectionimageSpark} className="spark" alt="" label="Decoration picture (sparkle)" />
            ) : (
              <img className="spark" src={page.sectionimageSpark} alt="" aria-hidden="true" />
            ))}
          {(page.talks?.length > 0 || page.talksReport) && (
            <EditZone
              className="speech"
              cmsKey={slidesKey || "__none__"}
              root={section}
              path={String(idx)}
              label="Speech bubble"
              help="The messages take turns in the bubble. The phone number shows underneath."
              fields={HERO_SLIDE_FIELDS.filter((f) => f.key === "talks" || f.key === "talksReport")}
            >
              <div className="circle">
                <p>{page.talks?.[printedTalk] || ""}</p>
                <h3>
                  <i className="fa-solid fa-phone-volume"></i>
                  {page.talksReport}
                </h3>
              </div>
              <div className="cone">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </EditZone>
          )}
        </div>
      </div>

      {section.length > 1 && (
        <div className="hero-dots">
          {section.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === printedSection ? " active" : ""}`}
              onClick={() => setPrintedSection(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <Feature features={features} cmsKey={featuresKey} />
    </div>
    </>
  );
};

export default Hero;
