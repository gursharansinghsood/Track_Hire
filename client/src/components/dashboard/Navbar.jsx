import { useEffect, useState } from 'react'
import { FiChevronDown, FiSearch, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../services/api'
import { NAV_ITEMS } from './navItems'

const searchableItems = NAV_ITEMS.filter((item) => item.key !== 'logout')

const normalize = (value) => String(value || '').toLowerCase()

const Navbar = ({ compact = false }) => {
    const [userName, setUserName] = useState('')
    const [applications, setApplications] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const loadNavbarData = async () => {
            try {
                const [meRes, applicationsRes] = await Promise.all([
                    API.get('/auth/me'),
                    API.get('/applications'),
                ])

                if (meRes.data?.success) setUserName(meRes.data.user?.name || '')
                if (applicationsRes.data?.success) setApplications(applicationsRes.data.applications || [])
            } catch {
                setUserName('')
            }
        }

        loadNavbarData()
    }, [])

    const query = search.trim()
    const pageResults = query
        ? searchableItems.filter((item) => normalize(item.label).includes(normalize(query)))
        : []
    const applicationResults = query
        ? applications
            .filter((app) =>
                [app.companyName, app.jobRole, app.location, app.platform]
                    .some((value) => normalize(value).includes(normalize(query))),
            )
            .slice(0, 5)
        : []

    const runSearch = (event) => {
        event.preventDefault()
        if (query) navigate(`/dashboard/jobs?search=${encodeURIComponent(query)}`)
    }

    return (
        <header className="border-b-2 border-border bg-bg px-4 py-4 sm:px-6">
            <div className="flex items-center justify-end gap-6">
                {!compact && (
                <form onSubmit={runSearch} className="relative hidden md:flex items-center gap-2">
                    <div className="shadow-brutal border-2 border-border bg-card flex items-center px-3 py-2 w-[320px]">
                        <FiSearch className="text-xl" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="bg-transparent outline-none w-full px-2"
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </div>
                    {query && (
                        <div className="absolute left-0 top-full z-40 mt-3 w-[360px] border-2 border-border bg-card shadow-brutal-lg">
                            <div className="border-b-2 border-border px-3 py-2 text-xs font-black uppercase">Search Results</div>
                            {[...pageResults.map((item) => ({ type: 'page', label: item.label, href: item.href })),
                                ...applicationResults.map((app) => ({
                                    type: 'application',
                                    label: `${app.companyName} - ${app.jobRole}`,
                                    href: `/dashboard/jobs/${app._id}`,
                                })),
                            ].map((result) => (
                                <Link
                                    key={`${result.type}-${result.href}`}
                                    to={result.href}
                                    onClick={() => setSearch('')}
                                    className="block border-b-2 border-border px-3 py-2 text-sm font-bold last:border-b-0 hover:bg-primary/20"
                                >
                                    <span className="mr-2 text-[10px] font-black uppercase opacity-70">{result.type}</span>
                                    {result.label}
                                </Link>
                            ))}
                            {pageResults.length === 0 && applicationResults.length === 0 && (
                                <button
                                    type="submit"
                                    className="w-full px-3 py-2 text-left text-sm font-bold hover:bg-primary/20"
                                >
                                    Search jobs for "{query}"
                                </button>
                            )}
                        </div>
                    )}
                </form>
                )}

                <div className="hidden sm:flex items-center gap-3">
                    <Link to="/dashboard/profile" className="flex items-center gap-2 hover:text-primary">
                        <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-border bg-primary">
                            <FiUser className="text-xl" />
                        </div>
                        <div className="leading-tight">
                            <p className="text-sm font-black">{userName || 'User'}</p>
                        </div>
                        <FiChevronDown />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar
