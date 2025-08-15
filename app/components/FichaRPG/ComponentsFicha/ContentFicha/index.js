"use client";

import bgBox_fun_verm from "@/public/assets/bg_box.png";
import TitleContent from "../TitleContent";

export default function ContentFicha({ title, children, formData }) {
  const imgStyle = getImgStyle(formData);

  return (
    <div style={styled.container}>
      {title && <TitleContent formData={formData}>{title}</TitleContent>}
      <div style={{ padding: "7px", flex: 1, minHeight: 0 }}>{children}</div>
      <div style={imgStyle} />
    </div>
  );
}

const styled = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    backgroundColor: "#000",
    zIndex: 3,
  },
};

const getImgStyle = (formData) => {
  const tema = formData?.customize?.tema;
  const fungo = formData?.customize?.fungo;
  const color = formData?.customize?.color;

  return {
    backgroundImage: tema === "fungo" ? `url(${bgBox_fun_verm.src})` : "",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: tema === "padrao" ? `${color.color_box}` : "transparent",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    pointerEvents: "none",
    filter: tema === "fungo" ? `hue-rotate(${fungo}deg) brightness(1.3) ` : "",
  };
};
