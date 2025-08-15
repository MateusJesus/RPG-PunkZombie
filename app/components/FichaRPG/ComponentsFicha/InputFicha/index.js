"use client";

import bgInput from "@/public/assets/bg_input.png";
import bgTextarea from "@/public/assets/bg_textarea.png";

export default function InputFicha({
  label,
  name,
  maxLength,
  type,
  value,
  disabled,
  onChange,
  formData,
}) {
  const tema = formData?.customize?.tema;
  const fungo = formData?.customize?.fungo;
  const color = formData?.customize?.color;

  const getMaskStyle = (src) => ({
    position: "absolute",
    inset: 0,
    backgroundColor: `hsl(${fungo}, 100%, 50%)`,
    WebkitMaskImage: `url(${src})`,
    WebkitMaskSize: "cover",
    WebkitMaskRepeat: "no-repeat",
    maskImage: `url(${src})`,
    maskSize: "100% 100%",
    with: "100%",
    maskRepeat: "no-repeat",
    opacity: 0.35,
    pointerEvents: "none",
    zIndex: 1,
  });

  const styled = {
    container: {
      width: "100%",
    },

    inputWrapper: {
      position: "relative",
      width: "100%",
      display: "flex",
      flex: "1",
      alignItems: "center",
      justifyContent: "center",
    },

    custom_input: {
      backgroundColor:
        tema === "padrao" ? `${color.color_input}` : "transparent",
      fontFamily: tema === "fungo" ? "abibas" : "",
      color: "var(--color-text)",
      zIndex: 2,
      position: "relative",
    },

    custom_textarea: {
      zIndex: 2,
      position: "absolute",
      backgroundColor:
        tema === "padrao" ? `${color.color_input}` : "transparent",
      top: "0",
      color: "var(--color-text)",
      left: "0",
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
    },
  };

  return (
    <div style={styled.container}>
      {label && (
        <label
          style={{
            color:
              tema === "padrao" ? `${color.color_fonte}` : "var(--color-text)",
          }}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <div>
          <textarea
            disabled={disabled}
            style={styled.custom_textarea}
            id={name}
            name={name}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
          />
          {tema === "fungo" && <div style={getMaskStyle(bgTextarea.src)} />}
        </div>
      ) : (
        <div style={styled.inputWrapper}>
          <input
            style={styled.custom_input}
            disabled={disabled}
            type={type}
            id={name}
            name={name}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
          />
          {tema === "fungo" && <div style={getMaskStyle(bgTextarea.src)} />}
        </div>
      )}
    </div>
  );
}
