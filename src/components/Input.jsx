export default function Input(props, { onChange = () => {} }) {

    function handleInputChange(e) {
        // adicionar validação
        onChange(e);
    }

    return (
        <input 
            {...props}
            style={styles.input}
        />
    );
}

const styles = {
    input: {
        display: 'inline-block',
        height: "40px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        padding: "0px 9px",
        border: 'none',
        borderRadius: '1px',
        fontSize: "16px",
    }
}