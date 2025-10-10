import React from 'react'
import { useState, useEffect } from 'react';
import { Calendar, Clock, Globe, Users, TrendingUp, Lightbulb, Target, ChevronRight, Menu, X, BarChart3, Presentation, Rocket } from 'lucide-react';


export const Nav = () => {

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
      flag: "🇳🇬",
      image: "/images/as.jpg"
    },
    {
      name: "Mr. Adedayo Ogunpitan",
      country: "Nigeria",
      flag: "🇳🇬",
            image: "/images/as.jpg"

    },
    {
      name: "Mr. Martins Muguira",
      country: "Kenya",
      flag: "🇰🇪",
            image: "/images/as.jpg"

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
    <div>
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
    </div>
  )
}
