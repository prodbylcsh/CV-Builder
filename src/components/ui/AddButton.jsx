import plusIcon from "../../assets/plus-icon.svg"

function AddButton(props) {
    return (
        <button
            type="button"
            className={props.className + " " + "add-button"}
            onClick={props.onClick}
        >
            <div className="plus-icon-container">
                <img src={plusIcon} alt="Plus icon" className="plus-icon" />
            </div>
            <span>{props.title}</span>
        </button>
    )
}

export {
    AddButton,
}