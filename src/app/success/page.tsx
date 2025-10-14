'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, Mail, Calendar, Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);

    // Optional: You can verify the session with Stripe here
    if (sessionId) {
      console.log('Payment session ID:', sessionId);
      // You could call a backend endpoint to verify and save the registration
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#265F9C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-green-100">Your registration is confirmed</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Thank You for Registering!
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Your payment has been processed successfully. You will receive a confirmation email shortly with all the event details and your registration information.
              </p>
            </div>

            {/* Session ID Display */}
            {sessionId && (
              <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-slate-600 mb-1">Transaction Reference:</p>
                <p className="text-xs font-mono text-slate-800 break-all">{sessionId}</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-slate-800 text-lg">What happens next?</h3>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Mail className="w-6 h-6 text-[#265F9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Check Your Email</h4>
                  <p className="text-sm text-slate-600">
                    A confirmation email with your receipt and event details has been sent to your registered email address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Calendar className="w-6 h-6 text-[#265F9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Save the Date</h4>
                  <p className="text-sm text-slate-600">
                    Add the event to your calendar and we'll send you reminders as the date approaches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Download className="w-6 h-6 text-[#265F9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Access Your Ticket</h4>
                  <p className="text-sm text-slate-600">
                    Your event ticket and badge will be available for download 48 hours before the event.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                Print Receipt
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gradient-to-r from-[#265F9C] to-[#0D1854] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Back to Home
              </button>
            </div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Questions? Contact us at{' '}
                <a href="mailto:support@yourevent.com" className="text-[#265F9C] hover:underline font-semibold">
                  support@yourevent.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}