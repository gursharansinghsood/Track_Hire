import { FiCopy, FiEdit3, FiFileText, FiPlusSquare, FiTrash2 } from 'react-icons/fi'
import ModulePage from '../../components/dashboard/ModulePage'
import DashboardLayout from '../../layouts/DashboardLayout'

const CoverLetters = () => (
    <DashboardLayout activeKey="letters">
        <ModulePage
            title="Cover Letters"
            activeKey="Letter Manager"
            accent="bg-primary"
            items={[
                { title: 'Frontend Developer Letter', meta: 'Used for Adobe and Amazon', badge: 'Reusable', tone: 'bg-success' },
                { title: 'SDE Intern Letter', meta: 'Used for Google application', badge: 'Sent', tone: 'bg-secondary text-bg' },
                { title: 'General Software Letter', meta: 'Template for quick applications', badge: 'Template', tone: 'bg-primary' },
            ]}
            actions={[
                { label: 'Create Letter', icon: FiPlusSquare, tone: 'bg-primary' },
                { label: 'Edit Letter', icon: FiEdit3, tone: 'bg-card' },
                { label: 'Duplicate', icon: FiCopy, tone: 'bg-card' },
                { label: 'Reuse', icon: FiFileText, tone: 'bg-card' },
                { label: 'Delete', icon: FiTrash2, tone: 'bg-danger text-bg' },
            ]}
        />
    </DashboardLayout>
)

export default CoverLetters
