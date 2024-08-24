export default function Title({children, size, color}) {
    const styles = {
        title: {
        
            fontSize: size ? `${size}` : '2rem',
            textAlign: 'center',
            fontWeight: 'bold',
            color: color ? `${color}` : '#4a5568',
        }
    }
    
    return <h3 style={styles.title}>{children}</h3>
}
