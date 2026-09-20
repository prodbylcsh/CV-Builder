function IconButton({ containerClass, onClick, icon, alt, imgClass }) {
    return (
        <button type="button" className={containerClass} onClick={onClick}>
            <img src={icon} alt={alt} className={imgClass} />
        </button>
    )
}

export {
    IconButton,
}