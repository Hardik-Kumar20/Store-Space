const booking = require("../Schemas/bookingSchema");

const isDateRangeAvailable = async (listingId, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if(start > end){
    throw new Error("Invalid date range");
  }

  const conflict = await booking.findOne({
    listing: listingId,
    status: "active",
    startDate: { $lt: end }, 
    endDate: { $gt: start }
  });
  return !conflict;
}


const unavailableListingIds = async (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if( start > end){
    throw new Error("Invalid date range");
  }

  const bookings = await booking.find({
    status: "active",
    startDate: { $lt: end }, 
    endDate: { $gt: start }
  }).distinct("listing");
};

module.exports = {
  isDateRangeAvailable,
  unavailableListingIds
}