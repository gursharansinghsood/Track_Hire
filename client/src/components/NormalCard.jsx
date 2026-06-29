const NormalCard = ({ children, className, ...props }) => {
    return (
        <div className={`${className} border-2 border-border py-1 px-2`} {...props}>{children}</div>
    )
}

export default NormalCard
