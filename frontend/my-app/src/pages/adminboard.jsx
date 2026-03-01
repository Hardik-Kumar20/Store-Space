import {useState, useEffect} from 'react'; 
import axios from "axios";
import "../styles/dashboard.css";

const AdminDashBoard = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () =>{
            try {
                const response = await axios.get("/api/admin/pending-listings", {
                    withCredentials: true
                })
                setListings(response.data);
                setLoading(false);
            }catch(err){
                console.error("Error fetching listings", err);
                setLoading(false);
            }
        }
        fetchListings();
    }, []);

        const handleApprove = async (id) => {
            try{
                await axios.patch(`/api/admin/approve-listing/${id}`, {}, {
                    withCredentials: true
                })
                setListings(prev => prev.filter(l => l._id !== id));
            }catch(err){
                console.error("Error approving listing", err);
            }
        }
    


    const handleReject = async (id) => {
        try{
            await axios.patch(`/api/admin/reject-listing/${id}`, {}, {
            withCredentials: true   
        })
        setListings(prev => prev.filter(l => l._id !== id));
    }catch(err){
        console.error("Error rejecting listing", err);
    }
    }

    if(loading) return <div>Loading...</div>;
    return (
        <div className="admin-container">
          <h2>Pending Listings</h2>
    
          {listings.length === 0 && <p>No pending listings 🎉</p>}
    
          {listings.map(listing => (
            <div key={listing._id} className="admin-card">
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <p>Owner: {listing.owner?.userName}</p>
              <p>City: {listing.city}</p>
    
              <div className="admin-buttons">
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(listing._id)}
                >
                  Approve
                </button>
    
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(listing._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      );
}

export default AdminDashBoard;