import React from 'react';
import useTitle from '../components/useTitle';

const Privacy = () => {
  useTitle('Privacy');

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="bg-orange-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Privacy <strong className="text-orange-600">Policy</strong>
          </h1>
          <p className="text-lg text-gray-700">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              1. Information We <strong className="text-orange-600">Collect</strong>
            </h2>
            <p className="text-gray-800">
              We collect personal information such as your name, email, and payment details, as well as usage data to improve our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              2. How We Use Your <strong className="text-orange-600">Information</strong>
            </h2>
            <p className="text-gray-800">
              Your information helps us deliver services, process payments, send updates, and improve our platform through analytics.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              3. Sharing Your <strong className="text-orange-600">Information</strong>
            </h2>
            <p className="text-gray-800">
              We don’t sell your data. Trusted partners like payment processors or analytics tools may access it securely under confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              4. Data <strong className="text-orange-600">Security</strong>
            </h2>
            <p className="text-gray-800">
              We use encryption and secure servers, but no system is completely secure. We cannot guarantee absolute data protection.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              5. Your <strong className="text-orange-600">Rights</strong>
            </h2>
            <p className="text-gray-800">
              You can access, update, or delete your data and opt out of marketing. Contact us to exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              6. Cookies and <strong className="text-orange-600">Tracking</strong>
            </h2>
            <p className="text-gray-800">
              We use cookies for personalization and remembering preferences. You can disable them in your browser if needed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              7. Third-Party <strong className="text-orange-600">Links</strong>
            </h2>
            <p className="text-gray-800">
              We’re not responsible for the privacy practices of other websites linked from our platform. Please review their policies separately.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              8. Changes to <strong className="text-orange-600">This Policy</strong>
            </h2>
            <p className="text-gray-800">
              We may update this policy. Changes will be posted here and major updates will be notified via email or the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">
              9. Contact <strong className="text-orange-600">Us</strong>
            </h2>
            <p className="text-gray-800">
              For privacy questions, reach us at <a href="mailto:info@orvionar.com" className="text-orange-600 underline">info@orvionar.com</a> or call +91 12345 67890.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
