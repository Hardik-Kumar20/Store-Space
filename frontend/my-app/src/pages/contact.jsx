import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/contact/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        setSuccess("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("❌ Failed to send message");
      }
    } catch (err) {
      console.error("Something wrong in contact frontend:", err);
      setError("❌ Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact-container">
        <h1>📬 Contact Us</h1>

        <form onSubmit={handleSubmit}>
          <label>👤 Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name 📝"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>📧 Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com ✉️"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>💬 Message</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message... 🖊️"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Sending..." : "🚀 Send Message"}
          </button>

          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
