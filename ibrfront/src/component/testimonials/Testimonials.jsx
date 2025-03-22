import React, { useState } from "react";
import "./testimonials.css";
import { Link } from "react-router";
import testimonial1 from "../../assets/user1.jpg";
import testimonial3 from "../../assets/user2.jpg";
import testimonial4 from "../../assets/user3.jpg";
import testimonial2 from "../../assets/user4.jpg";
import testimonial5 from "../../assets/user5.jpg";
import testimonial6 from "../../assets/user6.jpg";

const Testimonial = () => {
  const [move, setMove] = useState(0);
  const testimonials = [
    {
      id: 1,
      facebookLink: "https://www.facebook.com/adegoke.folarin.37/",
      instagramLink: "https://www.instagram.com/adegokefolarin/",
      name: "Folarin Adegoke",
      image: testimonial1,
      ratings: 5,
      testimony:
        "I am glad to be here for the retreat. Ever since I started attending, I've experienc,ed significant changes in my life. At 14, I aspired to achieve the top position in my class with a perfect sco  re. During the retreat, I poured out my heart to God about this desire, and He answered my prayer. I am grateful to God.",
    },
    {
      id: 2,
      facebookLink: "https://www.facebook.com/bruno.emeka.79/",
      instagramLink: "https://www.instagram.com/brunoemeka/",
      name: "Emeka Bruno",
      image: testimonial2,
      ratings: 4,
      testimony:
        "Participating in the retreat has been a transformative experience. Starting at 14, I, sought academic excellence, aiming for the top position with a perfect score. Through heartfelt prayers durin  g the retreat, God granted my request. I am deeply thankful.",
    },
    {
      id: 3,
      facebookLink: "https://www.facebook.com/gracious.clara/",
      instagramLink: "https://www.instagram.com/graciousclara/",
      name: "Gracious Clara",
      image: testimonial3,
      ratings: 5,
      testimony:
        "Attending the retreat has brought profound changes to my life. At 14, I desired to b,e the top student with a 100% mark. During the retreat, I earnestly prayed to God, and He answered my prayers.   I am immensely grateful.",
    },
    {
      id: 4,
      facebookLink: "https://www.facebook.com/alex.rashford/",
      instagramLink: "https://www.instagram.com/alexrashford/",
      name: "Alex Rashford",
      image: testimonial4,
      ratings: 4,
      testimony:
        "The retreat has been a blessing. Since I began attending at 14, I've seen remarkable, improvements in my life. I prayed fervently for academic success, and God responded graciously. I am thankful   beyond words.",
    },
    {
      id: 5,
      facebookLink: "https://www.facebook.com/alakantara.john/",
      instagramLink: "https://www.instagram.com/alakantarajohn/",
      name: "Alakantara John",
      image: testimonial5,
      ratings: 4,
      testimony:
        "Being part of the retreat has been life-changing. At 14, I aimed for academic excell,ence. Through sincere prayers during the retreat, God granted my desires. I am profoundly grateful.",
    },
    {
      id: 6,
      facebookLink: "https://www.facebook.com/hernadez.jose/",
      instagramLink: "https://www.instagram.com/hernadezjose/",
      name: "Hernandez Jose",
      image: testimonial6,
      ratings: 5,
      testimony:
        "The retreat has positively impacted my life. Starting at 14, I aspired for top acade,mic honors. Through earnest prayers during the retreat, God fulfilled my wishes. I am deeply appreciative.",
    },
  ];

   const PrintStar = (ratings)=>{
        let stars = []
         for (let i = 1; i <= 5; i++) {
          if(i <= ratings){
             stars.push("fa-solid fa-star")
          }
          else{
            stars.push("fa-regular fa-star")
          }
        }
        return stars
   }
  return (
    <div className="testimonailImage">
      <div className="Testimonial">
        <div className="title">
          <span>our services</span>
          <h2>Professional Cleaning Services</h2>
        </div>
        {move > -3816 ? (<i onClick={() => { setMove((prev) => prev + -780); console.log(move); }} className="moveright fa-solid fa-arrow-right" ></i> ) : null}
        {move <= -780 ? (<i onClick={() => { setMove((prev) => prev + 780); console.log(move);}} className="moveleft fa-solid fa-arrow-left"  ></i> ) : null}
        <div className="testiment">
          <div
            className="testimentcarrier"
            style={{ transform: `translateX(${move}px)` }}
          >
            {testimonials.map((testifier, index) => (
              <div key={index} className="testimonialCard">
                <div className="testimoniallCardUpper">
                <div className="image">
                  <img src={testifier.image} alt="" />
                </div>
                <div className="imagetext">
                    <h2>{testifier.name}</h2>
                    <div className="stars">
                    { PrintStar(testifier.ratings).map((star,strindex)=>(<i key={strindex} className={`${star}`}></i>))}
                    </div>
                  </div>
                </div>
               

                <p>{testifier.testimony}</p>
                <div className="link">
                  <Link
                    className="iconactive"
                    target="_blank"
                    to={testifier.instagramLink}
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link
                    className="iconactive"
                    target="_blank"
                    to={testifier.facebookLink}
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
