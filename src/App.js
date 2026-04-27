import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"; // 👈 IMPORTANT
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import Invoice from "./pages/Invoice";
import BookingHistory from "./pages/BookingHistory";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
<Route path="/invoice" element={<Invoice />} />
<Route path="/history" element={<BookingHistory />} />
<Route path="/success" element={<Success />} />
<Route path="/failed" element={<Failed />} />
<Route path="/admin" element={<Admin />} />
<Route path="/admin-login" element={<AdminLogin />} />


      </Routes>
    </Router>
  );
}

export default App;