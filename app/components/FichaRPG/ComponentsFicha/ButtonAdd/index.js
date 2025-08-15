"use client";

import bgTitle from "@/public/assets/bgTitle.png";

export default function ButtonAdd({
  children,
  formData,
  style,
  handlePericiaAdd,
}) {
  const fungo = formData?.customize?.fungo;
  const tema = formData?.customize?.tema;
  const color = formData?.customize?.color;

  const styles = {
    buttonAdd: {
      backgroundColor:
        tema === "fungo"
          ? `hsla(${fungo}deg 100%, 50%, 0.3)`
          : color.color_box_title,
      fontFamily: tema === "fungo" ? "abibas" : "",
      fontSize: "13px",
      borderRadius: "5px",
      color: "var(--title-color)",
      padding: " 0.4em 3em",
      transition: "ease-in-out 0.2s",
      border: "none",
      cursor: "pointer",
      fontWeight: "700",
      textTransform: " uppercase",
      margin: "0.5em 0",
    },

    // botaoAdicionar:hover {
    //   background-color: var(--color-4);
    //   cursor: pointer;
    //   border-radius: 10px;
    // }
  };

  return (
    <div>
      <button
        type="button"
        style={styles.buttonAdd}
        className="botaoAdicionar"
        onClick={handlePericiaAdd}
      >
        <strong>{children}</strong>
      </button>
    </div>
  );
}
