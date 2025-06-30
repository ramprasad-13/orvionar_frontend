import React from 'react';
import useTitle from '../components/useTitle';

const Terms = () => {
  useTitle('Terms');

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="bg-orange-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Terms and <strong className="text-orange-600">Conditions</strong>
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to our platform! Please read these Terms and Conditions carefully before using our services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              1. Acceptance of <strong className="text-orange-600">Terms</strong>
            </h2>
            <p className="text-gray-800">
              By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              2. Use of <strong className="text-orange-600">Services</strong>
            </h2>
            <p className="text-gray-800">
              Our platform provides educational content and services. You agree to use our services only for lawful purposes and in accordance with these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              3. User <strong className="text-orange-600">Accounts</strong>
            </h2>
            <p className="text-gray-800">
              To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              4. Payment and <strong className="text-orange-600">Refunds</strong>
            </h2>
            <p className="text-gray-800">
              Some services may require payment. All payments are processed securely. Refunds, if applicable, will be processed according to our refund policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              5. Intellectual <strong className="text-orange-600">Property</strong>
            </h2>
            <p className="text-gray-800">
              All content on our platform is our property or licensed to us. You may not reproduce, distribute, or create derivative works without our permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              6. Limitation of <strong className="text-orange-600">Liability</strong>
            </h2>
            <p className="text-gray-800">
              We strive to provide accurate and reliable services, but we are not liable for any damages arising from your use of our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              7. Changes to <strong className="text-orange-600">Terms</strong>
            </h2>
            <p className="text-gray-800">
              We may update these Terms and Conditions. We will notify you of significant changes via email or through our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              8. Contact <strong className="text-orange-600">Us</strong>
            </h2>
            <p className="text-gray-800">
              If you have any questions, contact us at <a href="mailto:info@orvionar.com" className="text-orange-600 underline">info@orvionar.com</a> or call +91 12345 67890.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
