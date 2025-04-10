"use client";

import { Box, Typography } from "@mui/material";

export default function CampaignHistory({ formData }) {
  return (
    <>
      {formData.historia !== "" && formData.historia !== "" ? (
        <Box sx={{ textAlign: "center" }}>
          {formData.historia !== "" && (
            <>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color="text.secondary"
              >
                História
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formData.historia}
              </Typography>
            </>
          )}
          {formData.observacoes !== "" && (
            <>
              <hr className="separation" />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color="text.secondary"
              >
                Observações
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formData.observacoes}
              </Typography>
            </>
          )}
          <hr className="separation" />
        </Box>
      ) : (
        <>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            textTransform={"uppercase"}
            color="text.secondary"
          >
            Nada escrito no momento...
          </Typography>
        </>
      )}
    </>
  );
}
