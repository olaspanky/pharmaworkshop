'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Shield, MapPin, Globe } from 'lucide-react';

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

type Country = 'Nigeria' | 'Ghana' | 'Kenya' | 'Africa' | 'non-African';

const pricingTiers: Record<Country, PricingTier> = {
  'Nigeria': {
    amount: 5000000, // 50,000 NGN in kobo (100 kobo = 1 NGN)
    currency: 'NGN',
    symbol: '₦',
    display: '50,000',
    label: 'Nigeria – ₦50,000'
  },
  'Ghana': {
    amount: 54131, // ~750 GHS in pesewas (100 pesewas = 1 GHS) - equivalent to $50 USD
    currency: 'GHS',
    symbol: 'GH₵',
    display: '541.31',
    label: 'Ghana – GH₵541.31'
  },
  'Kenya': {
    amount: 645750, // ~6,500 KES in cents (100 cents = 1 KES) - equivalent to $50 USD
    currency: 'KES',
    symbol: 'KSh',
    display: '6,457.50',
    label: 'Kenya – KSh6,6457.50'
  },
  'Africa': {
    amount: 5000, // $50 in cents
    currency: 'USD',
    symbol: '$',
    display: '50',
    label: 'Africa – $50'
  },
  'non-African': {
    amount: 15000, // $150 in cents
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

// Country list for manual selection
const countryList = [
  { code: 'NG', name: 'Nigeria', region: 'Nigeria' },
  { code: 'GH', name: 'Ghana', region: 'Ghana' },
  { code: 'KE', name: 'Kenya', region: 'Kenya' },
  { code: 'ZA', name: 'South Africa', region: 'Africa' },
  { code: 'EG', name: 'Egypt', region: 'Africa' },
  { code: 'DZ', name: 'Algeria', region: 'Africa' },
  { code: 'MA', name: 'Morocco', region: 'Africa' },
  { code: 'TN', name: 'Tunisia', region: 'Africa' },
  { code: 'ET', name: 'Ethiopia', region: 'Africa' },
  { code: 'TZ', name: 'Tanzania', region: 'Africa' },
  { code: 'UG', name: 'Uganda', region: 'Africa' },
  { code: 'RW', name: 'Rwanda', region: 'Africa' },
  { code: 'SN', name: 'Senegal', region: 'Africa' },
  { code: 'CI', name: 'Côte d\'Ivoire', region: 'Africa' },
  { code: 'CM', name: 'Cameroon', region: 'Africa' },
  { code: 'AO', name: 'Angola', region: 'Africa' },
  { code: 'MW', name: 'Malawi', region: 'Africa' },
  { code: 'ZM', name: 'Zambia', region: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', region: 'Africa' },
  { code: 'BW', name: 'Botswana', region: 'Africa' },
  { code: 'NA', name: 'Namibia', region: 'Africa' },
  { code: 'MZ', name: 'Mozambique', region: 'Africa' },
  { code: 'US', name: 'United States', region: 'non-African' },
  { code: 'GB', name: 'United Kingdom', region: 'non-African' },
  { code: 'CA', name: 'Canada', region: 'non-African' },
  { code: 'AU', name: 'Australia', region: 'non-African' },
  { code: 'DE', name: 'Germany', region: 'non-African' },
  { code: 'FR', name: 'France', region: 'non-African' },
  { code: 'IN', name: 'India', region: 'non-African' },
  { code: 'CN', name: 'China', region: 'non-African' },
  { code: 'JP', name: 'Japan', region: 'non-African' },
  { code: 'BR', name: 'Brazil', region: 'non-African' },
  { code: 'OTHER', name: 'Other Country', region: 'non-African' },
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
  const [geoFailed, setGeoFailed] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string>('');
  const [detectedRegion, setDetectedRegion] = useState<string>('');
  const [manualCountryCode, setManualCountryCode] = useState<string>('');

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
          
          // Check for specific countries with local currency pricing
          if (countryCode === 'NG') {
            setDetectedLocation(countryName);
            setSelectedCountry('Nigeria');
            setDetectedRegion('Nigeria');
          } else if (countryCode === 'GH') {
            setDetectedLocation(countryName);
            setSelectedCountry('Ghana');
            setDetectedRegion('Ghana');
          } else if (countryCode === 'KE') {
            setDetectedLocation(countryName);
            setSelectedCountry('Kenya');
            setDetectedRegion('Kenya');
          } else if (africanCountries.includes(countryCode)) {
            // Other African countries
            setDetectedLocation(countryName);
            setSelectedCountry('Africa');
            setDetectedRegion('Africa');
          } else {
            // Non-African countries
            setDetectedLocation(countryName);
            setSelectedCountry('non-African');
            setDetectedRegion('Non-African Region');
          }
          setGeoFailed(false);
        } else {
          // Detection returned but no country code
          setGeoFailed(true);
        }
      } catch (err) {
        console.error('Geolocation detection failed:', err);
        // Show manual selection fallback
        setGeoFailed(true);
      } finally {
        setGeoLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Handle manual country selection
  const handleCountrySelect = (countryCode: string) => {
    setManualCountryCode(countryCode);
    
    const country = countryList.find(c => c.code === countryCode);
    if (!country) return;

    setDetectedLocation(country.name);
    setDetectedRegion(country.name === 'Other Country' ? 'International' : country.name);
    
    // Map to pricing tier
    if (country.region === 'Nigeria') {
      setSelectedCountry('Nigeria');
    } else if (country.region === 'Ghana') {
      setSelectedCountry('Ghana');
    } else if (country.region === 'Kenya') {
      setSelectedCountry('Kenya');
    } else if (country.region === 'Africa') {
      setSelectedCountry('Africa');
    } else {
      setSelectedCountry('non-African');
    }
  };

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
      setError('Please select your country to continue');
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
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
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
                    {geoFailed ? 'Select Your Country *' : 'Region'}
                  </label>
                  
                  {/* Show detected region if geo succeeded */}
                  {!geoFailed && !geoLoading && (
                    <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#265F9C]" />
                      <span>{detectedRegion || 'Non-African Region'}</span>
                    </div>
                  )}

                  {/* Show loading state */}
                  {geoLoading && (
                    <div className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-700 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#265F9C] border-t-transparent rounded-full animate-spin" />
                      <span>Detecting location...</span>
                    </div>
                  )}

                  {/* Show country selector if geo failed */}
                  {geoFailed && !geoLoading && (
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#265F9C] pointer-events-none" />
                      <select
                        value={manualCountryCode}
                        onChange={(e) => handleCountrySelect(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition appearance-none bg-white"
                      >
                        <option value="">Select your country</option>
                        <optgroup label="Featured Countries">
                          <option value="NG">Nigeria</option>
                          <option value="GH">Ghana</option>
                          <option value="KE">Kenya</option>
                        </optgroup>
                        <optgroup label="Other African Countries">
                          {countryList
                            .filter(c => c.region === 'Africa')
                            .map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))
                          }
                        </optgroup>
                        <optgroup label="International">
                          {countryList
                            .filter(c => c.region === 'non-African')
                            .map(c => (
                              <option key={c.code} value={c.code}>{c.name}</option>
                            ))
                          }
                        </optgroup>
                      </select>
                    </div>
                  )}
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

              {/* Pricing Display - Only show when country is selected */}
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

              {/* Info message if location needs to be selected */}
              {geoFailed && !selectedCountry && !geoLoading && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-700 text-sm">
                    Please select your country above to view registration pricing
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || geoLoading || !selectedCountry}
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