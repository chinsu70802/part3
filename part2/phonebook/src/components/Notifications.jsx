const Notifications = ({message,notifStyle}) => {
    if(message === null) {
        return null
    }
    else {
        return (
            <div style={notifStyle}>
                {message}
            </div>
        )
    }
}

export default Notifications