export default function Button({ children, size, onClick = () => {}, ...config }) {
    const styles = {
        button: {
            margin: '0 auto',
            width: size ?  size : '100%',
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

    return (
        <button {...config} onClick={onClick} style={styles.button}>
            {children}
        </button>
    );
}