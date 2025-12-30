import { toast } from "react-toastify";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    e.target.reset()
  };

  return (
    <section className="mb-14 mt-10">
      {/* newsletter heading */}
      <div className="text-center">
        <p className="text-2xl font-medium text-primary-dark">
          Subsribe now & get 20% off
        </p>
        <p className="text-primary-light mt-3">
          Subscribe now and get 20% off your first order. Be the first to know about new arrivals, exclusive promotions, and the latest trends at Forever.
        </p>
      </div>

      {/* newsletter form */}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex mx-auto my-6 pl-3 sm:flex-row items-center gap-3 sm:gap-0"
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          className="w-full sm:flex-1 px-4 py-3 text-sm rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition"
        />
        <button
          type="submit"
          className="bg-primary-dark text-white px-4 py-2 text-lg rounded-lg shadow-md 
          hover:bg-black hover:scale-103 transition transform duration-300 
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light 
          sm:ml-3 mt-0 cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    
    </section>
  );
};

export default NewsLetter;
