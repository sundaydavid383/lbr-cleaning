import {useRef, useEffect} from "react";
import "./articles.css"
import { Link } from "react-router";


const Articles = ({articles}) => {
 
  const observer = useRef(null)
  useEffect(() => {
    observer.current = new IntersectionObserver((entires)=>{entires.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add("active")
        observer.current.unobserve(entry.target);
      }
      else{
        entry.target.classList.remove("active")
      }
    })}, {threshold: 0.3})
    const elements = document.querySelectorAll('.article_card')
    elements.forEach((lit)=>observer.current.observe(lit))
    return () => {
      if(observer.current){
        elements.forEach((lit)=>observer.current.unobserve(lit))
      }
    }
  }, [])
  
  return (
    <div className="articles">
         <div className="title">
          <span className="priamry">Pricing Plan</span>
          <h2 className="bright">Easy Steps to Works</h2>
        </div> 
      <div className="articles_container container">
        {articles.map((article, index)=>(
          <div key={index} className={`article_card art${index}`}>
          <div className="articles_image">
            <img src={article.image} alt="" />
          </div>

            <div className="author">{article.author}</div>
            <span className="date"><div className="day">{article.date.split("-")[2]}</div>
            <div className="month">{article.date.split("-")[1]}</div>
            <div className="year">{article.date.split("-")[0]}</div></span>
      
          <h2>{article.title}</h2>
          { <p className="articelp">{article.gist1.slice(0,199)} ...</p> }
          <Link className="btn">
          <p>
            read blog <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </Link>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;