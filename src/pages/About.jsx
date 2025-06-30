import React from 'react';
import WhyUs from '../components/WhyUs';
import useTitle from '../components/useTitle';

const About = () => {
  useTitle("About");
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-orange-200">Orvionar Tech</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Empowering individuals with cutting-edge skills and knowledge to thrive in today's competitive world.
          </p>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To be a global leader in education and training, fostering innovation, excellence, and lifelong learning for all.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To provide accessible, high-quality education that equips learners with practical skills and prepares them for real-world challenges.
            </p>
          </div>
        </div>
      </section>

      <WhyUs />

      {/* Key Features */}
      {/* <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Why Choose Orvionar Tech?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-orange-50 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Mentors</h3>
              <p className="text-gray-600">
                Learn from industry experts with years of experience in their respective fields.
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-On Training</h3>
              <p className="text-gray-600">
                Gain practical experience through real-world projects and case studies.
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Support</h3>
              <p className="text-gray-600">
                Access career guidance, resume building, and placement assistance.
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Learn at your own pace with flexible schedules and online resources.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Faculty Section */}
      {/* <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Meet Our Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Faculty Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mr. Ramprasad</h3>
              <p className="text-gray-600">Senior Instructor - Software Development</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Faculty Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mr. J</h3>
              <p className="text-gray-600">Lead Trainer - Data Science</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Faculty Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ms. Smitha</h3>
              <p className="text-gray-600">Head of Department - Cybersecurity</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;