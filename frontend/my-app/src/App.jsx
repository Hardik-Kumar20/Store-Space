import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact"
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateListingPage from "./pages/CreateListingPage";
import SearchResults from "./pages/serchResults";
import ListingDetails from "./pages/listingDetailsPage";
import BookingReview from "./pages/BookingReview";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/dashboard/create-listing" element={<CreateListingPage />}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path="/listingDetails" element={<ListingDetails />}/>
        <Route path="/bookingReview" element={<BookingReview/>}/>
        <Route path = "/my-bookings" element={<MyBookings />}/>
      </Routes>
  );
}

export default App;
