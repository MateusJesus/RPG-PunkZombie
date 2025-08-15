"use client";

import bgTitle from "@/public/assets/bgTitle.png";

export default function TitleContent({ children, formData, style }) {
  const tema = formData?.customize?.tema;
  const fungo = formData?.customize?.fungo;
  const color = formData?.customize?.color;

  const styles = {
    wrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: style?.height ? style?.height + "em" : "2.07em",
      width: style?.height ? style?.width + "em" : "100%",
    },

    title: {
      fontFamily: tema === "fungo" ? "abibas" : "",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
      fontWeight: 700,
      color: tema === "padrao" ? `${color.color_fonte}` : "var(--color-text)",
      fontSize: "16px",
      height: style?.height ? style?.height + "em" : "2.07em",
      position: "relative",
      zIndex: 5,
    },

    bgImg: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: style?.height ? style?.height + "em" : "100%",
      backgroundImage: tema === "fungo" ? `url(${bgTitle.src})` : "",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      mixBlendMode: tema === "fungo" ? "screen" : "",
      backgroundColor: `${color.color_box_title}`,
      backgroundSize: style?.height
        ? `auto ${style?.height + 1}em`
        : "auto 3.1em",
      zIndex: 2,
      filter: `hue-rotate(${fungo}deg)`,
    },
  };

  const getMaskStyle = (src) => ({
    position: "absolute",
    inset: 0,
    backgroundColor: `hsl(${fungo}, 100%, 50%)`,
    with: "100%",
    maskRepeat: "no-repeat",
    pointerEvents: "none",
    mixBlendMode: tema === "fungo" ? "overlay" : "",
    opacity: 0.5,
    zIndex: 3,
  });

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>{children}</h2>
      {tema === "fungo" && <div style={getMaskStyle(bgTitle.src)} />}
      <div style={styles.bgImg} />
    </div>
  );
}
