import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full  py-12 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Welcome to <strong>The Green Corner</strong>! We're passionate about bringing the beauty and benefits of plants into your homes and workplaces. With a curated selection of healthy and vibrant plants, we aim to inspire a greener, healthier lifestyle for everyone.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* <img
              src="https://via.placeholder.com/300"
              alt="Our Mission"
              className="w-80 h-80 object-cover rounded-lg mb-4"
            /> */}
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to connect people with nature by offering a wide variety of plants, gardening tools, and expert advice. We believe in making plant care easy and enjoyable for everyone, whether you're a beginner or an experienced plant lover.
            </p>
          </div>

          {/* Vision Section */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* <img
              src="https://via.placeholder.com/300"
              alt="Our Vision"
              className="w-80 h-80 object-cover rounded-lg mb-4"
            /> */}
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where every home and workspace is enriched with the presence of lush, thriving greenery. Our goal is to cultivate a community of plant enthusiasts who share our love for sustainability, growth, and the environment.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Why Choose Us?</h3>
          <ul className="text-gray-600 list-disc list-inside">
            <li>Healthy, well-cared-for plants delivered to your doorstep.</li>
            <li>Expert advice and resources for plant care and gardening.</li>
            <li>A commitment to sustainable and eco-friendly practices.</li>
            <li>Personalized recommendations tailored to your needs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
