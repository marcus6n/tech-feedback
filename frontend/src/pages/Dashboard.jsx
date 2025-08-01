import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextDef";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/feedback/my-feedbacks",
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      );
      setFeedbacks(data);
    };
    if (user) fetchFeedbacks();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">My Feedbacks</h2>
      <div className="space-y-4">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="p-4 bg-gray-100 rounded">
            <p>{fb.message}</p>
            <p className="text-sm text-gray-500">
              Type: {fb.type} | Anonymous: {fb.is_anonymous ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
