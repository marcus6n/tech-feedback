const supabase = require("../config/supabase");

const createFeedback = async (
  senderId,
  receiverId,
  message,
  type,
  isAnonymous
) => {
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
};

const getUserFeedbacks = async (userId) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
};

const getAllFeedbacks = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  return data;
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

module.exports = { createFeedback, getUserFeedbacks, getAllFeedbacks, getFeedbackMetrics };
