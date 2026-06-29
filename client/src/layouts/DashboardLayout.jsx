import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../components/dashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'
import SidebarDrawer from '../components/dashboard/SidebarDrawer'
import { NAV_ITEMS } from '../components/dashboard/navItems'

const DashboardLayout = ({ children, activeKey = 'home' }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div className="min-h-screen w-full bg-bg text-text">
            <div className="flex w-full">
                {/* Desktop sidebar */}
                <aside className="hidden lg:block w-[250px] shrink-0 border-r-2 border-border">
                    <Sidebar activeKey={activeKey} items={NAV_ITEMS} />
                </aside>

                {/* Mobile drawer + content */}
                <SidebarDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    activeKey={activeKey}
                    items={NAV_ITEMS}
                />

                <main className="flex-1 min-w-0">
                    {/* Mobile topbar */}
                    <div className="lg:hidden border-b-2 border-border bg-bg">
                        <div className="p-3 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setIsDrawerOpen(true)}
                                className="shadow-brutal border-2 border-border bg-primary p-2"
                                aria-label="Open navigation"
                            >
                                <FiMenu className="text-2xl" />
                            </button>

                            <div className="flex-1 px-3">
                                <Navbar compact />
                            </div>

                        </div>
                    </div>

                    {/* Desktop navbar */}
                    <div className="hidden lg:block">
                        <Navbar />
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout

