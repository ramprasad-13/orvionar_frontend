import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseByIdWithoutAuth } from '../utils/api';
import WhyUs from '../components/WhyUs';
import SucessfulTransitions from '../components/SucessfulTransitions';
import Testimonials from '../components/Testimonials';
import Companies from '../components/Companies';
import FAQ from '../components/FAQ';
import Spinner from '../components/Spinner';

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pricingRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);
  const [openHeadings, setOpenHeadings] = useState({});
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [activeCertificate, setActiveCertificate] = useState('Course Completion');

  const certificates = [
    {
      name: 'Course Completion',
      image: 'https://mystaticimages13.s3.eu-north-1.amazonaws.com/images/course+completion+text.png',
    },
    {
      name: 'Internship',
      image: 'https://mystaticimages13.s3.eu-north-1.amazonaws.com/images/intership+cert++text.png',
    },
    {
      name: 'Certificate of Participation',
      image: 'https://mystaticimages13.s3.eu-north-1.amazonaws.com/images/particaption++text.png',
    },
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('No course ID provided in the URL');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getCourseByIdWithoutAuth(id);
        if (!data) throw new Error('Course not found');
        setCourse(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleScrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnroll = (level) => {
    if (course) {
      const message = encodeURIComponent(`I'm interested in joining the ${course.domain.toUpperCase()} domain course: ${course.name} at the ${level} level`);
      window.open(`https://wa.me/+917483905485?text=${message}`, '_blank');
    }
  };

  const toggleHeading = (index) => {
    setOpenHeadings(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) return <Spinner />;
  if (error || !course) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 text-lg mb-4">{error || 'Course not found'}</p>
        <button onClick={() => navigate('/')} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{course.name}</h1>

        {/* Course Overview */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="md:w-1/2">
            <img src={course.thumbnail} alt={course.name} className="w-full rounded-lg shadow" />
          </div>
          <div className="md:w-1/2 space-y-4">
            <p className="text-gray-700">{course.description}</p>
            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded inline-block text-sm font-medium">
              Domain: {course.domain.toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold mb-1">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags?.length > 0 ? (
                  course.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag}</span>
                  ))
                ) : (
                  <span>No tags available</span>
                )}
              </div>
            </div>
            <button onClick={handleScrollToPricing} className="mt-4 bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="mb-10">
          <h3 onClick={() => setIsCurriculumOpen(prev => !prev)} className="text-xl font-semibold cursor-pointer mb-4">
            Curriculum {isCurriculumOpen ? '↑' : '↓'}
          </h3>
          {isCurriculumOpen && (
            <div className="space-y-4">
              {course.curriculum?.length > 0 ? course.curriculum.map((item, i) => (
                <div key={i} className="border rounded-md p-4">
                  <h4 onClick={() => toggleHeading(i)} className="font-semibold cursor-pointer">
                    {item.heading} {openHeadings[i] ? '↑' : '↓'}
                  </h4>
                  {openHeadings[i] && (
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                      {item.subTopics?.length > 0 ? item.subTopics.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      )) : <li>No sub-topics available</li>}
                    </ul>
                  )}
                </div>
              )) : <p>No curriculum available</p>}
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="mb-10">
          <h3 onClick={() => setIsProjectsOpen(prev => !prev)} className="text-xl font-semibold cursor-pointer mb-4">
            Projects {isProjectsOpen ? '↑' : '↓'}
          </h3>
          {isProjectsOpen && (
            <div className="grid sm:grid-cols-2 gap-6">
              {course.projects?.length > 0 ? course.projects.map((proj, i) => (
                <div key={i} className="bg-white border rounded shadow p-4">
                  {proj.imageUrl ? (
                    <img src={proj.imageUrl} alt={proj.name} className="w-full h-40 object-cover rounded mb-3" />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500">No Image</div>
                  )}
                  <h4 className="font-semibold">{proj.name}</h4>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                </div>
              )) : <p>No projects available</p>}
            </div>
          )}
        </div>

        {/* Certificate Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Sample Certificates</h2>
          <div className="flex gap-4 mb-6 flex-wrap">
            {certificates.map(cert => (
              <button
                key={cert.name}
                onClick={() => setActiveCertificate(cert.name)}
                className={`px-4 py-2 rounded border ${
                  activeCertificate === cert.name
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {cert.name}
              </button>
            ))}
          </div>
          <div className="w-full max-w-3xl mx-auto">
            <img
              src={certificates.find(c => c.name === activeCertificate)?.image}
              alt={activeCertificate}
              className="w-full rounded shadow"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div ref={pricingRef} className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-6">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                level: 'General',
                desc: 'Perfect for getting started with the basics.',
                features: [
                  'Access to core course content',
                  'Community support',
                  'Certificate of completion',
                ],
              },
              {
                level: 'Plus',
                desc: 'Enhanced features for deeper learning.',
                features: [
                  'All General plan benefits',
                  'Advanced modules access',
                  'Priority email support',
                  '1-on-1 mentoring sessions',
                ],
              },
              {
                level: 'Pro',
                desc: 'Comprehensive package for professional growth.',
                features: [
                  'All Plus plan benefits',
                  'Exclusive workshops',
                  'Personalized career guidance',
                  'Lifetime access to updates',
                ],
              },
            ].map(plan => (
              <div key={plan.level} className="bg-white border rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{plan.level}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.desc}</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-4">
                    {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <button
                  onClick={() => handleEnroll(plan.level)}
                  className="bg-orange-500 text-white mt-auto py-2 px-4 rounded hover:bg-orange-600"
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      <WhyUs />
      <SucessfulTransitions />
      <Testimonials />
      <Companies />
      <FAQ />
    </>
  );
};

export default Course;
