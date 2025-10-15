"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, TrendingUp, Lightbulb, Target, ChevronRight, Menu, X, BarChart3, Presentation, Rocket } from 'lucide-react';
import { Nav } from './components/Nav';
import  Footer  from './components/Footer';
import StripeCheckoutPage from './components/CheckooutForm';

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
      name: "Adeoye Sobande",
      title: "Chief Product & Innovation Officer",
      country: "Nigeria",
      flag: "🇳🇬",
      image: "/images/asb.png"
    },
    {
      name: "Adedayo Ogunpitan",
      title: "Head of Marketing",
      company: "Groupe Ethica",
      country: "Nigeria",
      flag: "🇳🇬",
      image: "/images/ao.png"
    },
    {
      name: "Despina Loannides",
      title: "Senior Innovation Director",
      company: "dsm-firmenich",
      country: "Switzerland",
      flag: "🇨🇭",
      image: "/images/msp22.png"
    },
    {
      name: "Grace Naa Ardua Nelson",
      title: "Regulatory Affairs Manager",
      company: "Novartis Sub-Saharan Africa",
      country: "Ghana",
      flag: "🇬🇭",
      image: null
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

      <Nav/>
    

      {/* Hero Section */}
<section className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden bg-[url('/images/m111.jpeg')] bg-center bg-cover isidora">       
  {/* Dark overlay for better text readability */}
  <div className="absolute inset-0 bg-black/40 z-0"></div>
  
  <div className="max-w-7xl mx-auto relative z-10 w-full">
    <div className="max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 text-balance">
        2026 Pharma West & East Africa Brand Planning Workshop
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed mb-6 sm:mb-8 text-balance">
        3 Days of Strategic Learning, Insight & Innovation in Pharma Marketing
      </p>

      <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 text-white text-sm sm:text-base">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-semibold whitespace-nowrap">Nov 12-14, 2025</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-semibold whitespace-nowrap">10 AM - 1 PM GMT</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-semibold whitespace-nowrap">Virtual Event</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 mb-8 sm:mb-10">
        <span className="text-2xl sm:text-3xl md:text-4xl">🇳🇬</span>
        <span className="text-2xl sm:text-3xl md:text-4xl">🇬🇭</span>
        <span className="text-2xl sm:text-3xl md:text-4xl">🇰🇪</span>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
        <a 
          href="#register" 
          className="border-2 border-white bg-[#0D1854] text-[white] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-[#0D1854] transition-all transform hover:scale-105 shadow-xl text-center text-sm sm:text-base"
        >
          Register Now
        </a>
        <a 
          href="#about" 
          className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-[#0D1854] transition-all font-bold text-center text-sm sm:text-base"
        >
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
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-8">
              About the Workshop
            </h2>
          </div>

          <div className="border border-slate-200 rounded-lg p-12 shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Why Attend?</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  A 3-day virtual workshop designed to equip Africa's pharma professionals with practical tools for strategic brand planning, market analytics, and digital excellence — led by seasoned experts across Nigeria, Ghana, Kenya, Switzerland and India.
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
                  src="/images/aattend.jpg" 
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
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-4">
              Meet Our Expert Speakers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Learn from industry leaders with decades of combined experience in pharmaceutical marketing
            </p>
          </div>

          {/* Speakers Section */}
<section id="speakers" className="py-20 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="mb-12">
      <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-4">
        Meet Our Expert Speakers
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl">
        Learn from industry leaders with decades of combined experience in pharmaceutical marketing
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      {speakers.map((speaker, index) => (
        <div key={index} className="text-center group">
          <div className="relative mb-6 mx-auto w-48 h-48">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0D1854] to-[#265F9C] flex items-center justify-center overflow-hidden shadow-xl group-hover:shadow-2xl transition-all transform group-hover:scale-105">
              {speaker.image ? (
                <div className="w-46 h-46 rounded-full bg-blue-100">
                  <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover rounded-full" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-300 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">
                    {speaker.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 text-4xl">{speaker.flag}</div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{speaker.name}</h3>
          <p className="text-[#265F9C] font-semibold mb-1">{speaker.title}</p>
          {speaker.company && (
            <p className="text-slate-600 text-sm mb-1">{speaker.company}</p>
          )}
          <p className="text-slate-500 text-sm">{speaker.country}</p>
        </div>
      ))}
    </div>
  </div>
</section>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="p-2lg:py-20 lg:px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D1854] mb-4">
              Secure Your Spot
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Register now to join Africa's leading pharmaceutical marketing professionals
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 lg:p-8 lg:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-[#0D1854] to-[#265F9C] text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Registeration Options</h3>
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
              <StripeCheckoutPage/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
}