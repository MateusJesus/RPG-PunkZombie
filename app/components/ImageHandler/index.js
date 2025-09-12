"use client";

import { useRef, useState } from "react";
import ImgCharStyled from "./imageChar.module.css";
import { FaFileImage } from "react-icons/fa";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import EditorImage from "./EditorImage";

export default function ImageHandler({ dados, setDados, aspectRatio }) {
  const [openEditor, setOpenEditor] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageEditar, setimageEditar] = useState(dados.imagem || "");
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
    setDados((prev) => ({
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
        aspectRatio={aspectRatio}
      />

      {/* <CircularProgress
        color="inherit"
        style={{
          position: "absolute",
          top: '50%',
          left: '50%',
        }}
      /> */}

      {(dados.imagem && dados.imagem !== "delete") || preview ? (
        <>
          <img
            src={preview ? preview : dados.imagem}
            alt="Imagem do personagem"
          />
          <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
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
          </Box>
        </>
      ) : (
        <label
          htmlFor="inputImgPerso"
          className={ImgCharStyled.custom_file_upload}
          style={{
            height: aspectRatio.y+"px",
          }}
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
