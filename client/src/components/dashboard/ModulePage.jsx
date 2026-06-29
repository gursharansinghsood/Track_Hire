import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ModulePage = ({ title, activeKey, accent = 'bg-primary', items = [], actions = [] }) => {
    const hasActions = actions.length > 0

    return (
        <div className="mx-auto max-w-6xl">
            <section className="relative mb-6 border-2 border-border bg-card p-5 shadow-brutal-lg">
                <div className={`absolute right-0 top-0 h-full w-4 border-l-2 border-border ${accent}`} />
                <h2 className="brand-type text-4xl uppercase leading-none sm:text-5xl">{title}</h2>
            </section>

            <section className={`grid grid-cols-1 gap-5 ${hasActions ? 'lg:grid-cols-[1.2fr_0.8fr]' : ''}`}>
                <div className="border-2 border-border bg-card shadow-brutal-lg">
                    <div className="border-b-2 border-border p-4">
                        <h3 className="text-sm font-black uppercase">{activeKey}</h3>
                    </div>
                    <div className="divide-y-2 divide-border">
                        {items.map((item) => {
                            const ItemTag = item.onClick ? 'button' : 'article'

                            return (
                            <ItemTag
                                key={item.title}
                                type={item.onClick ? 'button' : undefined}
                                onClick={item.onClick}
                                className={`w-full p-4 text-left ${item.onClick ? 'cursor-pointer hover:bg-primary/10' : ''}`}
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="font-black">{item.title}</p>
                                        <p className="text-sm font-semibold opacity-80">{item.meta}</p>
                                    </div>
                                    <span className={`w-fit border-2 border-border px-3 py-1 text-xs font-black uppercase shadow-brutal ${item.tone || 'bg-primary'}`}>
                                        {item.badge}
                                    </span>
                                </div>
                            </ItemTag>
                            )
                        })}
                    </div>
                </div>

                {hasActions && (
                <aside className="border-2 border-border bg-card p-4 shadow-brutal-lg">
                    <h3 className="mb-4 text-sm font-black uppercase">Quick Actions</h3>
                    <div className="grid gap-3">
                        {actions.map((action) => {
                            const Icon = action.icon
                            const actionClass = `flex cursor-pointer items-center justify-between border-2 border-border px-4 py-3 text-sm font-black uppercase shadow-brutal ${action.tone || 'bg-primary'}`

                            if (action.href) {
                                return (
                                    <Link key={action.label} to={action.href} className={actionClass}>
                                        {action.label}
                                        {Icon && <Icon className="text-2xl" />}
                                    </Link>
                                )
                            }

                            return (
                                <button
                                    key={action.label}
                                    type="button"
                                    className={actionClass}
                                    onClick={() => {
                                        // Quick wiring for Settings actions
                                        if (action.label === 'Toggle Theme') {
                                            const root = document.documentElement
                                            const next = root.classList.contains('dark') ? 'light' : 'dark'
                                            if (next === 'dark') root.classList.add('dark')
                                            else root.classList.remove('dark')
                                            localStorage.setItem('theme', next)
                                            toast.success(`Theme: ${next}`)
                                            return
                                        }

                                        if (typeof action.onClick === 'function') return action.onClick()
                                        toast('Action not wired yet')
                                    }}
                                >
                                    {action.label}
                                    {Icon && <Icon className="text-2xl" />}
                                </button>
                            )
                        })}
                    </div>
                </aside>
                )}
            </section>
        </div>
    )
}

export default ModulePage
