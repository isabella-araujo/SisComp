export default function Alerta({children}) {
    return (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{children}</span>
        </div>
    );
}