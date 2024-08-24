import DataTable from 'react-data-table-component';
import { excluirCotacao } from './infra/cotacoes';
import IconButton from '../../components/IconButton';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function ListaCotacoes({ cotacoes = [], setIdEmEdicao }) {

    async function handleExcluir(row) {
        const id = row.id;
        console.log(id);
        await excluirCotacao(id);
    }

    async function handleEditar(row) {
        const id = row.id;
        console.log(id);
        setIdEmEdicao(id);
    }

    const colunas = [
        {
            name: 'Produto',
            selector: row => row.produto,
            sortable: true,
        },
        {
            name: 'Fornecedor',
            selector: row => row.fornecedor,
            sortable: true
        },
        {
            name: 'Preço',
            selector: row => row.preco,
        },
        {
            name: 'Data da Compra',
            selector: row => row.dataCompra,
        },
        {
            name: "",
            cell: row => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <IconButton size='30px' onClick={() => handleExcluir(row)}>
                        <FaTrash /> 
                    </IconButton>
                    <IconButton size='30px' onClick={() => handleEditar(row)}>
                        <FaPen />
                    </IconButton>
                </div>
            )
        }
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

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
            />
        </>
        
    );
}