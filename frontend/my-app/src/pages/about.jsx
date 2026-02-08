import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

const About = () => {
  return (
    <>
      <Navbar />

      {/* HEADER */}
      <header className="about-header">
        <h1>Welcome to StoreSpace</h1>
        <p>Find safe, affordable, and flexible storage solutions near you</p>
      </header>

      {/* SECTION 1 */}
      <section className="about-section">
        <img src="/Images/image.png" alt="Storing items in garage" />
        <div className="content">
          <h2>Store with Ease</h2>
          <p>
            Need extra space for your valuable items? StoreSpace connects you
            with people offering safe and accessible storage spaces in their
            garages, basements, or spare rooms.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="about-section">
        <img src="/Images/image (1).png" alt="Host receiving payment" />
        <div className="content">
          <h2>Earn as a Host</h2>
          <p>
            Have unused space? Turn it into extra income! StoreSpace makes it
            easy for hosts to securely receive payments while helping others
            store their belongings.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="about-section">
        <img src="/Images/image (2).png" alt="Different storage spaces" />
        <div className="content">
          <h2>Choose Your Space</h2>
          <p>
            From garages to basements to spare rooms, StoreSpace offers a
            variety of storage solutions. Pick the one that suits your needs
            best.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="about-section">
        <img src="/Images/image (3).png" alt="Exchanging keys" />
        <div className="content">
          <h2>Peer-to-Peer Interaction</h2>
          <p>
            Meet friendly hosts in your community and securely exchange access.
            Our peer-to-peer model ensures trust and convenience for both sides.
          </p>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="about-section">
        <img src="/Images/image (4).png" alt="Secure storage" />
        <div className="content">
          <h2>Safe & Secure</h2>
          <p>
            With surveillance cameras, fire safety, and strict access control,
            StoreSpace guarantees that your items are stored with top-notch
            security.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
