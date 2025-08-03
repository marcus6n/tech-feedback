const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verificar o token usando a função correta do Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
    
    if (!data.user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
