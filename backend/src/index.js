const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de teste para verificar se o servidor está funcionando
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Rotas de feedback
app.use("/api/feedback", feedbackRoutes);

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Para Vercel
module.exports = app;