import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { FiArrowRight, FiPlusSquare } from 'react-icons/fi'

import DashboardLayout from '../layouts/DashboardLayout'
import { API } from '../services/api'
import { formatDate, getApplicationStats, statMeta, statusClass } from '../utils/dashboardData'



const Dashboard = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiFailed, setApiFailed] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const res = await API.get('/applications')
        if (res.data?.success) {
          setApplications(res.data.applications || [])
          setApiFailed(false)
        }
      } catch {
        setApiFailed(true)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const stats = useMemo(() => getApplicationStats(applications), [applications])

  const recentApplications = useMemo(() => {
    return [...applications].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5)
  }, [applications])

  return (
    <DashboardLayout activeKey="home">
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-6 border-2 border-border bg-card p-5 shadow-brutal-lg">
          <div className="absolute right-0 top-0 h-full w-4 border-l-2 border-border bg-success" />
          <p className="text-sm font-black uppercase">Welcome back</p>
          <h2 className="brand-type mt-1 text-4xl uppercase leading-none sm:text-5xl">Keep tracking. Keep winning.</h2>
          {apiFailed && (
            <p className="mt-3 max-w-2xl border-2 border-border bg-primary px-3 py-2 text-xs font-black uppercase shadow-brutal">
              Backend data did not load.
            </p>
          )}
        </section>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statMeta.map((item) => {
            const Icon = item.icon

            return (
              <article key={item.key} className="border-2 border-border bg-card p-4 shadow-brutal">
                <div className="flex items-start justify-between gap-3">
                  <p className="max-w-24 text-xs font-black uppercase leading-tight">{item.label}</p>
                  <div className={`grid h-10 w-10 place-items-center border-2 border-border ${item.tone}`}>
                    <Icon className="text-2xl" />
                  </div>
                </div>
                <p className="brand-type mt-3 text-5xl leading-none">{stats[item.key] ?? 0}</p>
              </article>
            )
          })}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="border-2 border-border bg-card shadow-brutal-lg">
            <div className="flex items-center justify-between gap-3 border-b-2 border-border p-4">
              <h2 className="brand-type text-3xl uppercase leading-none">Recent Applications</h2>
              <Link to="/dashboard/jobs" className="border-2 border-border bg-primary px-4 py-2 text-xs font-black uppercase shadow-brutal">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-border text-xs uppercase">
                    <th className="px-4 py-3 font-black">Company</th>
                    <th className="px-4 py-3 font-black">Role</th>
                    <th className="px-4 py-3 font-black">Status</th>
                    <th className="px-4 py-3 font-black">Applied On</th>
                    <th className="px-4 py-3 font-black" aria-label="Open application" />
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <tr key={index} className="border-b-2 border-border last:border-b-0">
                        <td className="px-4 py-4" colSpan="5">
                          <div className="h-5 w-full animate-pulse bg-primary/40" />
                        </td>
                      </tr>
                    ))
                  ) : recentApplications.length === 0 ? (
                    <tr>
                      <td className="px-4 py-6 font-black uppercase" colSpan="5">
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    recentApplications.map((app) => (
                      <tr key={app._id || `${app.companyName}-${app.jobRole}`} className="border-b-2 border-border last:border-b-0">
                        <td className="px-4 py-3 font-bold">{app.companyName}</td>
                        <td className="px-4 py-3">{app.jobRole}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex border-2 border-border px-2 py-1 text-[11px] font-black uppercase ${statusClass[app.status] || 'bg-primary'}`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{formatDate(app.appliedDate || app.createdAt)}</td>
                        <td className="px-4 py-3">
                          <FiArrowRight className="text-xl" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6">
            <section className="border-2 border-border bg-card p-4 shadow-brutal-lg">
              <h2 className="brand-type mb-4 text-3xl uppercase leading-none">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <Link to="/dashboard/jobs/new" className="flex items-center justify-between border-2 border-border bg-primary px-4 py-3 font-black uppercase shadow-brutal">
                  Add Application
                  <FiPlusSquare className="text-2xl" />
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

