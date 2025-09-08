import React from 'react';
import useTitle from '../components/useTitle';

const Contact = () => {
  useTitle("Contact");

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="bg-orange-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-700">
            We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-8 px-6 text-center bg-white">
        <div className="max-w-4xl mx-auto text-gray-800 text-lg leading-relaxed">
          <p>
            <strong className="text-black">Address:</strong> Orvionar Tech, H206, 36/5, Hustlehub Tech Park, Somasundarapalya Main Rd, Adjacent 27th Main Rd,
            ITI Layout, Sector 2, HaralukunteVillage, HSR Layout, Bengaluru - 560102<br />
            <strong className="text-black">Email:</strong> info@orvionar.in<br />
            <strong className="text-black">Phone:</strong> +91 7483905485
          </p>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-black mb-6">Contact Us</h2>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-black">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-black">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1 font-medium text-black">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-black">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map */}
        <div>
          <h2 className="text-3xl font-bold text-black mb-6">Our Location</h2>
          <div className="w-full h-[400px] border border-gray-200 rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.927724051174!2d77.6392893743576!3d13.017823312736232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16c7a44b5c8f%3A0x4c671f4f5a8f4b8e!2sOrvionar%20Tech!5e0!3m2!1sen!2sin!4v1695305701234!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
              title="Orvionar Tech Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
