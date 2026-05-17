import { useEffect, useRef } from "react";

import Typed from "typed.js";

function TypingText({ texts }) {

  const typedRef = useRef(null);

  useEffect(() => {

    const typed = new Typed(typedRef.current, {

      strings: texts || [

        "AI Developer",

        "Full Stack Developer",

        "Flask Backend Builder",

        "React Frontend Developer"

      ],

      typeSpeed: 60,

      backSpeed: 40,

      backDelay: 1500,

      loop: true

    });

    return () => {

      typed.destroy();

    };

  }, [texts]);

  return (

    <span
      ref={typedRef}
      style={{ color: "#00d4ff" }}
    />

  );
}

export default TypingText;