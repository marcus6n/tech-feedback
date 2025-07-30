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
      },
    ]);
  if (error) throw new Error(error.message);
  return data;
};

const getUserFeedbacks = async (userId) => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("receiver_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

const getFeedbackMetrics = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("type, is_anonymous", { count: "exact" });
  if (error) throw new Error(error.message);
  return {
    total: data.length,
    positive: data.filter((f) => f.type === "positive").length,
    constructive: data.filter((f) => f.type === "constructive").length,
    anonymous: data.filter((f) => f.is_anonymous).length,
  };
};

module.exports = { createFeedback, getUserFeedbacks, getFeedbackMetrics };
