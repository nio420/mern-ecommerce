import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import PlaceOrder from "./Pages/PlaceOrder";
import Order from "./pages/Order";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import SslVerify from "./Pages/SslVerify";
import { ToastContainer } from "react-toastify";
import StripeVerify from "./Pages/StripeVerify";
import PageWrapper from "./Components/PageWrapper";
import ScrollToTop from "./Components/ScrollToTop";
import ScrollReveal from "./Components/ScrollReveal";
import Profile from "./Pages/Profile";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/product/:productId" element={<PageWrapper><Product /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/placeorder" element={<PageWrapper><PlaceOrder /></PageWrapper>} />
        <Route path="/order" element={<PageWrapper><Order /></PageWrapper>} />
        <Route path="/verify" element={<PageWrapper><StripeVerify /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        {/* SSLCommerz specific routes */}
        <Route path="/payment-success" element={<PageWrapper><SslVerify /></PageWrapper>} />
        <Route path="/payment-fail" element={<PageWrapper><SslVerify /></PageWrapper>} />
        <Route path="/payment-cancel" element={<PageWrapper><SslVerify /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: "auto", minWidth: "200px" }}
        />
        <ScrollToTop />
        <Navbar />
        <SearchBar />
        <AnimatedRoutes />
        <ScrollReveal> <Footer /> </ScrollReveal>
      </Router>
    </div>
  );
};

export default App;