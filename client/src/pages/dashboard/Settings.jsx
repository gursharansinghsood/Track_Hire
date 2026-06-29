import { useState } from 'react'
import toast from 'react-hot-toast'
import ModulePage from '../../components/dashboard/ModulePage'
import DashboardLayout from '../../layouts/DashboardLayout'
import { API } from '../../services/api'

const passwordInitialState = {
    currentPassword: '',
    newPassword: '',
}

const Settings = () => {
    const [dialog, setDialog] = useState(null)
    const [passwordForm, setPasswordForm] = useState(passwordInitialState)
    const [isSaving, setIsSaving] = useState(false)

    const toggleTheme = () => {
        const root = document.documentElement
        const nextTheme = root.classList.contains('dark') ? 'light' : 'dark'

        root.classList.toggle('dark', nextTheme === 'dark')
        localStorage.setItem('theme', nextTheme)
        toast.success(`Theme: ${nextTheme}`)
    }

    const changePassword = async (event) => {
        event.preventDefault()

        try {
            setIsSaving(true)
            const res = await API.patch('/auth/password', passwordForm)

            if (!res.data?.success) {
                toast.error(res.data?.message || 'Failed to change password')
                return
            }

            toast.success(res.data.message || 'Password changed successfully')
            setPasswordForm(passwordInitialState)
            setDialog(null)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password')
        } finally {
            setIsSaving(false)
        }
    }

    const deleteAccount = async () => {
        try {
            setIsSaving(true)
            const res = await API.delete('/auth/me')

            if (!res.data?.success) {
                toast.error(res.data?.message || 'Failed to delete account')
                return
            }

            toast.success(res.data.message || 'Account deleted successfully')
            localStorage.removeItem('accessToken')
            window.location.href = '/'
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete account')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <DashboardLayout activeKey="settings">
            <ModulePage
                title="Settings"
                activeKey="Account Settings"
                accent="bg-primary"
                items={[
                    {
                        title: 'Dark mode',
                        meta: 'Neo-brutalist reference theme stays consistent',
                        badge: 'Theme',
                        tone: 'bg-primary',
                        onClick: toggleTheme,
                    },
                    {
                        title: 'Password change',
                        meta: 'Update account password securely',
                        badge: 'Security',
                        tone: 'bg-card',
                        onClick: () => setDialog('password'),
                    },
                    {
                        title: 'Delete account',
                        meta: 'Permanent account removal',
                        badge: 'Danger',
                        tone: 'bg-danger text-bg',
                        onClick: () => setDialog('delete'),
                    },
                ]}
                actions={[]}
            />

            {dialog === 'password' && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-text/20 p-4 backdrop-blur-sm">
                    <form onSubmit={changePassword} className="w-full max-w-md border-2 border-border bg-card p-5 shadow-brutal-lg">
                        <h3 className="brand-type mb-4 text-4xl uppercase leading-none">Password</h3>
                        <label className="grid gap-1 text-xs font-black uppercase">
                            Current Password
                            <input
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))}
                                className="border-2 border-border bg-card px-3 py-2 text-sm font-semibold outline-none shadow-brutal-inset"
                                required
                            />
                        </label>
                        <label className="mt-3 grid gap-1 text-xs font-black uppercase">
                            New Password
                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))}
                                className="border-2 border-border bg-card px-3 py-2 text-sm font-semibold outline-none shadow-brutal-inset"
                                required
                            />
                        </label>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setDialog(null)}
                                className="cursor-pointer border-2 border-border bg-card px-4 py-3 text-xs font-black uppercase shadow-brutal"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="cursor-pointer border-2 border-border bg-primary px-4 py-3 text-xs font-black uppercase shadow-brutal disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSaving ? 'Saving...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {dialog === 'delete' && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-text/20 p-4 backdrop-blur-sm">
                    <section className="w-full max-w-md border-2 border-border bg-card p-5 text-center shadow-brutal-lg">
                        <h3 className="brand-type text-4xl uppercase leading-none">Delete Account</h3>
                        <p className="mt-3 text-sm font-bold">This will permanently remove your account and applications.</p>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setDialog(null)}
                                className="cursor-pointer border-2 border-border bg-card px-4 py-3 text-xs font-black uppercase shadow-brutal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={deleteAccount}
                                className="cursor-pointer border-2 border-border bg-danger px-4 py-3 text-xs font-black uppercase text-bg shadow-brutal disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSaving ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </DashboardLayout>
    )
}

export default Settings
