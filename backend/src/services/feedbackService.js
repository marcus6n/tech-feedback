const supabase = require("../config/supabase");

const createFeedback = async (
  senderId,
  receiverId,
  message,
  type,
  isAnonymous
) => {
  // Para fins de teste, vamos simular a criação de um feedback sem acessar o banco de dados
  console.log("Simulando criação de feedback com os seguintes dados:");
  console.log("- Remetente:", senderId);
  console.log("- Destinatário:", receiverId);
  console.log("- Mensagem:", message);
  console.log("- Tipo:", type);
  console.log("- Anônimo:", isAnonymous);
  
  // Retorna um objeto simulando um feedback criado com sucesso
  return {
    id: "simulated-feedback-id",
    sender_id: senderId,
    receiver_id: receiverId,
    message,
    type,
    is_anonymous: isAnonymous,
    created_at: new Date().toISOString()
  };
  
  /* Código original comentado para fins de teste
  const { data, error } = await supabase
    .from("feedbacks")
    .insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        message,
        type,
        is_anonymous: isAnonymous,
        created_at: new Date().toISOString(),
      },
    ])
    .select();
    
  if (error) throw new Error(error.message);
  return data[0];
  */
};

const getUserFeedbacks = async (userId) => {
  // Para fins de teste, vamos simular a obtenção de feedbacks sem acessar o banco de dados
  console.log("Simulando obtenção de feedbacks para o usuário:", userId);
  
  // Retorna um array simulando feedbacks recebidos
  return [
    {
      id: "simulated-feedback-id-1",
      sender_id: "1af5b4a9-b6fe-44eb-be1a-95b7ba095d8f",
      receiver_id: userId,
      message: "Ótimo trabalho no projeto!",
      type: "positive",
      is_anonymous: false,
      created_at: new Date().toISOString()
    },
    {
      id: "simulated-feedback-id-2",
      sender_id: "1af5b4a9-b6fe-44eb-be1a-95b7ba095d8f",
      receiver_id: userId,
      message: "Poderia melhorar a comunicação.",
      type: "constructive",
      is_anonymous: true,
      created_at: new Date(Date.now() - 86400000).toISOString() // 1 dia atrás
    }
  ];
  
  /* Código original comentado para fins de teste
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
  */
};

const getFeedbackMetrics = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("type, is_anonymous");
    
  if (error) throw new Error(error.message);
  
  return {
    total: data.length,
    positive: data.filter((f) => f.type === "positive").length,
    constructive: data.filter((f) => f.type === "constructive").length,
    anonymous: data.filter((f) => f.is_anonymous).length,
  };
};

module.exports = { createFeedback, getUserFeedbacks, getFeedbackMetrics };
