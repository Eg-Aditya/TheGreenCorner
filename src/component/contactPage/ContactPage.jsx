import axios from 'axios';
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      try {
        const response = await axios.post('http://localhost:5000/contactus', formData);
        if (response.status === 200) {
          setFormStatus('Thank you for reaching out! We will get back to you soon.');
          setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form after submission
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setFormStatus('Something went wrong. Please try again.');
      }
    } else {
      setFormStatus('Please fill in all fields.');
    }
    
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Contact Information Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-green-600">Contact Us</h1>
        <p className="text-lg text-gray-700 mt-4">
          We’d love to hear from you! If you have any questions or need assistance, feel free to reach out to us:
        </p>

        <div className="mt-8 space-y-4">
          <div className="text-lg text-gray-800">
            <strong>Email:</strong> thegreencorner@nursery.com
          </div>
          <div className="text-lg text-gray-800">
            <strong>Phone:</strong> +91 9876543210
          </div>
          <div className="text-lg text-gray-800">
            <strong>Address:</strong> 123 Plant Street, Green Valley, NV, 89001
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div>
        <h2 className="text-2xl font-semibold text-green-600">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#163040] focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#163040] focus:outline-none"
                placeholder="Your email address"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-semibold">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#163040] focus:outline-none"
                placeholder="Subject of your inquiry"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#163040] focus:outline-none"
                placeholder="Write your message here"
                rows="6"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#163020] text-white font-semibold rounded-lg shadow-md hover:bg-[#163030] focus:outline-none  "
          >
            Submit
          </button>
        </form>

        {/* Form Status */}
        {formStatus && (
          <p className="mt-4 text-lg text-green-600 font-semibold">{formStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
