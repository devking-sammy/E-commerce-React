import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <section className="flex-1 bg-white/60 px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We are an ecommerce platform dedicated to providing you with the best
          shopping experience. Our mission is to bring quality products at the
          best prices, delivered to your doorstep.
        </p>
      </section>

      {/* <Footer />8 */}
    </div>
  );
}
