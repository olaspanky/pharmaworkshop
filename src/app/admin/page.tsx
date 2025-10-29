'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  TrendingUp, 
  Download,
  Search,
  Eye,
  Lock,
  DollarSign,
  Globe,
  Calendar,
  Mail,
  Phone,
  Building,
  Briefcase,
  RefreshCw
} from 'lucide-react';

interface Registration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  country: string;
  amount: number;
  currency: string;
  amountDisplay: string;
  status: 'pending' | 'completed' | 'failed' | 'expired' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'failed';
  confirmationEmailSent: boolean;
  confirmationEmailSentAt?: string;
  createdAt: string;
  completedAt?: string;
  errorMessage?: string;
}

interface Stats {
  overview: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    expired: number;
    conversionRate: string;
  };
  revenue: Array<{ _id: string; total: number }>;
  countries: Array<{ _id: string; count: number }>;
  recentActivity: Array<{ _id: string; count: number }>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://marketback.vercel.app';

export default function RegistrationDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Dashboard state
  const [stats, setStats] = useState<Stats | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

  // Check if passkey is stored in sessionStorage
  useEffect(() => {
    const storedPasskey = sessionStorage.getItem('dashboard_passkey');
    if (storedPasskey === 'pbr2025!') {
      setAuthenticated(true);
      setPasskey(storedPasskey);
    }
  }, []);

  // Fetch stats when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchStats();
      fetchRegistrations();
    }
  }, [authenticated, selectedStatus, currentPage, searchTerm]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === 'pbr2025!') {
      sessionStorage.setItem('dashboard_passkey', passkey);
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passkey. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_passkey');
    setAuthenticated(false);
    setPasskey('');
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
        headers: {
          'X-Dashboard-Passkey': passkey
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        status: selectedStatus,
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(
        `${API_BASE_URL}/api/dashboard/registrations?${params}`,
        {
          headers: {
            'X-Dashboard-Passkey': passkey
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({ status: selectedStatus });
      window.open(
        `${API_BASE_URL}/api/dashboard/export?${params}&passkey=${passkey}`,
        '_blank'
      );
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard Access
            </h1>
            <p className="text-gray-600">
              Enter your passkey to view registrations
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Passkey
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your passkey"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      expired: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-orange-100 text-orange-800 border-orange-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Registration Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Pharm East and West African Training
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchRegistrations}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.overview.total}
                  </p>
                </div>
                <Users className="w-12 h-12 text-blue-500 opacity-80" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.overview.completed}
                  </p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500 opacity-80" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.overview.pending}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-yellow-500 opacity-80" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.overview.conversionRate}%
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500 opacity-80" />
              </div>
            </div>
          </div>
        )}

        {/* Revenue & Countries */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Revenue by Currency
              </h3>
              <div className="space-y-3">
                {stats.revenue.map((rev) => (
                  <div key={rev._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{rev._id.toUpperCase()}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {(rev.total / 100).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Top Countries
              </h3>
              <div className="space-y-3">
                {stats.countries.slice(0, 5).map((country) => (
                  <div key={country._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{country._id}</span>
                    <span className="text-lg font-bold text-gray-900">{country.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {['all', 'completed', 'pending', 'failed', 'expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by name, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{reg.name}</div>
                          <div className="text-sm text-gray-500">{reg.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{reg.organization}</div>
                        <div className="text-xs text-gray-500">{reg.role}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {reg.country}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {reg.amountDisplay || `${reg.currency} ${(reg.amount / 100).toLocaleString()}`}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={reg.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedRegistration(reg)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Registration Details</h3>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Users className="w-4 h-4" />
                    Name
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.name}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.email}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.phone}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Building className="w-4 h-4" />
                    Organization
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.organization}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Briefcase className="w-4 h-4" />
                    Role
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.role}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Globe className="w-4 h-4" />
                    Country
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.country}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    Amount
                  </div>
                  <div className="font-medium text-gray-900">{selectedRegistration.amountDisplay}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <StatusBadge status={selectedRegistration.status} />
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    Created At
                  </div>
                  <div className="font-medium text-gray-900">
                    {new Date(selectedRegistration.createdAt).toLocaleString()}
                  </div>
                </div>

                {selectedRegistration.completedAt && (
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <CheckCircle className="w-4 h-4" />
                      Completed At
                    </div>
                    <div className="font-medium text-gray-900">
                      {new Date(selectedRegistration.completedAt).toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="col-span-2">
                  <div className="text-sm text-gray-600 mb-1">Email Confirmation</div>
                  <div className={`font-medium ${selectedRegistration.confirmationEmailSent ? 'text-green-600' : 'text-gray-500'}`}>
                    {selectedRegistration.confirmationEmailSent ? '✓ Sent' : '✗ Not Sent'}
                    {selectedRegistration.confirmationEmailSentAt && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({new Date(selectedRegistration.confirmationEmailSentAt).toLocaleString()})
                      </span>
                    )}
                  </div>
                </div>

                {selectedRegistration.errorMessage && (
                  <div className="col-span-2">
                    <div className="text-sm text-gray-600 mb-1">Error Message</div>
                    <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                      {selectedRegistration.errorMessage}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}