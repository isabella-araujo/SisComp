import DataTable from 'react-data-table-component';
import { excluirProduto } from './infra/produtos';
import IconButton from '../../components/IconButton';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function ListaProdutos({ produtos = [], setIdEmEdicao }) {

    async function handleExcluir(row) {
        const id = row.id;
        console.log(id);
        await excluirProduto(id);
    }

    async function handleEditar(row) {
        const id = row.id;
        console.log(id);
        setIdEmEdicao(id);
    }

    const colunas = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: "",
            cell: row => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <IconButton onClick={() => handleExcluir(row)}>
                        <FaTrash /> 
                    </IconButton>
                    <IconButton onClick={() => handleEditar(row)}>
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
                    data={produtos}
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