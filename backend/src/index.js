const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();

const app = express();

// Middleware para registrar todas as requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// Rota de teste para verificar se o servidor está funcionando
app.get("/api/test", (req, res) => {
  console.log("Rota de teste acessada");
  res.json({ message: "Servidor funcionando corretamente" });
});

// Rota de teste para verificar se o middleware de autenticação está funcionando
app.post("/api/test-auth", (req, res) => {
  console.log("Rota de teste de autenticação acessada");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.json({ message: "Teste de autenticação recebido", headers: req.headers, body: req.body });
});

app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));