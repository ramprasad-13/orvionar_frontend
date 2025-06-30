import React, { useState } from 'react';

const faqs = [
  {
    question: 'Why should I choose Orvionar?',
    answer:
      `We combine expert-led content, lifetime access, doubt-clearing sessions,
      and practical learning activities to give you real-world skills, not just
      theory. Plus, our student-first approach ensures you get the support, flexibility,
      and value you deserve - all in one place.`,
  },
  {
    question: 'Will I have lifetime access to the course content on the LMS?',
    answer:
      `Yes! Once you enroll, you'll have lifetime access to all the course materials on our LMS.
       You can revisit the content anytime, anywhere at your own pace - no deadlines, no pressure.`,
  },
  {
    question: 'Is there any Placement support?',
    answer:
      `Yes, we offer career support including resume reviews, interview
      prep, and job assistance through our hiring partners.`,
  },
  {
    question: 'Will I receive a certificate?',
    answer:
      `Yes! Upon completing the course, you'll earn a professionally recognized certificate to showcase
      your skills and boost your career profile.`,
  },
  {
    question: 'Are the courses beginner-friendly?',
    answer:
      `Absolutely! Our courses are crafted with beginners in mind - featuring 
      easy-to-follow lessons, step-by-step guidance, and plenty of support along the way.`,
  },
  {
    question: 'How do I enroll in the program?',
    answer:
      `Enrolling is easy! Just head to the course page, click "Enroll Now",
      and complete the checkout process. We offer multiple payment options,
      plus scholarships and discounts may be available - check the course details
      or reach out to our team for eligibility.`,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // first question open by default

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-orange-50 py-16 px-4" data-aos="fade-up">
      <h2 className="text-4xl font-bold text-orange-500 text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="border border-orange-200 rounded-md shadow-sm bg-white transition-all duration-300"
          >
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-medium text-black hover:text-orange-500 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="ml-2 text-orange-500">
                {openIndex === index ? '-' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
