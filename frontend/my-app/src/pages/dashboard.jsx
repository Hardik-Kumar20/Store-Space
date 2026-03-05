import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import ListingsPreview from "../components/dashboard/ListingsPreview";
import QuickActions from "../components/dashboard/QuickActions";
import Navbar from "../components/Navbar";

const Dashboard = () => {

  const Navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {

    const fetchDashboard = async () => {
      try {

        if(!user){
          Navigate("/login",{
            state: { from: "/api/dashboard"}
          });
          return;
        }

        const res = await axios.get("/api/dashboard", {
          withCredentials: true
        });

        setStats(res.data.stats);
        setListings(res.data.listings);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);

  return (
    <>
      <Navbar />

      <DashboardLayout>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <StatsCards stats={stats} />
            <QuickActions />
            <ListingsPreview listings={listings} />
          </>
        )}

      </DashboardLayout>
    </>
  );
};

export default Dashboard;