export default function IconButton({children, ...props}) {
    return (
        <div {...props} style={styles.iconButton}>
            {children}
        </div>
    )
}

const styles = {
    iconButton: {
        width: "40px",
        height: "40px",
        backgroundColor: '#6c886c', 
        border: 'none', 
        color: 'white', 
        fontSize: '16px',
        borderRadius: '2px', 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}