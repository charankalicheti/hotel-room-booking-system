import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CustomerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
      }}
    >
      <h1>Customer Dashboard</h1>

      <h3>Welcome, {user?.email}</h3>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default CustomerDashboard;