export default function Button({ children, onClick = () => {}, ...config }) {
    return (
        <button {...config} onClick={onClick} style={styles.button}>
            {children}
        </button>
    );
}

const styles = {
    button: {
        backgroundColor: '#6c886c', 
        border: 'none', 
        color: 'white', 
        textAlign: 'center', 
        textDecoration: 'none',
        fontSize: '16px', 
        borderRadius: '1px', 
        cursor: 'pointer',
    }
}