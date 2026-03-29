import { useNavigate } from "react-router-dom";

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <section className="quick-actions">
        <button
          className="primary-btn"
          onClick={() => navigate("/dashboard/create-listing")}
        >
          + Add New Space
        </button>
      </section> 
    );
};

export default QuickActions;