import { NavLink } from 'react-router-dom'

const Sidebar = ({ items, activeKey }) => {
    return (
        <div className="min-h-screen bg-card">
            <div className="p-4 border-b-2 border-border">
                <div className="shadow-brutal border-2 border-border bg-primary w-24 p-2 text-center">
                    <p className="brand-type text-xl leading-none">TRACK</p>
                    <p className="brand-type text-xl leading-none">HIRE</p>
                </div>
            </div>

            <nav className="flex flex-col py-4">
                {items.map((it) => (
                    <NavLink
                        key={it.key}
                        to={it.href}
                        className={() =>
                            `flex items-center gap-3 border-y-2 border-transparent px-4 py-3 text-xs font-black uppercase ` +
                            (it.key === activeKey
                                ? 'bg-primary border-border text-text'
                                : 'bg-card text-text hover:bg-primary/20')
                        }
                    >
                        <it.icon className="text-xl shrink-0" />
                        {it.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar

