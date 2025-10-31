import { useEffect } from "react";

function Chatbot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "TzXOBWG38HpRv8NAgqXWp"; // tu ID de Chatbase
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // limpia cuando cambias de página
    };
  }, []);

  return null;
}

export default Chatbot;
