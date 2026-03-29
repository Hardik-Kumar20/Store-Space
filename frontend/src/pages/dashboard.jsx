import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import ListingsPreview from "../components/dashboard/ListingsPreview";
import QuickActions from "../components/dashboard/QuickActions";
import PremiumLoader from "../components/PremiumLoader";
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
        <PremiumLoader />
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