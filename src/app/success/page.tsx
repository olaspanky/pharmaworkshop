'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, Mail, Calendar, Download, AlertCircle } from 'lucide-react';

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'failed'>('sending');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get session_id from URL on client side
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('session_id');
      setSessionId(id);
    }
  }, []);

  useEffect(() => {
    const verifyPaymentAndSendEmail = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Call backend to verify payment and automatically send email
        const API_URL = 'http://localhost:3001';
        const response = await fetch(
          `${API_URL}/api/checkout-session/${sessionId}`
        );

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();
        setSessionData(data);
        
        // Check email status from backend
        if (data.email_sent) {
          setEmailStatus('sent');
        } else if (data.email_error) {
          setEmailStatus('failed');
          setError(data.email_error);
        }
        
        console.log('Payment verified:', data);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message);
        setEmailStatus('failed');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPaymentAndSendEmail();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#265F9C] mx-auto mb-4"></div>
          <p className="text-slate-600">Processing your registration...</p>
        </div>
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
                Your payment has been processed successfully and your registration is confirmed for the Pharm East and West African Training.
              </p>
            </div>

            {/* Email Status */}
            <div className={`p-4 rounded-lg mb-6 ${
              emailStatus === 'sent' ? 'bg-green-50 border-l-4 border-green-500' :
              emailStatus === 'failed' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
              'bg-blue-50 border-l-4 border-blue-500'
            }`}>
              <div className="flex items-start">
                <Mail className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
                  emailStatus === 'sent' ? 'text-green-600' :
                  emailStatus === 'failed' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
                <div className="ml-3">
                  <h4 className={`font-semibold ${
                    emailStatus === 'sent' ? 'text-green-900' :
                    emailStatus === 'failed' ? 'text-yellow-900' :
                    'text-blue-900'
                  }`}>
                    {emailStatus === 'sent' && 'Confirmation Email Sent!'}
                    {emailStatus === 'failed' && 'Email Delivery Note'}
                    {emailStatus === 'sending' && 'Sending Confirmation Email...'}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    emailStatus === 'sent' ? 'text-green-700' :
                    emailStatus === 'failed' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {emailStatus === 'sent' && sessionData?.customer_email && (
                      <>Sent to: <strong>{sessionData.customer_email}</strong>. Please check your inbox and spam folder.</>
                    )}
                    {emailStatus === 'failed' && (
                      <>Your registration is confirmed, but there was an issue sending the email. Please contact support if you don't receive it within 15 minutes.</>
                    )}
                    {emailStatus === 'sending' && (
                      <>We're sending your confirmation email with all the event details...</>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {sessionData && (
              <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">Payment Details</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Amount Paid:</span>
                    <span className="font-semibold text-slate-800">
                      {sessionData.currency?.toUpperCase()} {(sessionData.amount_total / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <span className="font-semibold text-green-600">
                      ✓ {sessionData.status === 'paid' ? 'Paid' : sessionData.status}
                    </span>
                  </div>
                  {sessionId && (
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Transaction Reference:</p>
                      <p className="text-xs font-mono text-slate-700 break-all">{sessionId}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Training Details */}
            <div className="bg-gradient-to-r from-[#265F9C] to-[#0D1854] p-6 rounded-lg text-white mb-6">
              <h3 className="font-bold text-lg mb-3">📋 Training Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Event:</strong> Pharm East and West African Training</p>
                <p><strong>Dates:</strong> November 14th - 16th, 2025</p>
                <p><strong>Platform:</strong> Zoom</p>
                <div className="pt-3">
                  <a
                    href="https://bit.ly/pbrWEAwksp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-[#265F9C] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                  >
                    🔗 Join Training Link
                  </a>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> Please log in at least 10 minutes before the start time to avoid any technical delays.
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-slate-800 text-lg">What happens next?</h3>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Mail className="w-6 h-6 text-[#265F9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Check Your Email</h4>
                  <p className="text-sm text-slate-600">
                    Your confirmation email contains all event details, Zoom link, and important information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Calendar className="w-6 h-6 text-[#265F9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Save the Date</h4>
                  <p className="text-sm text-slate-600">
                    Add the event to your calendar. We'll send you reminders as the date approaches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <Download className="w-6 h-6 text-[#265F9C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Course Materials</h4>
                  <p className="text-sm text-slate-600">
                    You'll receive comprehensive course materials and resources during the training.
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
                <a href="mailto:jumoke.kareem@pbrinsight.com" className="text-[#265F9C] hover:underline font-semibold">
                  jumoke.kareem@pbrinsight.com
                </a>
                {' '}or call{' '}
                <a href="tel:+2348032915433" className="text-[#265F9C] hover:underline font-semibold">
                  +234 803 291 5433
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}