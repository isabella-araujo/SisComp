import React, { useEffect, useState } from 'react'
import Title from '../components/Title';
import IconButton from '../components/IconButton';
import DataTable from 'react-data-table-component';
import { listarColaboradores } from './infra/colaboradores';
import Switch from '../components/Switch';

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let colaboradores = await listarColaboradores();
      setColaboradores(colaboradores);
      console.log(colaboradores);
    }
    fetchData();
  }, []);

  const colunas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    }, 
    {
      name: "Bloquear Acesso",
      cell: row => (
        <div>
          <Switch colaborador={row} />
        </div>
      )
    }
  ];

  const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

  return (
    <div>
      <Title>Colaboradores</Title>
      <DataTable
        columns={colunas}
        data={colaboradores}
        pagination
        paginationPerPage={5}
        dense
        responsive
        striped
        paginationComponentOptions={opcoes}
        noDataComponent="Cadastro Vazio"
      />
    </div>
  )
}
