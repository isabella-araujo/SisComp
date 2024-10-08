import { IoSearch } from "react-icons/io5";

export default function Search() {
    return(
        <div className="flex flex-row items-center justify-center gap-2">
            <input id='nomeContatoBuscado' className='shadow appearance-none border rounded py-2 px-3 text-gray-700' type="text" placeholder='Buscar'  />
            <IoSearch className='text-xl' onClick={handleClick} />
        </div>
    );
}