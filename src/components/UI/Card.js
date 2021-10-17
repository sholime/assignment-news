import { useState } from "react";

import "../../Styles/Card.scss";

function Card(props) {
  const [classname, setClassname] = useState("card");

  const toggleClassName = () => {
    if (classname === "card") {
      setClassname("card active-card");
    } else {
      setClassname("card");
    }
  };
  return (
    <div className={classname} onClick={toggleClassName}>
      <div className="image-container">
        <img
          src={
            props.item.image ? props.item.image : "./image-not-available.png"
          }
          alt=""
        />
      </div>
      <div className="info-container">
        <div className="text-container">
          <div className="details">
            <div>
              <img
                src={
                  props.item.category === "sports"
                    ? "./ball-image.png"
                    : "./cog-image.png"
                }
                alt="category"
              />
              <div className="author">Written by: {props.item.author}</div>
            </div>

            <div className="date">{props.item.published_at.slice(0, 10)}</div>
          </div>
          <div className="title">{props.item.title}</div>
          <div className="description">
            <p>{props.item.description}</p>
          </div>
        </div>
        <div className="button">
          <button>
            <a href={props.item.url} target="_blank" rel="noreferrer">
              Read more
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
