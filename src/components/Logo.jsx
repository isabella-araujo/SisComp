import { FaCartShopping } from "react-icons/fa6";

export default function Logo() {
    return (
        <div style={styles.containerLogo}>
            <FaCartShopping className="text-4xl" />
            <span className="font-semibold text-3xl tracking-tight">ACME</span>
        </div>
    )
}

const styles = {
    containerLogo: {
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "18px",
    }
}