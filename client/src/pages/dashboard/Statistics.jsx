import { useEffect, useState } from 'react'
import {
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import toast from 'react-hot-toast'
import DashboardLayout from '../../layouts/DashboardLayout'
import { DashboardAPI } from '../../services/dashboardApi'


const axisProps = {
    tick: { fill: 'var(--text)', fontSize: 11, fontWeight: 800 },
    axisLine: { stroke: 'var(--border)', strokeWidth: 2 },
    tickLine: { stroke: 'var(--border)', strokeWidth: 2 },
}

const ChartPanel = ({ title, children }) => (
    <section className="border-2 border-border bg-card p-4 shadow-brutal">
        <h3 className="mb-3 text-sm font-black uppercase">{title}</h3>
        <div className="h-64">{children}</div>
    </section>
)

const toneByStatus = {
    Applied: 'var(--success)',
    Interviewing: 'var(--secondary)',
    Offer: 'var(--primary)',
    Rejected: 'var(--danger)',
}

const Statistics = () => {
    const [loading, setLoading] = useState(true)
    const [charts, setCharts] = useState(null)

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true)
                const [summaryRes, chartsRes] = await Promise.all([
                    DashboardAPI.getSummary(),
                    DashboardAPI.getCharts(),
                ])

                if (!summaryRes.data?.success) throw new Error('Failed to load summary')
                if (!chartsRes.data?.success) throw new Error('Failed to load charts')

                setCharts(chartsRes.data.charts || null)
            } catch (e) {
                toast.error(e?.response?.data?.message || e.message || 'Failed to load statistics')
            } finally {
                setLoading(false)
            }
        }

        fetchAll()
    }, [])

    

    const monthly = charts?.monthly || []
    const statusDistribution = charts?.statusDistribution || []
    const topCompanies = charts?.topCompanies || []
    const bySource = charts?.bySource || []

    return (
        <DashboardLayout activeKey="analytics">
            <div className="mx-auto max-w-7xl">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <h2 className="brand-type text-4xl uppercase leading-none sm:text-5xl">
                        Statistics
                    </h2>
                </div>

                {loading ? (
                    <div className="py-10 text-center text-sm font-black uppercase">
                        Loading...
                    </div>
                ) : (
                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        <ChartPanel title="Applications Over Time">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthly} margin={{ top: 12, right: 16, bottom: 0, left: -20 }}>
                                    <XAxis dataKey="date" {...axisProps} />
                                    <YAxis {...axisProps} />
                                    <Tooltip contentStyle={{ border: '2px solid var(--border)', boxShadow: 'var(--shadow-brutal)' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="applications"
                                        stroke="var(--success)"
                                        strokeWidth={4}
                                        dot={{ r: 5, fill: 'var(--primary)', stroke: 'var(--border)', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartPanel>

                        <ChartPanel title="Status Distribution">
                            <div className="grid h-full grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_0.8fr]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={statusDistribution} dataKey="value" innerRadius={50} outerRadius={86} stroke="var(--border)" strokeWidth={2}>
                                            {statusDistribution.map((entry) => (
                                                <Cell key={entry.name} fill={toneByStatus[entry.name] || 'var(--primary)'} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ border: '2px solid var(--border)', boxShadow: 'var(--shadow-brutal)' }} />
                                    </PieChart>
                                </ResponsiveContainer>

                                <div className="space-y-2">
                                    {statusDistribution.length === 0 ? (
                                        <p className="text-xs font-black uppercase">No status data</p>
                                    ) : (
                                        statusDistribution.map((item) => (
                                            <div key={item.name} className="flex items-center justify-between gap-3 text-xs font-black uppercase">
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="h-4 w-4 border-2 border-border"
                                                        style={{ background: toneByStatus[item.name] || 'var(--primary)' }}
                                                    />
                                                    {item.name}
                                                </span>
                                                <span>{item.value}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </ChartPanel>

                        <ChartPanel title="Top Companies">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topCompanies} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 16 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="company" type="category" width={90} {...axisProps} />
                                    <Tooltip contentStyle={{ border: '2px solid var(--border)', boxShadow: 'var(--shadow-brutal)' }} />
                                    <Bar dataKey="count" fill="var(--success)" stroke="var(--border)" strokeWidth={2} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartPanel>

                        <ChartPanel title="Applications By Source">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={bySource} margin={{ top: 12, right: 16, bottom: 0, left: -20 }}>
                                    <XAxis dataKey="source" {...axisProps} />
                                    <YAxis {...axisProps} />
                                    <Tooltip contentStyle={{ border: '2px solid var(--border)', boxShadow: 'var(--shadow-brutal)' }} />
                                    <Bar dataKey="count" fill="var(--primary)" stroke="var(--border)" strokeWidth={2} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartPanel>

                    </section>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Statistics

