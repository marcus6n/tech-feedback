import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextDef";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/feedback/metrics",
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      );
      setMetrics(data);
    };
    if (user) fetchMetrics();
  }, [user]);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <p>Total Feedbacks: {metrics.total}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p>Positive: {metrics.positive}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p>Constructive: {metrics.constructive}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p>Anonymous: {metrics.anonymous}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
