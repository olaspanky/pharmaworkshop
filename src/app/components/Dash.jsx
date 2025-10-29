// pages/dashboard.tsx   (Next.js example)
'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    const cred = btoa(`admin:${pass}`);
    try {
      const res = await fetch('https://marketback.vercel.app/api/dashboard', {
        headers: { Authorization: `Basic ${cred}` },
      });
      if (!res.ok) throw new Error('Wrong passkey');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PBR Registration Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="password"
          placeholder="Enter passkey (pbr2025!)"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading…' : 'Show'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold">{data.summary.totalAttempts}</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <p className="text-sm text-green-700">Successful</p>
              <p className="text-2xl font-bold">{data.summary.successful}</p>
            </div>
            <div className="bg-red-100 p-4 rounded">
              <p className="text-sm text-red-700">Failed</p>
              <p className="text-2xl font-bold">{data.summary.failed}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded">
              <p className="text-sm text-yellow-700">Pending</p>
              <p className="text-2xl font-bold">{data.summary.attempted}</p>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Country</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Error</th>
              </tr>
            </thead>
            <tbody>
              {data.logs.map((l) => (
                <tr key={l._id} className={l.status === 'success' ? 'bg-green-50' : l.status === 'failed' ? 'bg-red-50' : ''}>
                  <td className="border p-2">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="border p-2">{l.name}</td>
                  <td className="border p-2">{l.email}</td>
                  <td className="border p-2">{l.country}</td>
                  <td className="border p-2">{l.status}</td>
                  <td className="border p-2">{l.errorMessage || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}