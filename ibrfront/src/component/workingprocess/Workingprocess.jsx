import React from 'react'
import "./workingprocess.css"
import img1 from "../../assets/cleaner5.png"
import img2 from "../../assets/cleaner6.png"
import { FaGlobeAmericas, FaSpa, FaCalendarCheck } from 'react-icons/fa'
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";

const Workingprocess = () => {
  const { isEditMode } = useEditMode();

  return (
    <div className='workingprocess'>

      <div className="title">
        <>
          <EditableText cmsKey="working_process.tag" type="text" value="working process" as="span" className="priamry" />
          <EditableText cmsKey="working_process.title" type="text" value="How It Works" as="h2" className="bright" />
        </>
      </div>

      <EditableText cmsKey="working_process.subtitle" type="text" value="Competently repurpose go forward benefits without goal-oriented ROI conveniently target e-business opportunities whereas" as="h2" className="semititle" />

      <div className="workingProcess_container container">

        {/* Step 1 – Find Us Online */}
        <div className="workingprocess_card">
          <p className="icon">
            <small><i className="fa-solid fa-earth-americas"></i></small>
            <span>1</span>
            <small className='number'></small>
          </p>
          <EditableText cmsKey="working_process.step1_title" type="text" value="Find Us Online" as="h2" />
          <div className="header_line"></div>
          <EditableText cmsKey="working_process.step1_desc" type="text" value="Visit our website to explore our professional cleaning services and learn how we can keep your space spotless." as="p" />
        </div>

        {/* Step 2 – Book an Appointment */}
        <div className="workingprocess_card">
          <p className="icon">
            <small><i className="fa-solid fa-calendar-check"></i></small>
            <span>2</span>
            <small className='number'></small>
          </p>
          <EditableText cmsKey="working_process.step2_title" type="text" value="Book an Appointment" as="h2" />
          <div className="header_line"></div>
          <EditableText cmsKey="working_process.step2_desc" type="text" value="Schedule a convenient cleaning session with our team at the time that works best for you." as="p" />
        </div>

        {/* Step 3 – We Will Reach Out to You */}
        <div className="workingprocess_card">
          <p className="icon">
            <small><i className="fa-solid fa-phone"></i></small>
            <span>3</span>
            <small className='number'></small>
          </p>
          <EditableText cmsKey="working_process.step3_title" type="text" value="We Will Reach Out to You" as="h2" />
          <div className="header_line"></div>
          <EditableText cmsKey="working_process.step3_desc" type="text" value="Our team will contact you instantly to confirm your appointment and finalize all details." as="p" />
        </div>

      </div>

      <EditableImage cmsKey="working_process.image_right" value={img1} className="right" alt="" label="Right picture" />
      <EditableImage cmsKey="working_process.image_left" value={img2} className="left" alt="" label="Left picture" />
    </div>
  )
}

export default Workingprocess
