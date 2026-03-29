import Booking from "../Schemas/bookingSchema.js";

// Check if a listing is available
const isDateRangeAvailable = async (listingId, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new Error("Invalid date range");
  }

  const conflict = await Booking.findOne({
    listing: listingId,
    status: "active",
    startDate: { $lt: end },
    endDate: { $gt: start },
  });

  return !conflict;
};

// Get all unavailable listing IDs
const unavailableListingIds = async (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new Error("Invalid date range");
  }

  const bookings = await Booking.find({
    status: "active",
    startDate: { $lt: end },
    endDate: { $gt: start },
  }).distinct("listing");

  return bookings; // 🔥 IMPORTANT FIX
};

export { isDateRangeAvailable, unavailableListingIds };