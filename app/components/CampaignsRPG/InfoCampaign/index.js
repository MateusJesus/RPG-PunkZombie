"use client";

import React from "react";
import classStyled from "./campaign.module.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { FaFileImage } from "react-icons/fa";

export default function InfoCampaign({ handleSubmit, formData, setFormData, handleChange }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagem: file,
      }));
    }
  };

  return (
    <form className={classStyled.campaign} onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* INFORMAÇÕES GERAIS */}
        <div className={classStyled.container}>
          <div className="box">
            <h2 className="title_content">Informações gerais</h2>
            <div className={classStyled.content}>
              <div className={classStyled.content_item}>
                <label htmlFor="nome">Nome da campanha</label>
                <input
                  required
                  maxLength={50}
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className={classStyled.content_item}>
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  className={classStyled.textarea}
                  required
                  maxLength={300}
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className={classStyled.content_item}>
                  <label htmlFor="start_date">Data de Início</label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.content_item}>
                  <label htmlFor="status">Status da Campanha</label>
                  <select
                    className="form_select"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="ativa">Ativa</option>
                    <option value="pausada">Pausada</option>
                    <option value="encerrada">Encerrada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGEM */}
          <div className="box">
            <h2 className="title_content">Imagem da campanha</h2>
            <div className={classStyled.content}>
              <div className={classStyled.imagem_perso + " box"}>
                <label htmlFor="inputImgPerso" className={classStyled.custom_file_upload}>
                  <span>
                    <FaFileImage className={classStyled.icon} />
                    <br />
                    Clique ou arraste e
                    <br />
                    solte sua imagem aqui.
                  </span>
                  <input
                    id="inputImgPerso"
                    type="file"
                    name="imagem"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* CONFIGURAÇÕES DE ACESSO */}
          <div className="box">
            <h2 className="title_content">Configurações de Acesso</h2>
            <div className={classStyled.content}>
              <div className={classStyled.content_item}>
                <label htmlFor="max_fichas">Número máximo ficha por jogador</label>
                <input
                  required
                  type="number"
                  id="max_fichas"
                  name="max_fichas"
                  min="1"
                  max="99"
                  value={formData.max_fichas || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={classStyled.content_item}>
                <label htmlFor="senha_acesso">Senha de acesso (opcional)</label>
                <input
                  type="text"
                  id="senha_acesso"
                  name="senha_acesso"
                  value={formData.senha_acesso || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={classStyled.content_item}>
                <FormControl component="fieldset">
                  Quem visualizar a campanha?
                  <RadioGroup
                    aria-label="visibilidade"
                    name="visibilidade"
                    value={formData.visibilidade}
                    onChange={handleChange}
                  >
                    <Tooltip title="Todos podem ver sua campanha.">
                      <FormControlLabel
                        value="publico"
                        control={<Radio />}
                        label="Todos (pública)"
                      />
                    </Tooltip>
                    <Tooltip title="Apenas você terá acesso à campanha.">
                      <FormControlLabel
                        value="privada"
                        control={<Radio />}
                        label="Privada"
                      />
                    </Tooltip>
                    <Tooltip title="Apenas quem tiver o link terá acesso.">
                      <FormControlLabel
                        value="link"
                        control={<Radio />}
                        label="Privada com link"
                      />
                    </Tooltip>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={classStyled.content_item}>
                <FormControl component="fieldset">
                  Quem pode adicionar fichas à campanha?
                  <RadioGroup
                    aria-label="permissaoFichas"
                    name="permissaoFichas"
                    value={formData.permissaoFichas}
                    onChange={handleChange}
                  >
                    <Tooltip title="Jogadores podem adicionar fichas automaticamente.">
                      <FormControlLabel
                        value="auto"
                        control={<Radio />}
                        label="Adicionar fichas automaticamente"
                      />
                    </Tooltip>
                    <Tooltip title="Fichas precisam ser aprovadas pelo mestre.">
                      <FormControlLabel
                        value="aprovacao"
                        control={<Radio />}
                        label="Somente com aprovação do mestre"
                      />
                    </Tooltip>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>

        {/* HISTÓRIA */}
        <div className="box">
          <h2 className="title_content">História</h2>
          <div className={classStyled.content}>
            <div className={classStyled.content_item}>
              <textarea
                id="historia"
                name="historia"
                rows="4"
                value={formData.historia}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* OBSERVAÇÕES */}
        <div className="box">
          <h2 className="title_content">Observações</h2>
          <div className={classStyled.content}>
            <div className={classStyled.content_item}>
              <textarea
                id="observacoes"
                name="observacoes"
                rows="4"
                value={formData.observacoes || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="box" style={{ textAlign: "right" }}>
          <button className="btn outline" type="button">Cancelar</button>
          <button className="btn primary" type="submit">Criar Campanha</button>
        </div>
      </div>
    </form>
  );
}
