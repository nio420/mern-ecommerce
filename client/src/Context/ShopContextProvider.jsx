import { ShopContext } from "./ShopContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Context Provider component
const ShopContextProvider = ({ children }) => {
  // Backend base URL from environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ===================== PRODUCT STATES =====================
  const [products, setProducts] = useState([]); // All products
  const [showFilter, setShowFilter] = useState(false); // Filter sidebar toggle
  const [filterProducts, setFilterProducts] = useState([]); // Filtered products list
  const [catagory, setCatagory] = useState([]); // Selected categories
  const [subcatagory, setSubCatagory] = useState([]); // Selected subcategories
  const [sortType, setSortType] = useState("relavent"); // Sorting type
  const [search, setSearch] = useState(""); // Search text
  const [ShowSearch, setShowSearch] = useState(false); // Search visibility

  // ===================== CART STATES =====================
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || {}
  ); // Cart data stored by productId -> size -> quantity

  const [cartData, setCartData] = useState([]); // Flattened cart array for UI
  const [method, setMethod] = useState("cod"); // Payment method

  // ===================== AUTH STATES =====================
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // ===================== FORM STATES =====================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fixed delivery fee
  const deliveryFee = 10;

  // ======================================================
  // Sync cart items with localStorage whenever cart changes
  // ======================================================
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ======================================================
  // Set filtered products whenever products update
  // ======================================================
  useEffect(() => {
    setTimeout(() => {
      setFilterProducts(products);
    }, 0);
  }, [products]);

  // Toggle filter sidebar
  const toogleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  // Toggle category filter
  const toogleCatagory = (e) => {
    if (catagory.includes(e.target.value)) {
      setCatagory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCatagory((prev) => [...prev, e.target.value]);
    }
  };

  // Toggle subcategory filter
  const toogleSubCatagory = (e) => {
    if (subcatagory.includes(e.target.value)) {
      setSubCatagory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCatagory((prev) => [...prev, e.target.value]);
    }
  };

  // ======================================================
  // Apply search, category, and subcategory filters
  // ======================================================
  const applyFilter = () => {
    let productsCopy = [...products];

    if (ShowSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (catagory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        catagory.includes(item.category)
      );
    }

    if (subcatagory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcatagory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // Run filter whenever dependencies change
  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catagory, subcatagory, ShowSearch, search]);

  // ======================================================
  // Sorting logic
  // ======================================================
  const sortProducts = () => {
    const filterProductsCopy = [...products];

    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  const sortHandler = (e) => {
    setSortType(e.target.value);
  };

  useEffect(() => {
    sortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  // ======================================================
  // Add product to cart
  // ======================================================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select the Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    toast.success("Product Added to Cart", {
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Sync cart to backend if user is logged in
    if (token) {
      try {
        const url = `${backendUrl}/api/cart/add`;
        await axios.post(url, { itemId, size }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ======================================================
  // Get total cart item count
  // ======================================================
  const getCartCounts = () => {
    let totalCounts = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCounts += cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCounts;
  };

  // ======================================================
  // Prepare cart data array for UI rendering
  // ======================================================
  useEffect(() => {
    let tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // ======================================================
  // Update cart item quantity
  // ======================================================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const url = `${backendUrl}/api/cart/update`;
        await axios.post(
          url,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ======================================================
  // Calculate total cart amount
  // ======================================================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((products) => products._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  };

  // Handle payment method change
  const methodHandle = (props) => {
    setMethod(props);
  };

  // ======================================================
  // Fetch product list from backend
  // ======================================================
  const getProductsData = async () => {
    try {
      const url = `${backendUrl}/api/product/list`;
      const response = await axios.get(url);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ======================================================
  // Fetch user cart from backend
  // ======================================================
  const getUserCard = async (token) => {
    try {
      const url = `${backendUrl}/api/cart/get`;
      const res = await axios.post(url, {}, { headers: { token } });
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync token and fetch cart on login
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCard(localStorage.getItem("token"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ======================================================
  // Fetch logged-in user profile
  // ======================================================
  const getUserProfile = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/profile", {
        headers: { token },
      });
      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        console.log("3. Backend Error Message:", response.data.message);
      }
    } catch (error) {
      console.error("4. Axios Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ======================================================
  // Values exposed to entire app
  // ======================================================
  const value = {
    products,
    deliveryFee,
    showFilter,
    toogleFilter,
    filterProducts,
    toogleCatagory,
    toogleSubCatagory,
    sortHandler,
    search,
    setSearch,
    ShowSearch,
    setShowSearch,
    addToCart,
    getCartCounts,
    cartData,
    updateQuantity,
    getCartAmount,
    methodHandle,
    method,
    backendUrl,
    token,
    setToken,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    setCartItems,
    cartItems,
    userData,
    setUserData,
  };

  // Provide context to children components
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;