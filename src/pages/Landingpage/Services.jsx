import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <section className="flex-1 bg-white/60 px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your orders delivered quickly and safely.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">
              Our support team is here to help you 24/7.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Enjoy safe and reliable payment methods.
            </p>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
