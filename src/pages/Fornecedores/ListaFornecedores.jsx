import DataTable from 'react-data-table-component';
import { IoSearch } from "react-icons/io5";

export default function ListaFornecedores({ fornecedores = [], setIdEmEdicao }) {

    const colunas = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: 'Endereço',
            selector: row => row.endereco,
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

    return (
        <>
            <div className="flex flex-row items-center justify-center gap-2">
                <input id='nomeContatoBuscado' className='shadow appearance-none border rounded py-2 px-3 text-gray-700' type="text" placeholder='Buscar'   />
                <IoSearch className='text-xl' />
            </div>
                <DataTable
                    columns={colunas}
                    data={fornecedores}
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
        </>
        
    );
}