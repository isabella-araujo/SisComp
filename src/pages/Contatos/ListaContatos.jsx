import DataTable from 'react-data-table-component';
import { excluirContato } from './infra/contatos';
import IconButton from '../../components/IconButton';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function ListaContatos({ contatos = [], setIdEmEdicao }) {

    async function handleExcluir(row) {
        const id = row.id;
        console.log(id);
        await excluirContato(id);
    }

    async function handleEditar(row) {
        const id = row.id;
        console.log(id);
        setIdEmEdicao(id);
    }

    const colunas = [
        {
            name: 'Nome',
            selector: row => row.fornecedor,
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
                data={contatos}
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
