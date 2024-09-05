export default function Container({children, width, ...props}) {
    const styles = {
        container: {
            backgroundColor: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            padding: "15px",
            width: width ? `${width}` : 'auto',
            gap: "5px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }
    }

    return (
        <div style={styles.container} {...props}>
            {children}
        </div>
    )
}