const BrutalCard = ({ children, className, ...props }) => {
    return (
        <div className={`${className} shadow-brutal border-2 border-border py-1 px-2`} {...props}>{children}</div>
    )
}

export default BrutalCard

