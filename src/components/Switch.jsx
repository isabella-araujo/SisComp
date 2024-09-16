import React, { useEffect, useState } from 'react'
import { alterarColaborador } from '../pages/infra/colaboradores';

export default function Switch({colaborador}) {
    const [checked, setChecked] = useState(colaborador.bloqueado);

    useEffect(() =>{
        async function bloquearColaborador() {
            await alterarColaborador({...colaborador, bloqueado: checked});
        }

        bloquearColaborador();
    }, [checked]);

    async function handleChange() {
        setChecked(!checked);
    }

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input checked={checked} onChange={handleChange} type="checkbox" className="sr-only peer"/>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:[#6c886c] dark:peer-focus:[#6c886c] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
        </label>

    )
}
