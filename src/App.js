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

      </Routes>
    </Router>
  );
}

export default App;