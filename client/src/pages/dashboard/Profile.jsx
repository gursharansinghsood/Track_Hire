import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiEdit3, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'
import { API } from '../../services/api'

const emptyProfile = {
    name: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    skills: '',
}

const safeValue = (value) => {
    const text = String(value ?? '').trim()
    return text || '-'
}

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState(null)
    const [form, setForm] = useState(emptyProfile)

    useEffect(() => {
        const fetchMe = async () => {
            try {
                setLoading(true)
                const res = await API.get('/auth/me')
                if (!res.data?.success) throw new Error(res.data?.message || 'Failed to load profile')

                setUser(res.data.user || null)
            } catch (error) {
                toast.error(error?.response?.data?.message || error.message || 'Failed to load profile')
            } finally {
                setLoading(false)
            }
        }

        fetchMe()
    }, [])

    const openEdit = () => {
        setForm({
            name: user?.name || '',
            phone: user?.phone || '',
            location: user?.location || '',
            github: user?.github || '',
            linkedin: user?.linkedin || '',
            skills: Array.isArray(user?.skills) ? user.skills.join(', ') : '',
        })
        setIsEditing(true)
    }

    const updateField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const saveProfile = async (event) => {
        event.preventDefault()

        try {
            setSaving(true)
            const res = await API.patch('/auth/profile', form)

            if (!res.data?.success) {
                toast.error(res.data?.message || 'Failed to update profile')
                return
            }

            setUser((prev) => ({ ...prev, ...res.data.user }))
            toast.success(res.data.message || 'Profile updated')
            setIsEditing(false)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    const skills = Array.isArray(user?.skills) ? user.skills : []
    const accountRows = [
        ['Full Name', safeValue(user?.name)],
        ['Email', safeValue(user?.email)],
        ['Phone', safeValue(user?.phone)],
        ['Location', safeValue(user?.location)],
        ['Member Since', safeValue(user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '')],
        ['Total Applications', safeValue(user?.totalApplications)],
    ]

    return (
        <DashboardLayout activeKey="profile">
            <div className="mx-auto max-w-4xl">
                <section className="border-2 border-border bg-card shadow-brutal-lg">
                    <div className="flex items-center justify-between gap-3 border-b-2 border-border p-5">
                        <h2 className="brand-type text-4xl uppercase leading-none sm:text-5xl">Profile</h2>
                        <button
                            type="button"
                            onClick={openEdit}
                            disabled={loading}
                            className="flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 text-xs font-black uppercase shadow-brutal disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Edit
                            <FiEdit3 />
                        </button>
                    </div>

                    <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="border-b-2 border-border p-5 lg:border-b-0 lg:border-r-2">
                            <div className="flex items-center gap-4">
                                <div className="grid h-28 w-28 place-items-center border-2 border-border bg-success shadow-brutal">
                                    <FiUser className="text-6xl" />
                                </div>
                                <div>
                                    <p className="text-xl font-black">{loading ? '-' : safeValue(user?.name)}</p>
                                    <p className="text-sm font-semibold">{loading ? '-' : safeValue(user?.email)}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 text-sm">
                                <p className="flex items-center gap-2 font-bold"><FiMail /> {loading ? '-' : safeValue(user?.email)}</p>
                                <p className="flex items-center gap-2 font-bold"><FiPhone /> {loading ? '-' : safeValue(user?.phone)}</p>
                                <p className="flex items-center gap-2 font-bold"><FiMapPin /> {loading ? '-' : safeValue(user?.location)}</p>
                                <p className="flex items-center gap-2 font-bold"><FiGithub /> {loading ? '-' : safeValue(user?.github)}</p>
                                <p className="flex items-center gap-2 font-bold"><FiLinkedin /> {loading ? '-' : safeValue(user?.linkedin)}</p>
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="mb-3 text-sm font-black uppercase">Account Details</h3>
                            <div className="border-2 border-border">
                                {accountRows.map(([label, value]) => (
                                    <div key={label} className="flex items-center justify-between gap-4 border-b-2 border-border px-4 py-3 text-sm last:border-b-0">
                                        <span className="font-black uppercase">{label}</span>
                                        <span className="text-right font-semibold">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mb-3 mt-5 text-sm font-black uppercase">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.length ? skills.map((skill) => (
                                    <span key={skill} className="border-2 border-border bg-primary px-3 py-1 text-xs font-black uppercase shadow-brutal">
                                        {skill}
                                    </span>
                                )) : <p className="text-sm font-semibold">No skills added.</p>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-text/20 p-4 backdrop-blur-sm">
                    <form onSubmit={saveProfile} className="w-full max-w-lg border-2 border-border bg-card p-5 shadow-brutal-lg">
                        <h3 className="brand-type mb-4 text-4xl uppercase leading-none">Edit Profile</h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                ['name', 'Full Name'],
                                ['phone', 'Phone'],
                                ['location', 'Location'],
                                ['github', 'Github'],
                                ['linkedin', 'Linkedin'],
                                ['skills', 'Skills'],
                            ].map(([name, label]) => (
                                <label key={name} className="grid gap-1 text-xs font-black uppercase">
                                    {label}
                                    <input
                                        value={form[name]}
                                        onChange={(event) => updateField(name, event.target.value)}
                                        placeholder={name === 'skills' ? 'React, Node, MongoDB' : ''}
                                        className="border-2 border-border bg-card px-3 py-2 text-sm font-semibold normal-case outline-none shadow-brutal-inset"
                                        required={name === 'name'}
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="border-2 border-border bg-card px-4 py-3 text-xs font-black uppercase shadow-brutal"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="border-2 border-border bg-primary px-4 py-3 text-xs font-black uppercase shadow-brutal disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </DashboardLayout>
    )
}

export default Profile
