export default function ContainerCadastro({children}) {
    return (
        <div style={styles.container}>
            {children}
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: "rgb(245, 245, 245)",
        display: "flex",
        flexDirection: "column",
        margin: "5px 0",
        padding: "10px",
        gap: "5px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(202, 170, 170, 0.06)",
    }
}