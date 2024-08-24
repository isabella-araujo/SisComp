export default function Avatar({img}) {
    return (
        <img style={styles.avatar} className="rounded-full m-4"  src={img} />

    );
}

const styles = {
    avatar: {
        width: '100px',
    }
}