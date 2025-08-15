"use client";

import React, { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Button, Modal } from "@mui/material";
import LoadingPage from "@/app/components/Loading";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CropperComponent({
  handleModal,
  image,
  setPreview,
  openModal,
}) {
  const cropperRef = useRef(null);
  const { setImageFicha } = useAuth();

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      setPreview(croppedDataUrl);
      setImageFicha(dataURLtoFile(croppedDataUrl, "ficha_cortada.png"));
    }
    handleModal();
  };

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  return (
    <>
      <Modal
        aria-labelledby="custom-modal-title"
        open={openModal}
        onClose={handleModal}
      >
        <Box style={styles.modalContent}>
          <div>
            {image === "" && <LoadingPage />}
            {image !== "" && (
              <Cropper
                src={image}
                style={styles.cropper}
                ref={cropperRef}
                viewMode={1}
                background={false}
                guides={false}
                zoomable={false}
                aspectRatio={340.406 / 616.031}
                ready={() => {
                  const cropper = cropperRef.current?.cropper;
                  cropper.setCropBoxData({
                    width: "340.406px",
                    height: "616.031px",
                  });
                }}
              />
            )}
          </div>
          <div style={styles.buttonContainer}>
            <Button variant="contained" color="error" onClick={handleModal}>
              CANCELAR
            </Button>
            <Button variant="contained" color="secondary" onClick={cropImage}>
              CONCLUIR
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

const styles = {
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: "90%",
    backgroundColor: "var(--color-1)",
    boxShadow: 24,
    padding: "1em",
  },

  cropper: {
    width: "auto",
    height: "400px",
  },

  buttonContainer: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "1rem",
  },

  buttonConfirm: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#00aa55",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  buttonCancel: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
