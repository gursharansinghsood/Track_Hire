import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'

const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        navigate('/', { replace: true })
    }

    return (
        <DashboardLayout activeKey="logout">
            <div className="mx-auto grid min-h-[65vh] max-w-3xl place-items-center">
                <section className="relative w-full max-w-md border-2 border-border bg-card p-8 text-center shadow-brutal-lg">
                    <div className="absolute -bottom-6 -right-6 h-28 w-28 border-2 border-border bg-success -z-10" />
                    <div className="mx-auto grid h-24 w-24 place-items-center border-2 border-border bg-primary shadow-brutal">
                        <FiLogOut className="text-5xl" />
                    </div>
                    <h2 className="brand-type mt-6 text-5xl uppercase leading-none">Logout</h2>
                    <p className="mx-auto mt-3 max-w-xs text-sm font-bold">
                        Are you sure you want to logout?
                    </p>

                    <div className="mt-8 grid gap-4">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="border-2 border-border bg-primary px-5 py-3 text-sm font-black uppercase shadow-brutal"
                        >
                            Yes, Logout
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="border-2 border-border bg-card px-5 py-3 text-sm font-black uppercase shadow-brutal"
                        >
                            Cancel
                        </button>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}

export default Logout
