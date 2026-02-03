import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await axios.get(`${url}/api/dashboard/stats`);
    if (res.data.success) setStats(res.data.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <div className="add">Loading...</div>;

  return (
    <div className="dashboard add">
      <h3>Dashboard</h3>

      <div className="dashboard-grid">
        <div className="card">Total Items Sold <span>{stats.totalItemsSold}</span></div>
        <div className="card">Total Revenue <span>{stats.totalRevenue} TK</span></div>
        <div className="card delivered">Delivered <span>{stats.deliveredCount}</span></div>
        <div className="card cancelled">Cancelled <span>{stats.cancelledCount}</span></div>
        <div className="card pending">Pending <span>{stats.pendingCount}</span></div>
      </div>
    </div>
  );
};

export default Dashboard;

