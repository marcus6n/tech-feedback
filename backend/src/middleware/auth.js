const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {
  // Para fins de depuração, vamos permitir temporariamente todas as requisições
  // Isso é apenas para identificar se o problema está na autenticação
  console.log("Requisição recebida no middleware de autenticação");
  console.log("Método:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  
  // Simulando um usuário autenticado para teste
  req.user = {
    id: "1af5b4a9-b6fe-44eb-be1a-95b7ba095d8f",
    email: "sender@example.com"
  };
  
  console.log("Usuário simulado definido:", req.user);
  next();
  
  // Código original comentado para depuração
  /*
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
  */
};

module.exports = authMiddleware;
