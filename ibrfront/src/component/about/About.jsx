import React, { useState } from "react";
import "./about.css"
import image1 from "../../assets/cleaner5.jpg"
import image2 from "../../assets/cleaner6.jpg"
import spark from "../../assets/spark.png"
import Video from "../video/Video";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import EditableList from "../editable/EditableList";
import EditSection from "../editable/EditSection";
import { useCms } from "../../hooks/useCmsContent";
import { RichText, RICH_HELP } from "../../utils/highlight";
import { Link } from "react-router-dom";

const DEFAULT_DESCRIPTION = `LBR Cleaning Services is a cleaning service company registered in Nigeria. We provide excellent cleaning services.

The services rendered includes: Janitorial/Office Cleaning, Housekeeping/Guest House Managements, Post Construction Cleaning, Floor Maintenance and Restoration Services, Residential Cleaning, Place of worship cleaning, Fumigation & Pest Control and disinfection.

We build value for your business and making it easy for our clients to enjoy life by providing and enabling environment for business to strife and to also show your home as a direct representation of your life.

We combine today's technology with our innovative experience to address all your cleaning requirements. With our proven and well trained professionals, We tackle dirts, dust and grime to keep your Operations smooth and leave your home shining and sparkling.`;

const DEFAULT_POINTS = ["Clean Your Home or Office", "24/7 Emergency Quality Services", "Online Booking System available"];

const About = () => {
  const [seeVideo, setSeeVideo] = useState(false);
  const { isEditMode } = useEditMode();
  const legacyPoints = [useCms("about.feature_1", null), useCms("about.feature_2", null), useCms("about.feature_3", null)];
  const storedPoints = useCms("about.points", null);
  const points = Array.isArray(storedPoints)
    ? storedPoints
    : legacyPoints.some(Boolean)
    ? legacyPoints.map((p, i) => p || DEFAULT_POINTS[i])
    : DEFAULT_POINTS;

  return (
    <div className="about container">
      <div className="about_image">
        <div onClick={() => setSeeVideo(true)} className="videoicon iconactive">
          <i className="fa-solid fa-circle-play"></i>
        </div>
        <EditableImage cmsKey="about.image_1" value={image1} className="image1" alt="" label="Main picture" />
        <EditableImage cmsKey="about.image_2" value={image2} className="image2" alt="" label="Small picture" />
      </div>
      {seeVideo ? <Video setSeeVideo={setSeeVideo} /> : null}
      <div className="about_text">
        <img src={spark} alt="" />
        <EditSection
          cmsKey="about.video_url"
          root="https://www.youtube.com/embed/pUWXTY_lmns"
          label="play-button video"
          icon="fa-video"
          help="Paste a YouTube or Vimeo link. It plays when visitors press the play button on the picture."
          field={{ type: "url", label: "Video link" }}
        />
        <EditableText cmsKey="about.badge" value="ABOUT US" as="h4" label="Small tag" />
        <EditableText cmsKey="about.heading" value="Making Your House Clean For Looks As a New" as="h1" label="Heading" />
        <EditableText cmsKey="about.description" value={DEFAULT_DESCRIPTION} as="div" multiline label="Description" help={RICH_HELP}>
          {(v) => <RichText text={v} as="p" className="p1" />}
        </EditableText>

        <div className="award">
          <i className="fa-solid fa-trophy"></i>
          <EditableText cmsKey="about.award_number" value="12 +" as="h1" label="Award number" />
          <EditableText cmsKey="about.award_label" value="Years Experience" as="p" label="Award text" />
        </div>
        <ul>
          <EditableList cmsKey="about.points" value={points} itemLabel="point" label="Ticked points" fields={[]} itemWrapperTag="li">
            {(point, i) =>
              isEditMode ? (
                <React.Fragment key={i}>
                  <i className="fa-solid fa-circle-check"></i>
                  <p>{point}</p>
                </React.Fragment>
              ) : (
                <li key={i}>
                  <i className="fa-solid fa-circle-check"></i>
                  <p>{point}</p>
                </li>
              )
            }
          </EditableList>
        </ul>
        <Link to="/about" className="btn">
          <p>
            <EditableText cmsKey="about.cta_text" value="about us" label="Button text" /> <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default About;
