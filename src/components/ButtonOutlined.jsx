export default function ButtonOutlined({children, ...props }) {
    return (
        <button {...props} className="text-lg px-4 py-2 mx-6 leading-none border rounded text-white border-white hover:border-transparent hover:#6c886c hover:bg-white mt-4 lg:mt-0">{children}</button>
    );
}