import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import QuickActions from "../components/dashboard/QuickActions";
import ListingsPreview from "../components/dashboard/ListingsPreview";
import Navbar from "../components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/listings/my", {
          withCredentials: true
        });
  
        setListings(res.data);
  
        // Example stats calculation
        setStats({
          totalListings: res.data.length,
          activeBookings: 0,
          totalEarnings: 0
        });
  
      } catch (error) {
        if (error.response?.status === 401) {
          window.location.href = "/login";
          return;
        }
  
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);

  return (
    <>
    <Navbar />
    <DashboardLayout>
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <StatsCards stats={stats || {}} />
          <QuickActions />
          <ListingsPreview listings={listings} />
        </>
      )}
    </DashboardLayout>
    </>
  );
};

export default Dashboard;




// Your backend /api/dashboard should return:
// {
//     "stats": {
//       "totalListings": 4,
//       "activeBookings": 8,
//       "totalEarnings": 2450
//     },
//     "listings": [
//       {
//         "_id": "123",
//         "title": "Garage Space",
//         "pricePerDay": 25
//       }
//     ]
//   }
  