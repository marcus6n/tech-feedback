const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    console.log("Token recebido:", token.substring(0, 20) + "...");
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error("Erro de autenticação:", error.message);
      throw error;
    }
    
    if (!data.user) {
      console.error("Usuário não encontrado");
      throw new Error("User not found");
    }
    
    console.log("Usuário autenticado:", data.user.id);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
