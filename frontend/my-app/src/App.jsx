import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact"
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Bookings from "./components/dashboard/bookings";
import ListingPreview from "./components/dashboard/ListingsPreview";
import AdminDashBoard from "./pages/adminboard";
import CreateListingPage from "./pages/CreateListingPage";
import SearchResults from "./pages/serchResults";
import ListingDetails from "./pages/listingDetailsPage";
import BookingReview from "./pages/BookingReview";
import MyBookings from "./pages/MyBookingsBoard";
import BookingSuccess from "./pages/successBooking";
import { AuthProvider } from "./components/AuthContext";
import  ProtectedRoute  from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
          <Route path="/dashboard/create-listing" element={<ProtectedRoute> <CreateListingPage /> </ProtectedRoute>}/>
          <Route path="/search" element={<SearchResults />}/>
          <Route path="/listingDetails/:id" element={<ListingDetails />}/>
          <Route path="/bookingReview/:id" element={<ProtectedRoute> <BookingReview/> </ProtectedRoute>}/>
          <Route path="/my-bookings" element={<ProtectedRoute> <MyBookings /> </ProtectedRoute>}/>
          <Route path="/adminDashBoard" element={<ProtectedRoute> <AdminDashBoard /> </ProtectedRoute>}/>
          <Route path="/booking-success" element={<ProtectedRoute> <BookingSuccess /> </ProtectedRoute>}/>
          <Route path="/dashboard/bookings" element={<ProtectedRoute> <Bookings /> </ProtectedRoute>} />
          <Route path="/dashboard/my-listings" element={<ProtectedRoute> <ListingPreview /> </ProtectedRoute>} />
        </Routes>
    </AuthProvider>
  );
}
export default App;
