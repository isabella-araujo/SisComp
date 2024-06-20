import DataTable from 'react-data-table-component';
import { IoSearch } from "react-icons/io5";

export default function ListaCotacoes({ cotacoes = [], setIdEmEdicao }) {

    const colunas = [
        {
            name: 'Produto',
            selector: row => row.produto,
            sortable: true,
        },
        {
            name: 'Preço',
            selector: row => row.preco,
        },
        {
            name: 'Data da Compra',
            selector: row => row.dataCompra,
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
                <DataTable
                    columns={colunas}
                    data={cotacoes}
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