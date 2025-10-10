import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Globe, Users, TrendingUp, Lightbulb, Target, ChevronRight, Menu, X } from 'lucide-react';

export default function PBRLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const speakers = [
    {
      name: "Mr. Adeoye Sobande",
      country: "Nigeria",
      flag: "🇳🇬",
      role: "Strategic Brand Planning Expert"
    },
    {
      name: "Mr. Adedayo Ogunpitan",
      country: "Ghana",
      flag: "🇬🇭",
      role: "Market Analytics Specialist"
    },
    {
      name: "Mr. Martins Muguira",
      country: "Kenya",
      flag: "🇰🇪",
      role: "Digital Excellence Leader"
    },
    {
      name: "Industry Expert",
      country: "India",
      flag: "🇮🇳",
      role: "Financial Forecasting Consultant"
    }
  ];

  const agenda = [
    {
      day: "Day 1",
      title: "Market Insights & Strategy",
      icon: TrendingUp,
      topics: ["African Pharma Market Overview", "Competitive Intelligence", "Strategic Positioning"]
    },
    {
      day: "Day 2",
      title: "Brand Planning & Financial Forecasting",
      icon: Target,
      topics: ["Brand Architecture", "Budget Planning", "ROI Optimization"]
    },
    {
      day: "Day 3",
      title: "Launch & Digital Engagement Excellence",
      icon: Lightbulb,
      topics: ["Product Launch Strategy", "Digital Marketing", "Omnichannel Engagement"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PBR</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">PBR LIFE SCIENCES</div>
                <div className="text-xs text-emerald-600">Empowering Innovation</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-700 hover:text-blue-600 transition font-medium">About</a>
              <a href="#speakers" className="text-slate-700 hover:text-blue-600 transition font-medium">Speakers</a>
              <a href="#agenda" className="text-slate-700 hover:text-blue-600 transition font-medium">Agenda</a>
              <a href="#register" className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-3 rounded-full hover:shadow-xl transition transform hover:-translate-y-0.5 font-semibold">
                Register Now
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="text-blue-900" /> : <Menu className="text-blue-900" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-20">
          <div className="flex flex-col items-center space-y-6 p-8">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-xl text-slate-700">About</a>
            <a href="#speakers" onClick={() => setIsMenuOpen(false)} className="text-xl text-slate-700">Speakers</a>
            <a href="#agenda" onClick={() => setIsMenuOpen(false)} className="text-xl text-slate-700">Agenda</a>
            <a href="#register" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-full">
              Register Now
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-emerald-50 to-white opacity-70"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Virtual Workshop 2025
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                2026 Pharma West & East Africa
                <span className="block mt-3 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  Brand Planning Workshop
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Empowering Africa's Pharma Marketers with Data, Strategy & Innovation
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-blue-600 w-5 h-5" />
                  <span className="text-slate-700 font-medium">Nov 12-14, 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-emerald-600 w-5 h-5" />
                  <span className="text-slate-700 font-medium">10:00 AM - 1:00 PM GMT</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="text-blue-600 w-5 h-5" />
                  <span className="text-slate-700 font-medium">Virtual Event</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#register" className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-full hover:shadow-2xl transition transform hover:-translate-y-1 font-semibold flex items-center space-x-2">
                  <span>Secure Your Spot</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a href="#about" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition font-semibold">
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-48 h-48 text-white opacity-20 animate-pulse" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-4xl font-bold mb-2">3 Days</div>
                    <div className="text-xl">Expert-Led Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              About the Workshop
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-8 lg:p-12 shadow-xl">
              <p className="text-xl text-slate-700 leading-relaxed text-center">
                A <span className="font-bold text-blue-600">3-day virtual workshop</span> designed to equip Africa's pharma professionals with practical tools for strategic brand planning, market analytics, and digital excellence — led by seasoned experts across Nigeria, Ghana, Kenya, and India.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Strategic Planning</h3>
                  <p className="text-slate-600 text-sm">Master brand architecture and positioning</p>
                </div>
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Market Analytics</h3>
                  <p className="text-slate-600 text-sm">Data-driven insights and forecasting</p>
                </div>
                <div className="text-center">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lightbulb className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Digital Excellence</h3>
                  <p className="text-slate-600 text-sm">Modern engagement strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Meet The Speakers
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Learn from industry leaders with decades of combined experience across African and global pharma markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((speaker, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-slate-100">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{speaker.flag}</div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{speaker.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm mb-2">{speaker.country}</p>
                    <p className="text-slate-600 text-sm">{speaker.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Agenda Overview
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {agenda.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition border border-slate-100 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {day.day}
                      </span>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{day.title}</h3>
                    <ul className="space-y-3">
                      {day.topics.map((topic, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <ChevronRight className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="register" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Brand Strategy?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join Africa's leading pharma professionals in this transformative workshop
          </p>
          <button className="bg-white text-blue-600 px-12 py-5 rounded-full text-lg font-bold hover:shadow-2xl transition transform hover:-translate-y-1">
            Register Now - Limited Seats Available
          </button>
          <p className="mt-6 text-sm opacity-75">
            Early bird discount available until October 25th, 2025
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">PBR</span>
                </div>
                <div>
                  <div className="font-bold">PBR LIFE SCIENCES</div>
                  <div className="text-xs text-emerald-400">Empowering Innovation</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Advancing pharmaceutical excellence across Africa through education and innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-emerald-400">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#about" className="block text-slate-400 hover:text-white transition">About Workshop</a>
                <a href="#speakers" className="block text-slate-400 hover:text-white transition">Speakers</a>
                <a href="#agenda" className="block text-slate-400 hover:text-white transition">Agenda</a>
                <a href="#register" className="block text-slate-400 hover:text-white transition">Register</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-emerald-400">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Email: info@pbrlifesciences.com</p>
                <p>Phone: +234 XXX XXX XXXX</p>
                <p>Website: www.pbrlifesciences.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 PBR Life Sciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}