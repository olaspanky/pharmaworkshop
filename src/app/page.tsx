"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Globe, Users, TrendingUp, Lightbulb, Target, ChevronRight, Menu, X, BarChart3, Presentation, Rocket } from 'lucide-react';

export default function PBRLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface FormData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    role: string;
  }

  interface PaymentOption {
    country: string;
    amount: string;
  }

  interface Speaker {
    name: string;
    country: string;
    flag: string;
  }

  interface AgendaItem {
    title: string;
    icon: React.ElementType;
    color: string;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
  };

  const speakers = [
    {
      name: "Mr. Adeoye Sobande",
      country: "Nigeria",
      flag: "🇳🇬"
    },
    {
      name: "Mr. Adedayo Ogunpitan",
      country: "Nigeria",
      flag: "🇳🇬"
    },
    {
      name: "Mr. Martins Muguira",
      country: "Kenya",
      flag: "🇰🇪"
    }
  ];

  const agenda = [
    {
      title: "Market Insights & Strategy",
      icon: BarChart3,
      color: "from-[#265F9C] to-cyan-400"
    },
    {
      title: "Brand Planning & Financial Forecasting",
      icon: Presentation,
      color: "from-[#0D1854] to-[#265F9C]"
    },
    {
      title: "Launch & Digital Engagement Excellence",
      icon: Rocket,
      color: "from-[#265F9C] to-cyan-300"
    }
  ];

  const paymentOptions = [
    { country: "Nigeria", amount: "NGN 50,000" },
    { country: "Ghana", amount: "GHS 1,200" },
    { country: "Kenya", amount: "KES 7,500" },
    { country: "Other African countries", amount: "$50" },
    { country: "International", amount: "$150" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div>
                <img src="pbrlogo.png" alt='PBR Life Sciences' className='h-10 w-auto'/>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-[#0D1854] hover:text-[#265F9C] transition-colors font-medium">About</a>
              <a href="#speakers" className="text-[#0D1854] hover:text-[#265F9C] transition-colors font-medium">Speakers</a>
              <a href="#agenda" className="text-[#0D1854] hover:text-[#265F9C] transition-colors font-medium">Agenda</a>
              <a href="#register" className="bg-[#265F9C] text-white px-6 py-2.5 rounded-lg hover:bg-[#0D1854] transition-colors font-semibold shadow-md">
                Register Now
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#0D1854] hover:text-[#265F9C] transition-colors">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0D1854] md:hidden pt-20">
          <div className="flex flex-col items-center space-y-6 p-8 text-white">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-xl hover:text-cyan-300 transition-colors">About</a>
            <a href="#speakers" onClick={() => setIsMenuOpen(false)} className="text-xl hover:text-cyan-300 transition-colors">Speakers</a>
            <a href="#agenda" onClick={() => setIsMenuOpen(false)} className="text-xl hover:text-cyan-300 transition-colors">Agenda</a>
            <a href="#register" onClick={() => setIsMenuOpen(false)} className="bg-[#265F9C] text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-[#0D1854] transition-colors">
              Register Now
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{background: 'linear-gradient(135deg, #0D1854 0%, #265F9C 50%, #0a1628 100%)'}}>
        {/* Animated Background Network */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(100, 200, 255, 0.3) 0%, transparent 50%)',
            width: '600px',
            height: '600px',
            top: '10%',
            left: '60%',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
          <div className="absolute" style={{
            background: 'radial-gradient(circle at 80% 60%, rgba(100, 200, 255, 0.2) 0%, transparent 50%)',
            width: '800px',
            height: '800px',
            top: '40%',
            right: '40%',
            animation: 'pulse 6s ease-in-out infinite'
          }}></div>
        </div>

        {/* Network Dots Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(100, 200, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Glowing Lines */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-20"
              style={{
                width: '2px',
                height: '100%',
                left: `${15 + i * 12}%`,
                animation: `glow ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          @keyframes glow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              2026 Pharma West & Africa Brand Planning Workshop
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              3 Days of Strategic Learning, Insight & Innovation in Pharma Marketing
            </p>

            <div className="flex flex-wrap gap-4 mb-8 text-white">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Nov 12-14, 2025</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">10 AM - 1 PM GMT</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Virtual Event</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-10">
              <span className="text-4xl">🇳🇬</span>
              <span className="text-4xl">🇬🇭</span>
              <span className="text-4xl">🇰🇪</span>
              <span className="text-4xl">🇮🇳</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#register" className="bg-cyan-400 text-[#0D1854] px-8 py-4 rounded-lg font-bold hover:bg-cyan-300 transition-all transform hover:scale-105 shadow-xl">
                Register Now
              </a>
              <a href="#about" className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#0D1854] transition-all font-bold">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="w-1 h-16 bg-[#0D1854] mb-6"></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-8">
              About the Workshop
            </h2>
          </div>

          <div className="border border-slate-200 rounded-lg p-12 shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Why Attend?</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  A 3-day virtual workshop designed to equip Africa's pharma professionals with practical tools for strategic brand planning, market analytics, and digital excellence — led by seasoned experts across Nigeria, Ghana, Kenya, and India.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#265F9C] rounded-full mt-2"></div>
                    <p className="text-slate-700">Learn cutting-edge brand planning strategies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#265F9C] rounded-full mt-2"></div>
                    <p className="text-slate-700">Master financial forecasting techniques</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#265F9C] rounded-full mt-2"></div>
                    <p className="text-slate-700">Connect with industry experts across Africa</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                  alt="Analytics Dashboard" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#265F9C] text-white p-6 rounded-lg shadow-xl">
                  <div className="text-4xl font-bold">3</div>
                  <div className="text-sm">Days of Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="w-1 h-16 bg-[#0D1854] mb-6"></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-4">
              Workshop Agenda
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Three comprehensive sessions covering everything from market insights to digital excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {agenda.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-[#0D1854] font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#0D1854] to-[#265F9C]"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="w-1 h-16 bg-[#0D1854] mb-6"></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-4">
              Meet Our Expert Speakers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Learn from industry leaders with decades of combined experience in pharmaceutical marketing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {speakers.map((speaker, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 mx-auto w-48 h-48">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0D1854] to-[#265F9C] flex items-center justify-center overflow-hidden shadow-xl group-hover:shadow-2xl transition-all transform group-hover:scale-105">
                    <div className="w-40 h-40 rounded-full bg-white"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 text-4xl">{speaker.flag}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{speaker.name}</h3>
                <p className="text-[#265F9C] font-medium">{speaker.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="w-1 h-16 bg-[#0D1854] mb-6"></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-4">
              Secure Your Spot
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Register now to join Africa's leading pharmaceutical marketing professionals
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-[#0D1854] to-[#265F9C] text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Investment Options</h3>
                <div className="space-y-3">
                  {paymentOptions.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 p-4 rounded-lg transition">
                      <input type="radio" name="payment" className="w-5 h-5 accent-cyan-400" />
                      <div className="flex-1">
                        <div className="font-semibold">{option.country}</div>
                        <div className="text-2xl font-bold text-cyan-300">{option.amount}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Select Country *</label>
                      <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                      >
                        <option value="">Select country</option>
                        <option value="nigeria">Nigeria</option>
                        <option value="ghana">Ghana</option>
                        <option value="kenya">Kenya</option>
                        <option value="other-africa">Other African countries</option>
                        <option value="international">International</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Organisation *</label>
                    <input 
                      type="text" 
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Role *</label>
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g., Marketing Manager, Brand Director" 
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition" 
                    />
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[#265F9C] to-[#0D1854] text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Complete Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1854] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold tracking-wider mb-2" style={{fontFamily: 'monospace'}}>PBR</div>
              <div className="text-sm tracking-widest text-cyan-300 mb-4">LIFE SCIENCES</div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Advancing pharmaceutical excellence across Africa through education and innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-cyan-300 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#about" className="block text-blue-200 hover:text-cyan-300 transition-colors">About Workshop</a>
                <a href="#speakers" className="block text-blue-200 hover:text-cyan-300 transition-colors">Speakers</a>
                <a href="#agenda" className="block text-blue-200 hover:text-cyan-300 transition-colors">Agenda</a>
                <a href="#register" className="block text-blue-200 hover:text-cyan-300 transition-colors">Register</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-cyan-300 text-lg">Contact</h4>
              <div className="space-y-2 text-sm text-blue-200">
                <p>Email: info@pbrlifesciences.com</p>
                <p>Phone: +234 XXX XXX XXXX</p>
                <p>Website: www.pbrlifesciences.com</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-cyan-300 text-lg">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-[#265F9C] rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors">
                  <span className="text-lg">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-[#265F9C] rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors">
                  <span className="text-lg">in</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#265F9C] pt-8 text-center text-blue-300 text-sm">
            <p>&copy; 2025 PBR Life Sciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}