import "./Hero.css";

import { useEffect, useState } from "react";

import { getHomeContent } from "../../services/api";

import TypingText from "../TypingText/TypingText";

function Hero() {

  const [data, setData] = useState(null);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const response = await getHomeContent();

      setData(response);

      console.log(response);

    } catch (error) {

      console.log(error);

    }

  };

  if (!data) {

    return <h1>Loading...</h1>;

  }

  return (

    <section className="hero">

      {/* LEFT SIDE */}

      <div className="hero-left">

        <p className="hero-subtitle">
          {data.welcome_note}
        </p>

        <h1>
          Hi, I'm
          <span>
            {" "}{data.greeting_name}
          </span>
        </h1>

          <h2>

        <TypingText
          texts={data.typing_titles}
        />

    </h2>

        <p className="hero-description">
          {data.description}
        </p>

        <div className="hero-buttons">

          <a href={data.primary_button_link}>

            <button>
              {data.primary_button_text}
            </button>

          </a>

          <a href={data.secondary_button_link}>

            <button className="secondary-btn">
              {data.secondary_button_text}
            </button>

          </a>

        </div>

      </div>

      {/* RIGHT SIDE */}

      {/* RIGHT SIDE */}

<div className="hero-right">

  {

    data.hero_image ? (

      <img
        src={data.hero_image}
        alt="Hero"
        className="hero-image"
      />

    ) : (

      <div className="hero-card">

        <h3>Tech Stack</h3>

        <ul>

          {data.typing_titles.map((title, index) => (

            <li key={index}>
              {title}
            </li>

          ))}

        </ul>

      </div>

    )

  }

</div>
    </section>

  );
}

export default Hero;