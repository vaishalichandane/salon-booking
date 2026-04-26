import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h2 style={styles.logo}>Glow Salon</h2>

      {/* Links */}
      <div>
        <Link to="/" style={styles.link}>Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>Hi, {username}</span>

            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#e91e63",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "#fff",
    margin: "0 10px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  user: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  logout: {
    background: "#fff",
    color: "#e91e63",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;