import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// Configurações do Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Desabilitar o parser padrão do Next.js para lidar com form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configuração do multer (upload em memória)
const upload = multer({ storage: multer.memoryStorage() });

// Função para lidar com o upload
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    await runMiddleware(req, res, upload.single("file"));

    try {
      
      const folder = req.query.folder;

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            folder: folder,
            transformation: [{ width: 500, height: 500, crop: "limit" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      return res.status(200).json({
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro no upload", details: error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { public_id, folder } = req.query;

      let targetId = public_id;

      if (!targetId && folder) {
        targetId = `${folder}/${public_id}`;
      }

      if (!public_id) {
        return res.status(400).json({ error: "public_id é obrigatório" });
      }

      const ate = await cloudinary.v2.uploader.destroy(targetId);

      return res.status(200).json({ message: ate.result, imageId: public_id });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao deletar imagem", details: error });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
