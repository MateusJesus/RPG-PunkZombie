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
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

export default function InfoCampaign({
  idCampanha,
  handleSubmit,
  formData,
  setFormData,
}) {
  const { excluirCampanha } = useAuth();
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("configGeral.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        configGeral: {
          ...prev.configGeral,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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
        <div className={classStyled.container}>
          {/* CONFIG GERAL */}
          <div className="box">
            <h2 className="title_content">Configurações gerais</h2>
            <div className={classStyled.content}>
              <div className={classStyled.content_item}>
                <label htmlFor="nome">Nome da campanha</label>
                <input
                  required
                  maxLength={50}
                  id="nome"
                  name="configGeral.nome"
                  type="text"
                  value={formData.configGeral.nome}
                  onChange={handleChange}
                />
              </div>
              <div className={classStyled.content_item}>
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  className={classStyled.textarea}
                  required
                  rows="4"
                  maxLength={300}
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                    name="configGeral.status"
                    id="status"
                    value={formData.configGeral.status}
                    onChange={handleChange}
                  >
                    <option value="ativa">Ativa</option>
                    <option value="pausada">Pausada</option>
                    <option value="encerrada">Encerrada</option>
                  </select>
                </div>
              </div>
              <div className={classStyled.content_item}>
                <label htmlFor="max_fichas">
                  Número máximo ficha por jogador
                </label>
                <input
                  style={{ width: "40px" }}
                  required
                  type="number"
                  id="max_fichas"
                  name="configGeral.max_fichas"
                  min="1"
                  max="99"
                  value={formData.configGeral.max_fichas}
                  onChange={handleChange}
                />
              </div>
              <div className={classStyled.content_item}>
                <label htmlFor="max_players">Número máximo de jogadores</label>
                <input
                  style={{ width: "40px" }}
                  required
                  type="number"
                  id="max_players"
                  name="configGeral.max_players"
                  min="1"
                  max="99"
                  value={formData.configGeral.max_players}
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

              {/* VISIBILIDADE */}
              <div className={classStyled.content_item}>
                <FormControl component="fieldset">
                  Quem visualizar a campanha?
                  <RadioGroup
                    aria-label="visibilidade"
                    name="configGeral.visibilidade"
                    value={formData.configGeral.visibilidade}
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

              {/* PERMISSÕES */}
              <div className={classStyled.content_item}>
                <FormControl component="fieldset">
                  Quem pode entrar na campanha?
                  <RadioGroup
                    aria-label="permissaoFichas"
                    name="configGeral.permissaoFichas"
                    value={formData.configGeral.permissaoFichas}
                    onChange={handleChange}
                  >
                    <Tooltip title="Jogadores podem entrar na campanha automaticamente.">
                      <FormControlLabel
                        value="auto"
                        control={<Radio />}
                        label="Entrar automaticamente"
                      />
                    </Tooltip>
                    <Tooltip title="Jogadores precisam ser aprovados pelo mestre para entrar na campanha.">
                      <FormControlLabel
                        value="aprovacao"
                        control={<Radio />}
                        label="Somente com aprovação do mestre"
                      />
                    </Tooltip>
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                  Quem pode adicionar conteúdos à campanha?
                  <RadioGroup
                    aria-label="permissaoConteudo"
                    name="configGeral.permissaoConteudo"
                    value={formData.configGeral.permissaoConteudo}
                    onChange={handleChange}
                  >
                    <Tooltip title="Jogadores podem adicionar conteúdos para campanha.">
                      <FormControlLabel
                        value="jogadoresContent"
                        control={<Radio />}
                        label="Jogadores e Mestre"
                      />
                    </Tooltip>
                    <Tooltip title="Apenas o mestre poderá adicionar conteúdo à campanha.">
                      <FormControlLabel
                        value="mestreContent"
                        control={<Radio />}
                        label="Somente o mestre"
                      />
                    </Tooltip>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <div className="box">
              <h2 className="title_content">Imagem da campanha</h2>
              <div className={classStyled.content}>
                <div className={classStyled.imagem_perso + " box"}>
                  <label
                    htmlFor="inputImgPerso"
                    className={classStyled.custom_file_upload}
                  >
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
            <div className="box">
              <h2 className="title_content">História</h2>
              <div className={classStyled.content}>
                <div className={classStyled.content_item}>
                  <textarea
                    id="historia"
                    name="historia"
                    rows="10"
                    style={{ height: "100%" }}
                    value={formData.historia}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="box">
              <h2 className="title_content">Observações</h2>
              <div className={classStyled.content}>
                <div className={classStyled.content_item}>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    rows="10"
                    value={formData.observacoes || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box" style={{ textAlign: "right" }}>
          <button className="botaoAdicionar" type="submit">
            {idCampanha ? "Atualizar Campanha" : "Criar Campanha"}
          </button>
          {idCampanha && (
            <button
              className="botaoExcluir"
              type="button"
              onClick={() => {
                const confirmar = confirm(
                  "Tem certeza que deseja excluir esta campanha?"
                );
                if (confirmar) {
                  excluirCampanha(idCampanha);
                }
              }}
              style={{ marginRight: "1rem", backgroundColor: "#c0392b" }}
            >
              Excluir Campanha
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
