export default function IconButton({children, size, ...props}) {
    const styles = {
        iconButton: {
            width: size ? size : "40px",
            height: size ? size : "40px",
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
    
    return (
        <div {...props} style={styles.iconButton}>
            {children}
        </div>
    )
}