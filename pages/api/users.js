import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const fichas = await prisma.fichaRPG.findMany(); // Supondo que a tabela se chame 'fichaRPG'
      res.status(200).json(fichas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as fichas" });
    }
  } else if (req.method === "POST") {
    try {
      // Extrair os dados da ficha do corpo da requisição
      const {
        nomeJogador,
        nomePersonagem,
        variante,
        origem,
        classe,
        niv,
        pdv,
        pdvTotal,
        sta,
        staTotal,
        pdi,
        pdiTotal,
        defesa,
        aparencia,
        personalidade,
        resistPer,
        imagem,
        forca,
        inteligencia,
        agilidade,
        vigor,
        carisma,
        pericias,
        cargaTotal,
        proficiencias,
        equipamentos
      } = req.body;

      // Criar a ficha no banco de dados
      const newFicha = await prisma.fichaRPG.create({
        data: {
          nomeJogador,
          nomePersonagem,
          variante,
          origem,
          classe,
          niv,
          pdv,
          pdvTotal,
          sta,
          staTotal,
          pdi,
          pdiTotal,
          defesa,
          aparencia,
          personalidade,
          resistPer,
          imagem,
          forca: parseInt(forca), // Convertendo para número
          inteligencia: parseInt(inteligencia), // Convertendo para número
          agilidade: parseInt(agilidade), // Convertendo para número
          vigor: parseInt(vigor), // Convertendo para número
          carisma: parseInt(carisma), // Convertendo para número
          pericias: { // Se você estiver armazenando as perícias no banco
            create: pericias.map(pericia => ({
              soma: pericia.soma,
              nomePericia: pericia.nomePericia,
              atributoPer: pericia.atributoPer,
              outros: pericia.outros
            }))
          },
          cargaTotal,
          proficiencias,
          equipamentos
        },
      });

      res.status(201).json(newFicha);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar a ficha" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
