import "../styles/styles.css";

function Notification(props) {
    return (
        <>
            {
                props.message ? (
                    <div className="error">
                        {props.message}
                    </div>
                ) : (
                    null
                )
            }
        </>
    );
}

export default Notification;