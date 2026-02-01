import { useState } from 'react';
import { Palette, Mail, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function CustomOrderPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    boardType: 'complete',
    colorPreference: '',
    designIdeas: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        boardType: 'complete',
        colorPreference: '',
        designIdeas: '',
        message: '',
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Your Style, Your Ride
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I can make custom boards in any style or color. Let's create something unique together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image & Info Section */}
          <div>
            <div className="mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1594246159128-1ffde8775aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkJTIwZGVjayUyMGhhbmRtYWRlJTIwY3JhZnRzbWFuc2hpcHxlbnwxfHx8fDE3Njk5ODI2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Custom skateboard craftsmanship"
                className="w-full h-[400px] object-cover rounded-lg shadow-xl"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
                Custom Order Process
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#0C5A7D] text-white flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Share Your Vision</h3>
                    <p className="text-gray-600">
                      Fill out the form with your design ideas, color preferences, and any special requests.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#D4A574] text-[#1A1A1A] flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Consultation</h3>
                    <p className="text-gray-600">
                      I'll reach out to discuss your ideas and provide suggestions based on my experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#2D5741] text-white flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Handcrafted Creation</h3>
                    <p className="text-gray-600">
                      Once we agree on the design, I'll handcraft your custom board with love and attention to detail.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#B8956A] text-white flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Delivery to Paradise</h3>
                    <p className="text-gray-600">
                      Your one-of-a-kind board ships from Kauai to your door, ready to ride.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#D4A574]/10 rounded-lg border-2 border-[#D4A574]">
                <div className="flex items-start gap-3">
                  <Palette className="w-6 h-6 text-[#D4A574] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Endless Possibilities</h4>
                    <p className="text-sm text-gray-700">
                      From tropical themes to abstract art, from subtle wood stains to vibrant colors - 
                      your imagination is the only limit. Each custom board is a collaboration between 
                      your vision and my craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
                Request Custom Quote
              </h2>

              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#2D5741] mx-auto mb-4" />
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                    Mahalo!
                  </h3>
                  <p className="text-gray-600">
                    Thanks for your custom order request. I'll get back to you within 24-48 hours to discuss your vision!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D]"
                      placeholder="(808) 555-0123"
                    />
                  </div>

                  <div>
                    <label htmlFor="boardType" className="block text-sm font-semibold mb-2">
                      Board Type *
                    </label>
                    <select
                      id="boardType"
                      name="boardType"
                      required
                      value={formData.boardType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D]"
                    >
                      <option value="complete">Complete Board ($275 + shipping)</option>
                      <option value="deck">Deck Only ($175 + shipping)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="colorPreference" className="block text-sm font-semibold mb-2">
                      Color Preferences
                    </label>
                    <input
                      type="text"
                      id="colorPreference"
                      name="colorPreference"
                      value={formData.colorPreference}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D]"
                      placeholder="e.g., Ocean blues, sunset oranges, natural wood tones"
                    />
                  </div>

                  <div>
                    <label htmlFor="designIdeas" className="block text-sm font-semibold mb-2">
                      Design Ideas
                    </label>
                    <textarea
                      id="designIdeas"
                      name="designIdeas"
                      rows={4}
                      value={formData.designIdeas}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D] resize-none"
                      placeholder="Describe your vision... tropical themes, geometric patterns, abstract art, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C5A7D] resize-none"
                      placeholder="Any other details or questions?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0C5A7D] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0A4359] transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Request Custom Quote
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    * Required fields
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Gallery/Examples Section */}
        <div className="bg-[#0C5A7D] text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-6">
            Every custom board I create is a unique work of art. From the selection of wood to the final 
            hand-painted details, your board will be crafted with the same passion and precision that goes 
            into every Eastside Longboard.
          </p>
          <p className="text-2xl" style={{ fontFamily: 'Merriweather, serif', color: '#D4A574' }}>
            Get out there and Pump it!
          </p>
        </div>
      </div>
    </div>
  );
}
