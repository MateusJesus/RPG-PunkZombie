"use client";

import { useState, useRef } from "react";
import ImgCharStyled from "./imageChar.module.css";
import { FaFileImage } from "react-icons/fa";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditorImage from "../EditorImage";

export default function ImageCharacter({ formData, setFormData }) {
  const [openEditor, setOpenEditor] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageEditar, setimageEditar] = useState(formData.imagem || "");
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimageEditar(reader.result);
      };
      reader.readAsDataURL(file);
      setOpenEditor(true);
    }
  };

  const handleEdit = () => {
    setimageEditar(preview);
    setOpenEditor(true);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setPreview("");
    setFormData((prev) => ({
      ...prev,
      imagem: "delete", 
    }));

    setAnchorEl(null);
  };

  const handleChangeImage = () => {
    fileInputRef.current.click();
    setAnchorEl(null);
  };

  return (
    <div className={ImgCharStyled.imagem_perso}>
      <EditorImage
        open={openEditor}
        image={imageEditar}
        setPreview={setPreview}
        openModal={openEditor}
        handleModal={() => setOpenEditor(false)}
      />

      {/* <CircularProgress
        color="inherit"
        style={{
          position: "absolute",
          top: '50%',
          left: '50%',
        }}
      /> */}

      {(formData.imagem && formData.imagem !== "delete") || preview ? (
        <>
          <img
            src={preview ? preview : formData.imagem}
            alt="Imagem do personagem"
          />
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <MoreVert htmlColor="#fff" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleEdit}>Editar</MenuItem>
            <MenuItem onClick={handleChangeImage}>Alterar</MenuItem>
            <MenuItem onClick={handleDelete}>Excluir</MenuItem>
          </Menu>
        </>
      ) : (
        <label
          htmlFor="inputImgPerso"
          className={ImgCharStyled.custom_file_upload}
        >
          <span>
            <FaFileImage className={ImgCharStyled.icon} />
            <br />
            Clique ou arraste e
            <br />
            solte sua imagem aqui.
          </span>
        </label>
      )}

      <input
        id="inputImgPerso"
        type="file"
        name="inputImgPerso"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}
