import { FiBriefcase, FiCheckSquare, FiFileText, FiX } from 'react-icons/fi'

export const statMeta = [
    { key: 'total', label: 'Total Applications', icon: FiFileText, tone: 'bg-success' },
    { key: 'interviews', label: 'Interviews', icon: FiBriefcase, tone: 'bg-secondary text-bg' },
    { key: 'offers', label: 'Offers', icon: FiCheckSquare, tone: 'bg-primary' },
    { key: 'rejected', label: 'Rejections', icon: FiX, tone: 'bg-danger text-bg' },
]

export const statusClass = {
    Applied: 'bg-success',
    Interviewing: 'bg-secondary text-bg',
    Offer: 'bg-primary',
    Rejected: 'bg-danger text-bg',
}

export const formatDate = (date) => {
    if (!date) return ''

    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) return date

    return parsed.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

export const getApplicationStats = (applications) => {
    const normalized = applications.map((item) => item.status)

    return {
        total: applications.length,
        interviews: normalized.filter((status) => status === 'Interviewing').length,
        offers: normalized.filter((status) => status === 'Offer').length,
        rejected: normalized.filter((status) => status === 'Rejected').length,
    }
}
