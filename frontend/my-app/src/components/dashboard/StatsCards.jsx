const StatsCards = ({ stats }) => {
    return (
        <section className="stats-section">
        <div className="stat-card">
            <h4>Total Listings</h4>
            <p>{stats?.totalListings ?? 0}</p>
        </div>

        <div className="stat-card">
            <h4>Active Bookings</h4>
            <p>{stats?.activeBookings ?? 0}</p>
        </div>

        <div className="stat-card">
            <h4>Total Earnings</h4>
            <p>${stats?.totalEarnings ?? 0}</p>
        </div>
        </section>
    );
};

export default StatsCards;