import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextDef";
import axios from "axios";

const SendFeedback = () => {
  const { user } = useContext(AuthContext);
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("positive");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/feedback",
      { receiverId, message, type, isAnonymous },
      { headers: { Authorization: `Bearer ${user.access_token}` } }
    );
    alert("Feedback sent!");
    setMessage("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Send Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Receiver ID"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Feedback message"
          className="w-full p-2 border rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="positive">Positive</option>
          <option value="constructive">Constructive</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Anonymous
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendFeedback;
