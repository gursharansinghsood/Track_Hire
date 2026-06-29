import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import Sidebar from './Sidebar'

const SidebarDrawer = ({ isOpen, onClose, items, activeKey }) => {
    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                className="absolute inset-0 bg-text/20 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close navigation"
            />

            <div className="relative h-full w-[84vw] max-w-[320px] border-r-2 border-border bg-bg">
                <div className="p-3 border-b-2 border-border flex items-center justify-between">
                    <div className="brand-type text-2xl text-text">MENU</div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shadow-brutal grid h-10 w-10 place-items-center border-2 border-border bg-primary"
                        aria-label="Close navigation"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <Sidebar items={items} activeKey={activeKey} />
            </div>
        </div>,
        document.body
    )
}

export default SidebarDrawer

