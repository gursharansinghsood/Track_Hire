import { FiBell, FiCheckSquare, FiMail } from 'react-icons/fi'
import ModulePage from '../../components/dashboard/ModulePage'
import DashboardLayout from '../../layouts/DashboardLayout'

const Notifications = () => (
    <DashboardLayout activeKey="notifications">
        <ModulePage
            title="Notifications"
            activeKey="Recent Alerts"
            accent="bg-success"
            items={[
                { title: 'Interview reminder', meta: 'Google interview starts today at 03:30 PM', badge: 'Today', tone: 'bg-secondary text-bg' },
                { title: 'Application reminder', meta: 'Follow up with Microsoft tomorrow', badge: 'Reminder', tone: 'bg-primary' },
                { title: 'Offer notification', meta: 'Adobe profile moved to final review', badge: 'Offer', tone: 'bg-success' },
                { title: 'Email notification', meta: 'Weekly application summary is ready', badge: 'Email', tone: 'bg-card' },
            ]}
            actions={[
                { label: 'Mark All Read', icon: FiCheckSquare, tone: 'bg-primary' },
                { label: 'Email Alerts', icon: FiMail, tone: 'bg-card' },
                { label: 'Reminder Settings', icon: FiBell, tone: 'bg-card' },
            ]}
        />
    </DashboardLayout>
)

export default Notifications
