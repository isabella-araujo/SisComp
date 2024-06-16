import imagem from './midia/img.png';
import { FaCartShopping } from "react-icons/fa6";

export default function Login() {
    return(
        <div className='flex h-screen'>
            <div className="bg-green-700 flex flex-col items-center w-1/2">
                <img className='w-4/5' src={imagem} />
                <p>Fonte: <a className='text-green-800' href="https://storyset.com/people">Storyset</a></p>
            </div>
            <div className="w-1/2 flex justify-center items-center flex-col">
                <div className="text-green-500 flex flex-row">
                    <FaCartShopping className="text-4xl" />
                    <span class="font-semibold text-3xl tracking-tight">ACME</span>
                </div>
                <form className="bg-white rounded px-8 pt-6 pb-8 w-2/4">
                    <div className="mb-4">
                        <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                        >
                        Username
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                        >
                        Password
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        >
                        Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}