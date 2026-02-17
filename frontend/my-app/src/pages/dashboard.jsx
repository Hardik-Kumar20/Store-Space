import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import QuickActions from "../components/dashboard/QuickActions";
import ListingsPreview from "../components/dashboard/ListingsPreview";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          credentials: "include"
        });
        if(res.status === 401){
          window.location.href = "/login";
          return;
        }

        if(!res.ok){
          throw new Error("Failed to fetch dashboard");
        }

        const data = await res.json();

        setStats(data.stats);
        setListings(data.listings);
      } catch (error) {
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
  