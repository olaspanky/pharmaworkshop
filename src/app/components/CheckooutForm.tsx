'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Shield, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
}

interface PricingTier {
  amount: number;
  currency: string;
  symbol: string;
  display: string;
  label: string;
}

type Country = 'Africa' | 'non-African';

const pricingTiers: Record<Country, PricingTier> = {
  'Africa': {
    amount: 5000,
    currency: 'USD',
    symbol: '$',
    display: '50',
    label: 'Africa – $50'
  },
  'non-African': {
    amount: 15000,
    currency: 'USD',
    symbol: '$',
    display: '150',
    label: 'non-African – $150'
  },
};

// List of African country codes (ISO 3166-1 alpha-2)
const africanCountries = [
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD',
  'CI', 'DJ', 'EG', 'GQ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS',
  'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'YT', 'MA', 'MZ', 'NA', 'NE', 'NG',
  'RE', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG',
  'TN', 'UG', 'ZM', 'ZW', 'EH'
];

export default function StripeCheckoutPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: ''
  });

  const [selectedCountry, setSelectedCountry] = useState<Country | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [geoLoading, setGeoLoading] = useState(true);
  const [detectedLocation, setDetectedLocation] = useState<string>('');
  const [detectedRegion, setDetectedRegion] = useState<string>('');

  // Detect user's location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setGeoLoading(true);
        
        // Using ipapi.co - free tier allows 1,000 requests per day
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country_code) {
          const countryCode = data.country_code;
          const countryName = data.country_name;
          const isAfrican = africanCountries.includes(countryCode);
          
          setDetectedLocation(countryName);
          setSelectedCountry(isAfrican ? 'Africa' : 'non-African');
          setDetectedRegion(isAfrican ? 'Africa' : 'Non-African Region');
        } else {
          // Default to non-African if detection fails
          setSelectedCountry('non-African');
          setDetectedRegion('Non-African Region');
          setDetectedLocation('Unknown');
        }
      } catch (err) {
        console.error('Geolocation detection failed:', err);
        // Default to non-African pricing if detection fails
        setSelectedCountry('non-African');
        setDetectedRegion('Non-African Region');
        setDetectedLocation('Unknown');
      } finally {
        setGeoLoading(false);
      }
    };

    detectLocation();
  }, []);

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.phone || !formData.organization || !formData.role) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!selectedCountry) {
      setError('Unable to detect your location. Please refresh the page and try again.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const pricing = pricingTiers[selectedCountry as Country];

      // Call your API route to create checkout session
      const response = await fetch('https://marketback.vercel.app/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          country: selectedCountry,
          amount: pricing.amount,
          currency: pricing.currency,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      console.error('Checkout error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="py-12 lg:px-4 text-black">
      <div className="max-w-3xl lg:mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#265F9C] to-[#0D1854] p-3 lg:p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Event Registration</h1>
            <p className="text-blue-100">Complete your registration and secure your spot</p>
          </div>

          {/* Form */}
          <div className="p-3 lg:p-8">
           

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="lg:space-y-6 space-y-2">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Region
                  </label>
                  <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#265F9C]" />
                    <span>{geoLoading ? 'Detecting...' : detectedRegion || 'Non-African Region'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Organisation *
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                  placeholder="Acme Corporation"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Marketing Manager, Brand Director"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                />
              </div>

              {/* Pricing Display */}
              {!geoLoading && selectedCountry && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">Registration Fee</p>
                      <p className="text-3xl font-bold text-[#265F9C]">
                        {pricingTiers[selectedCountry as Country].symbol}
                        {pricingTiers[selectedCountry as Country].display}
                      </p>
                    
                    </div>
                    <CreditCard className="w-12 h-12 text-[#265F9C]" />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || geoLoading}
                className="w-full bg-gradient-to-r from-[#265F9C] to-[#0D1854] text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {geoLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Detecting Location...
                  </>
                ) : loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Shield className="w-5 h-5" />
              Secure payment powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}