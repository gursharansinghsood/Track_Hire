import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiBriefcase, FiCalendar, FiFileText, FiMapPin } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'
import { API } from '../../services/api'
import { formatDate, statusClass } from '../../utils/dashboardData'


const DetailBlock = ({ title, children }) => (
    <section className="border-2 border-border bg-card p-4 shadow-brutal">
        <h3 className="mb-3 text-sm font-black uppercase">{title}</h3>
        {children}
    </section>
)

const DetailRow = ({ label, value }) => (
    <div className="flex items-start justify-between gap-4 border-b-2 border-border py-3 text-sm last:border-b-0">
        <span className="font-black uppercase">{label}</span>
        <span className="max-w-[60%] text-right font-semibold">{value || 'Not added'}</span>
    </div>
)

const JobDetails = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true)
                const res = await API.get(`/applications/${id}`)
                if (res.data?.success) setJob(res.data.application)
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load job details')
                setJob(null)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchJob()
    }, [id])


    return (
        <DashboardLayout activeKey="jobs">
            <div className="mx-auto max-w-6xl">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link to="/dashboard/jobs" className="flex w-fit items-center gap-2 border-2 border-border bg-card px-4 py-2 text-xs font-black uppercase shadow-brutal">
                        <FiArrowLeft />
                        Back To Jobs
                    </Link>
                    {job?.status && (
                        <span className={`w-fit border-2 border-border px-3 py-2 text-xs font-black uppercase shadow-brutal ${statusClass[job.status] || 'bg-primary'}`}>
                            {job.status}
                        </span>
                    )}
                </div>

                <section className="relative mb-6 border-2 border-border bg-card p-5 shadow-brutal-lg">
                    <div className="absolute right-0 top-0 h-full w-4 border-l-2 border-border bg-success" />
                    {loading ? (
                        <p className="text-sm font-black uppercase">Loading details...</p>
                    ) : (
                        <>
                            <p className="text-sm font-black uppercase">{job?.companyName || 'Application'}</p>
                            <h2 className="brand-type mt-1 text-4xl uppercase leading-none sm:text-5xl">{job?.jobRole || 'Job Details'}</h2>
                        </>
                    )}
                </section>

                <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-6">
                        <DetailBlock title="Company Information">
                            <DetailRow label="Company" value={job?.companyName} />
                            <DetailRow label="Role" value={job?.jobRole} />
                            <DetailRow label="Location" value={job?.location} />
                        </DetailBlock>

                        <DetailBlock title="Application Notes">
                            <p className="text-sm font-semibold leading-6">
                                {job?.notes || 'No application notes added yet.'}
                            </p>
                        </DetailBlock>
                    </div>

                    <div className="grid gap-6">
                        <DetailBlock title="Timeline">
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="grid h-10 w-10 place-items-center border-2 border-border bg-primary shadow-brutal">
                                        <FiFileText />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase">Application Added</p>
                                        <p className="text-sm font-semibold">{formatDate(job?.appliedDate || job?.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="grid h-10 w-10 place-items-center border-2 border-border bg-secondary text-bg shadow-brutal">
                                        <FiBriefcase />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase">Current Status</p>
                                        <p className="text-sm font-semibold">{job?.status || 'Not added'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="grid h-10 w-10 place-items-center border-2 border-border bg-success shadow-brutal">
                                        <FiCalendar />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase">Interview Schedule</p>
                                        <p className="text-sm font-semibold">No interview scheduled</p>
                                    </div>
                                </div>
                            </div>
                        </DetailBlock>

                        <DetailBlock title="Resume Used">
                            <p className="flex items-center gap-2 text-sm font-bold">
                                <FiFileText />
                                Frontend Resume.pdf
                            </p>
                        </DetailBlock>

                        <DetailBlock title="Cover Letter Used">
                            <p className="flex items-center gap-2 text-sm font-bold">
                                <FiFileText />
                                {job?.companyName ? `${job.companyName} Cover Letter` : 'Not selected'}
                            </p>
                        </DetailBlock>

                        <DetailBlock title="Source">
                            <p className="flex items-center gap-2 text-sm font-bold">
                                <FiMapPin />
                                {job?.platform || 'Not added'}
                            </p>
                        </DetailBlock>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}

export default JobDetails
