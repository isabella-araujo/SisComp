import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { IoSearch } from "react-icons/io5";

export default function ListaContatos({ contatos = [], setIdEmEdicao }) {
    const [nomeBuscado, setNomeBuscado] = useState("");

    const colunas = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Telefone',
            selector: row => row.fone,
        },
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

    function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        console.log(id);
        if(id) {
            setIdEmEdicao(id);
        } else {
            setIdEmEdicao("");
        }
    }

    // function buscarNome() {
    //     if(nomeBuscado !== '') {
    //         return contatos.map((contato) => {
    //             console.log("Nome buscado: " + contato.nome);
    //             if(contato.nome.toUpperCase().indexOf(nomeBuscado.toUpperCase()) !== -1) {
    //                 console.log("Nome encontrado");
    //                 return (
    //                     <DataTable
    //                         columns={colunas}
    //                         data={contato}
    //                         pagination
    //                         paginationPerPage={5}
    //                         dense
    //                         responsive
    //                         striped
    //                         paginationComponentOptions={opcoes}
    //                         noDataComponent="Cadastro Vazio"
    //                         defaultSortFieldId={1}
    //                         selectableRows
    //                         selectableRowsHighlight
    //                         selectableRowsSingle
    //                         onSelectedRowsChange={handleChange}
    //                     />
    //                 );
    //             } 
    //         });
    //     }
    // }

    return (
        <>
            <div className="flex flex-row items-center justify-center gap-2">
                {/* onChange={(e) => setNomeBuscado(e.target.value)} */}
                <input id='nomeContatoBuscado' className='shadow appearance-none border rounded py-2 px-3 text-gray-700' type="text" placeholder='Buscar'   />
                <IoSearch className='text-xl' />
            </div>
            { nomeBuscado === '' && 
                <DataTable
                    columns={colunas}
                    data={contatos}
                    pagination
                    paginationPerPage={5}
                    dense
                    responsive
                    striped
                    paginationComponentOptions={opcoes}
                    noDataComponent="Cadastro Vazio"
                    defaultSortFieldId={1}
                    selectableRows
                    selectableRowsHighlight
                    selectableRowsSingle
                    onSelectedRowsChange={handleChange}
                />
            } 
            {/* { nomeBuscado !== '' &&
                {buscarNome}
            } */}
        </>
        
    );
}
