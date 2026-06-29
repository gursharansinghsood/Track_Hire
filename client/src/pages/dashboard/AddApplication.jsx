import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiArrowRight, FiBriefcase, FiCalendar, FiGlobe, FiMapPin } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'
import { API } from '../../services/api'

const initialForm = {
    companyName: '',
    jobRole: '',
    location: '',
    appliedDate: '',
    status: '',
    platform: '',
    notes: '',
}

const fields = [
    { name: 'companyName', label: 'Company Name', placeholder: 'e.g. Google', icon: FiBriefcase, required: true },
    { name: 'jobRole', label: 'Role / Position', placeholder: 'e.g. Software Engineer Intern', icon: FiBriefcase, required: true },
    { name: 'location', label: 'Location', placeholder: 'e.g. Bengaluru', icon: FiMapPin },
    { name: 'appliedDate', label: 'Applied Date', type: 'date', icon: FiCalendar, required: true },
]

const selectFields = [
    { name: 'status', label: 'Status', options: ['Applied', 'Interviewing', 'Offer', 'Rejected'], required: true },
    { name: 'platform', label: 'Source', options: ['LinkedIn', 'Company Website', 'Referral', 'Indeed', 'Other'] },
]

const AddApplication = () => {
    const [formData, setFormData] = useState(initialForm)
    const [isSaving, setIsSaving] = useState(false)

    const updateField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setIsSaving(true)
            const res = await API.post('/applications', formData)

            if (!res.data?.success) {
                toast.error(res.data?.message || 'Failed to save application')
                return
            }

            toast.success('Application saved')
            setFormData(initialForm)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save application')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <DashboardLayout activeKey="jobs">
            <div className="mx-auto max-w-4xl">
                <form onSubmit={handleSubmit} className="border-2 border-border bg-card p-5 shadow-brutal-lg">
                    <div className="mb-5 flex items-center justify-between border-b-2 border-border pb-4">
                        <h2 className="brand-type text-4xl uppercase leading-none sm:text-5xl">Add Application</h2>
                        <div className="hidden border-2 border-border bg-primary px-3 py-2 text-xs font-black uppercase shadow-brutal sm:block">
                            New Job
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {fields.map((field) => {
                            const Icon = field.icon

                            return (
                                <label key={field.name} className="grid gap-1 text-xs font-black uppercase">
                                    {field.label}
                                    <div className="flex items-center gap-2 border-2 border-border bg-card px-3 py-2 shadow-brutal-inset">
                                        <Icon className="text-xl" />
                                        <input
                                            type={field.type || 'text'}
                                            value={formData[field.name]}
                                            onChange={(event) => updateField(field.name, event.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="min-w-0 flex-1 bg-transparent text-sm font-medium normal-case outline-none"
                                        />
                                    </div>
                                </label>
                            )
                        })}

                        {selectFields.map((field) => (
                            <label key={field.name} className="grid gap-1 text-xs font-black uppercase">
                                {field.label}
                                <div className="flex items-center gap-2 border-2 border-border bg-card px-3 py-2 shadow-brutal-inset">
                                    <FiGlobe className="text-xl" />
                                    <select
                                        value={formData[field.name]}
                                        onChange={(event) => updateField(field.name, event.target.value)}
                                        required={field.required}
                                        className="min-w-0 flex-1 bg-transparent text-sm font-medium normal-case outline-none text-black-700"
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                        ))}
                    </div>

                    <label className="mt-4 grid gap-1 text-xs font-black uppercase">
                        Notes
                        <textarea
                            value={formData.notes}
                            onChange={(event) => updateField('notes', event.target.value)}
                            placeholder="Add any additional notes..."
                            className="min-h-32 border-2 border-border bg-card px-3 py-2 text-sm font-medium normal-case outline-none shadow-brutal-inset"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="mt-5 flex w-full items-center justify-center gap-3 border-2 border-border bg-primary px-5 py-3 text-sm font-black uppercase shadow-brutal disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSaving ? 'Saving...' : 'Save Application'}
                        <FiArrowRight className="text-2xl" />
                    </button>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default AddApplication
