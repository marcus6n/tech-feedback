const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    if (!user) throw new Error("User not found");
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
