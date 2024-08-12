export default function Alerta({children}) {
    return (
        <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{children}</span>
        </div>
    );
}