import React, { useState } from 'react';
import AdminLayout from '../../Components/admin/AdminLayout';
import { Eye, Search, Filter, MoreVertical, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  // Mock Data representing contact form submissions waiting for the backend integration
  const [submissions] = useState([
    {
      id: "SUB-001",
      name: "Kwame Osei",
      email: "kwame.test@example.com",
      date: "Oct 24, 2026",
      status: "New",
      message: "Hello, I am reaching out to inquire about partnership opportunities regarding the Skills Acquisition Program in the rural central district.",
    },
    {
      id: "SUB-002",
      name: "Abena Mensah",
      email: "abena.mensah@company.org",
      date: "Oct 23, 2026",
      status: "Read",
      message: "Can you provide more information on how our school can host a Myth Busters Campaign?",
    },
    {
      id: "SUB-003",
      name: "Global Health Init",
      email: "contact@ghi.net",
      date: "Oct 21, 2026",
      status: "Responded",
      message: "We've reviewed your recent reports and would like to set up a meeting with Dr. Enimil to discuss funding frameworks.",
    },
    {
      id: "SUB-004",
      name: "Samuel Darko",
      email: "samuel1999@yahoo.com",
      date: "Oct 20, 2026",
      status: "Read",
      message: "I am a university student interested in volunteering for the HyƐ Fa YƆ Campaign next month. Please let me know how to apply.",
    }
  ]);

  return (
    <AdminLayout title="Dashboard - Submissions | ProActif Global">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
        <p className="text-gray-600 mt-2">Manage inquiries and messages sent through the public website.</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Submissions</div>
          <div className="text-3xl font-bold text-gray-900">124</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">New Unread</div>
          <div className="text-3xl font-bold text-red-600">14</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Responded</div>
          <div className="text-3xl font-bold text-green-600">89</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-1">Response Rate</div>
          <div className="text-3xl font-bold text-gray-900">72%</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 sm:text-sm"
            placeholder="Search by name, email or keyword..."
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="size-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message Preview
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 size-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                        {sub.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{sub.name}</div>
                        <div className="text-sm text-gray-500">{sub.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {sub.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sub.date}</div>
                    <div className="text-xs text-gray-500">{sub.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${sub.status === 'New' ? 'bg-red-100 text-red-800' : ''}
                      ${sub.status === 'Read' ? 'bg-gray-100 text-gray-800' : ''}
                      ${sub.status === 'Responded' ? 'bg-green-100 text-green-800' : ''}
                    `}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1" title="View Full Message">
                        <Eye className="size-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 p-1" title="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">124</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-red-50 text-sm font-medium text-red-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
