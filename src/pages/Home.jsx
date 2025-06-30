import React, { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InView } from 'react-intersection-observer';
import Spinner from '../components/Spinner';

// Lazy-loaded sections
const Companies = lazy(() => import('../components/Companies'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const WhyUs = lazy(() => import('../components/WhyUs'));
const Contact = lazy(() => import('../pages/Contact'));
const SucessfulTransitions = lazy(() => import('../components/SucessfulTransitions'));

const Home = () => {
  const navigate = useNavigate();

  const [load, setLoad] = useState({
    transitions: false,
    companies: false,
    testimonials: false,
    whyus: false,
    faq: false,
    contact: false,
  });

  const openDomains = (e) => {
    e.preventDefault();
    navigate('/domains');
  };

  const handleInView = (key) => (inView) => {
    if (inView && !load[key]) {
      setLoad((prev) => ({ ...prev, [key]: true }));
    }
  };

  return (
    <>
      {/* SEO & Fonts */}
      <Helmet>
        <title>Orvionar Tech – Transform Your Future</title>
        <meta name="description" content="Join Orvionar Tech to level up your skills and become part of the elite 1% in tech." />
        <meta name="keywords" content="EdTech, skill development, tech training, AI courses, Orvionar" />
        <meta property="og:title" content="Orvionar Tech – Advance with Confidence" />
        <meta property="og:description" content="Get expert-guided, industry-ready programs for the most ambitious learners." />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700;800&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>{`
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700;800&display=swap" />
        `}</noscript>
      </Helmet>

      {/* 🔥 Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-[90vh] flex items-center justify-center px-6 md:px-12 text-center">
        <div className="max-w-5xl">
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-orange-700 leading-tight mb-6"
            style={{ fontFamily: `'Poppins', sans-serif` }}
          >
            Learn Smarter.<br />Grow Faster.<br />Get Hired.
          </h1>
          <p
            className="text-gray-700 text-lg md:text-xl mb-8"
            style={{ fontFamily: `'Inter', sans-serif` }}
          >
            At <strong>Orvionar Tech</strong>, we go beyond teaching — we transform your career with AI-powered programs, expert mentors,
            and real-world outcomes. Trusted by thousands across India.
          </p>
          <button
            onClick={openDomains}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            🚀 Discover Our Programs
          </button>
          <p className="mt-4 text-sm text-gray-500">💼 97% of learners achieved job offers or promotions within 3 months.</p>
        </div>
      </section>

      {/* Lazy-loaded Sections */}
      <Suspense fallback={<Spinner />}>
        <InView as="div" onChange={handleInView('transitions')} triggerOnce>
          {load.transitions && <SucessfulTransitions />}
        </InView>

        <InView as="div" onChange={handleInView('companies')} triggerOnce>
          {load.companies && <Companies />}
        </InView>

        <InView as="div" onChange={handleInView('testimonials')} triggerOnce>
          {load.testimonials && (
            <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-white">
              <Testimonials />
              <div className="max-w-3xl m-4 md:mx-auto mt-16 bg-white border border-orange-200 rounded-3xl shadow-xl px-8 py-10 text-center backdrop-blur-md">
                <p className="text-xl italic text-gray-700 mb-4">
                  “You don’t have to be great to start, but you have to start to be great.”
                </p>
                <span className="text-orange-600 font-bold">– Zig Ziglar</span>
              </div>
            </section>
          )}
        </InView>

        <InView as="div" onChange={handleInView('whyus')} triggerOnce>
          {load.whyus && <WhyUs />}
        </InView>

        <InView as="div" onChange={handleInView('faq')} triggerOnce>
          {load.faq && <FAQ />}
        </InView>

        <InView as="div" onChange={handleInView('contact')} triggerOnce>
          {load.contact && <Contact />}
        </InView>
      </Suspense>
    </>
  );
};

export default Home;
