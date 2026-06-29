import { useEffect, useMemo, useState } from 'react'

import toast from 'react-hot-toast'
import { Link, useSearchParams } from 'react-router-dom'
import { FiEdit3, FiMoreVertical, FiPlusSquare, FiSearch, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'
import { API } from '../../services/api'
import { formatDate, statusClass } from '../../utils/dashboardData'

const pageSize = 5

const emptyEdit = {
    status: '',
    notes: '',
    location: '',
}

const normalizeText = (value) => String(value || '').toLowerCase()
const jobStatuses = ['Applied', 'Interviewing', 'Offer', 'Rejected']

const JobsList = () => {
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const [applications, setApplications] = useState([])

    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState(null)
    const [statusFilter, setStatusFilter] = useState('All')
    const [sortBy, setSortBy] = useState('latest')
    const [page, setPage] = useState(1)

    const [editingJob, setEditingJob] = useState(null)
    const [editForm, setEditForm] = useState(emptyEdit)

    const [deletingJob, setDeletingJob] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true)
                const res = await API.get('/applications')
                if (res.data?.success) setApplications(res.data.applications || [])
            } catch {
                // Toast handled centrally by axios interceptor
            } finally {
                setLoading(false)
            }
        }

        fetchApplications()
    }, [])

    const filteredJobs = useMemo(() => {
        const activeSearch = search ?? searchQuery
        const next = applications.filter((job) => {
            const matchesSearch = [job.companyName, job.jobRole, job.location, job.platform]
                .some((value) => normalizeText(value).includes(normalizeText(activeSearch)))
            const matchesStatus = statusFilter === 'All' || job.status === statusFilter

            return matchesSearch && matchesStatus
        })

        next.sort((a, b) => {
            if (sortBy === 'company') return String(a.companyName).localeCompare(String(b.companyName))

            return new Date(b.appliedDate || b.createdAt || 0) - new Date(a.appliedDate || a.createdAt || 0)
        })

        return next
    }, [search, searchQuery, sortBy, statusFilter, applications])

    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize))
    const pageJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize)

    const openEdit = (job) => {
        setEditingJob(job)
        setEditForm({
            status: job.status || '',
            notes: job.notes || '',
            location: job.location || '',
        })
    }

    const saveEdit = async () => {
        if (!editingJob?._id) return

        try {
            setSaving(true)
            const res = await API.patch(`/applications/${editingJob._id}`, editForm)

            if (!res.data?.success) {
                toast.error(res.data?.message || 'Failed to update application')
                return
            }

            setApplications((prev) =>
                prev.map((job) => (job._id === editingJob._id ? res.data.application : job)),
            )
            toast.success('Application updated')
            setEditingJob(null)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update application')
        } finally {
            setSaving(false)
        }
    }

    const confirmDelete = async () => {
        if (!deletingJob?._id) return

        try {
            setSaving(true)
            const res = await API.delete(`/applications/${deletingJob._id}`)

            if (!res.data?.success) {
                toast.error(res.data?.message || 'Failed to delete application')
                return
            }

            setApplications((prev) => prev.filter((job) => job._id !== deletingJob._id))
            toast.success('Application deleted')
            setDeletingJob(null)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete application')
        } finally {
            setSaving(false)
        }
    }

    return (
        <DashboardLayout activeKey="jobs">
            <div className="mx-auto max-w-7xl">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="brand-type text-4xl uppercase leading-none sm:text-5xl">Job List</h2>
                    <Link
                        to="/dashboard/jobs/new"
                        className="flex items-center justify-center gap-2 border-2 border-border bg-primary px-4 py-3 text-xs font-black uppercase shadow-brutal"
                    >
                        Add Application
                        <FiPlusSquare className="text-xl" />
                    </Link>
                </div>

                <section className="mb-5 grid grid-cols-1 gap-3 border-2 border-border bg-card p-4 shadow-brutal-lg lg:grid-cols-[1fr_180px_180px]">
                    <label className="flex items-center gap-2 border-2 border-border bg-card px-3 py-2 shadow-brutal-inset">
                        <FiSearch className="text-xl" />
                        <input
                            value={search ?? searchQuery}
                            onChange={(event) => {
                                setSearch(event.target.value)
                                setPage(1)
                            }}
                            placeholder="Search company, role, platform..."
                            className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                        />
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(event) => {
                            setStatusFilter(event.target.value)
                            setPage(1)
                        }}
                        className="border-2 border-border bg-card px-3 py-2 text-sm font-black uppercase shadow-brutal"
                    >
                        {['All', ...jobStatuses].map((status) => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        className="border-2 border-border bg-card px-3 py-2 text-sm font-black uppercase shadow-brutal"
                    >
                        <option value="latest">Sort Latest</option>
                        <option value="company">Sort Company</option>
                    </select>
                </section>

                <section className="overflow-hidden border-2 border-border bg-card shadow-brutal-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b-2 border-border text-xs uppercase">
                                    <th className="px-4 py-3 font-black">Company</th>
                                    <th className="px-4 py-3 font-black">Role</th>
                                    <th className="px-4 py-3 font-black">Location</th>
                                    <th className="px-4 py-3 font-black">Status</th>
                                    <th className="px-4 py-3 font-black">Applied On</th>
                                    <th className="px-4 py-3 font-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            className="px-4 py-6 font-black uppercase"
                                            colSpan={6}
                                        >
                                            Loading applications...
                                        </td>
                                    </tr>
                                ) : pageJobs.length === 0 ? (
                                    <tr>
                                        <td
                                            className="px-4 py-6 font-black uppercase"
                                            colSpan={6}
                                        >
                                            No applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    pageJobs.map((job) => (
                                        <tr
                                            key={job._id}
                                            className="border-b-2 border-border last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="grid h-10 w-10 place-items-center border-2 border-border bg-primary font-black shadow-brutal">
                                                        {String(job.companyName || '?').charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black">{job.companyName}</p>
                                                        <p className="text-xs font-semibold">{job.platform || 'Direct'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold">{job.jobRole}</td>
                                            <td className="px-4 py-3">{job.location || 'Not added'}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex border-2 border-border px-2 py-1 text-[11px] font-black uppercase ${statusClass[job.status] || 'bg-primary'
                                                        }`}
                                                >
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{formatDate(job.appliedDate || job.createdAt)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEdit(job)}
                                                        className="grid h-9 w-9 place-items-center border-2 border-border bg-card shadow-brutal"
                                                        aria-label="Edit job"
                                                    >
                                                        <FiEdit3 />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeletingJob(job)}
                                                        className="grid h-9 w-9 place-items-center border-2 border-border bg-danger text-bg shadow-brutal"
                                                        aria-label="Delete job"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                    <Link
                                                        to={`/dashboard/jobs/${job._id}`}
                                                        className="grid h-9 w-9 place-items-center border-2 border-border bg-primary shadow-brutal"
                                                        aria-label="View job details"
                                                    >
                                                        <FiMoreVertical />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="border-2 border-border bg-card px-4 py-2 text-xs font-black uppercase shadow-brutal disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <p className="text-xs font-black uppercase">
                        Page {page} of {totalPages}
                    </p>
                    <button
                        type="button"
                        disabled={page >= totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="border-2 border-border bg-primary px-4 py-2 text-xs font-black uppercase shadow-brutal disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {editingJob && (
                    <div className="fixed inset-0 z-50 grid place-items-center bg-text/20 p-4 backdrop-blur-sm">
                        <section className="w-full max-w-lg border-2 border-border bg-card p-5 shadow-brutal-lg">
                            <h3 className="brand-type mb-4 text-4xl uppercase leading-none">Edit Job</h3>
                            <div className="grid gap-3">
                                <label className="grid gap-1 text-xs font-black uppercase">
                                    Status
                                    <select
                                        value={editForm.status}
                                        onChange={(event) =>
                                            setEditForm((prev) => ({ ...prev, status: event.target.value }))
                                        }
                                        className="border-2 border-border bg-card px-3 py-2 text-sm font-semibold outline-none shadow-brutal-inset"
                                    >
                                        {jobStatuses.map((status) => (
                                            <option key={status}>{status}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="grid gap-1 text-xs font-black uppercase">
                                    Location
                                    <input
                                        value={editForm.location}
                                        onChange={(event) =>
                                            setEditForm((prev) => ({ ...prev, location: event.target.value }))
                                        }
                                        className="border-2 border-border bg-card px-3 py-2 text-sm font-semibold outline-none shadow-brutal-inset"
                                    />
                                </label>
                                <label className="grid gap-1 text-xs font-black uppercase">
                                    Notes
                                    <textarea
                                        value={editForm.notes}
                                        onChange={(event) =>
                                            setEditForm((prev) => ({ ...prev, notes: event.target.value }))
                                        }
                                        className="min-h-28 border-2 border-border bg-card px-3 py-2 text-sm font-semibold outline-none shadow-brutal-inset"
                                    />
                                </label>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingJob(null)}
                                    className="border-2 border-border bg-card px-4 py-3 text-xs font-black uppercase shadow-brutal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={saveEdit}
                                    className="border-2 border-border bg-primary px-4 py-3 text-xs font-black uppercase shadow-brutal disabled:opacity-60"
                                >
                                    {saving ? 'Saving...' : 'Update'}
                                </button>
                            </div>
                        </section>
                    </div>
                )}

                {deletingJob && (
                    <div className="fixed inset-0 z-50 grid place-items-center bg-text/20 p-4 backdrop-blur-sm">
                        <section className="w-full max-w-md border-2 border-border bg-card p-5 text-center shadow-brutal-lg">
                            <h3 className="brand-type text-4xl uppercase leading-none">Delete Job</h3>
                            <p className="mt-3 text-sm font-bold">
                                Delete {deletingJob.companyName} application?
                            </p>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDeletingJob(null)}
                                    className="border-2 border-border bg-card px-4 py-3 text-xs font-black uppercase shadow-brutal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={confirmDelete}
                                    className="border-2 border-border bg-danger px-4 py-3 text-xs font-black uppercase text-bg shadow-brutal disabled:opacity-60"
                                >
                                    {saving ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default JobsList
