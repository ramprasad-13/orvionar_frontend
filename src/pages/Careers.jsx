import React from 'react';
import useTitle from '../components/useTitle';

const Careers = () => {
  useTitle("Careers");

  const jobs = [
    {
      id: 1,
      title: 'Online Instructor - Web Development',
      description:
        'Join our team to teach web development courses, including HTML, CSS, and JavaScript. Create engaging content and mentor students to build real-world projects.',
      applyLink: '#',
    },
    {
      id: 2,
      title: 'Content Developer - Data Science',
      description:
        'Develop high-quality data science course materials, including tutorials, quizzes, and assignments. Collaborate with instructors to ensure content accuracy.',
      applyLink: '#',
    },
    {
      id: 3,
      title: 'Student Success Manager',
      description:
        'Support students throughout their learning journey, providing guidance, answering queries, and ensuring a positive educational experience.',
      applyLink: '#',
    },
  ];

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="bg-orange-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-700">
            Be part of our mission to transform education. Explore exciting career opportunities and make a difference with us!
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Open Positions</h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-black mb-2">{job.title}</h3>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <a
                href={job.applyLink}
                className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Job Pool Form */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-4">Join Our Talent Pool</h2>
          <p className="text-center text-gray-700 mb-8">
            Not seeing the right role? Submit your details to stay connected for future opportunities.
          </p>
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
              <label htmlFor="resume" className="block mb-1 font-medium text-black">Upload Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 bg-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-black">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us about yourself"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Careers;
