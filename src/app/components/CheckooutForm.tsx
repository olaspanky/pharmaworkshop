'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Shield } from 'lucide-react';

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

type Country = 'nigeria' | 'ghana' | 'kenya' | 'other-africa' | 'international';

const pricingTiers: Record<Country, PricingTier> = {
  'nigeria': {
    amount: 5000000, // Amount in kobo (50,000 NGN)
    currency: 'ngn',
    symbol: '₦',
    display: '50,000',
    label: 'Nigeria – NGN 50,000'
  },
  'ghana': {
    amount: 120000, // Amount in pesewas (1,200 GHS)
    currency: 'ghs',
    symbol: 'GH₵',
    display: '1,200',
    label: 'Ghana – GHS 1,200'
  },
  'kenya': {
    amount: 750000, // Amount in cents (7,500 KES)
    currency: 'kes',
    symbol: 'KSh',
    display: '7,500',
    label: 'Kenya – KES 7,500'
  },
  'other-africa': {
    amount: 5000, // Amount in cents (50 USD)
    currency: 'usd',
    symbol: '$',
    display: '50',
    label: 'Other African countries – $50'
  },
  'international': {
    amount: 15000, // Amount in cents (150 USD)
    currency: 'usd',
    symbol: '$',
    display: '150',
    label: 'International – $150'
  }
};

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

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.phone || !formData.organization || !formData.role) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!selectedCountry) {
      setError('Please select a country');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
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
    <div className=" py-12 px-4 text-black" >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#265F9C] to-[#0D1854] p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Event Registration</h1>
            <p className="text-blue-100">Complete your registration and secure your spot</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
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
                    Select Country *
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value as Country)}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265F9C] focus:border-transparent transition"
                  >
                    <option value="">Select country</option>
                    {Object.entries(pricingTiers).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.label}
                      </option>
                    ))}
                  </select>
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
              {selectedCountry && (
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
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#265F9C] to-[#0D1854] text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
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