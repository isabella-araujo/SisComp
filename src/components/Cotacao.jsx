import { useReducer, useState } from "react";
import './css/requisicao.css'
import Title from "./Title";

export default function Cotacao({ cotacao }) {
    return (
        cotacao && (
        <>
            < div className="container-info" >
                <Title size='1rem'>Fornecedor:</Title>
                <p>{cotacao?.fornecedor}</p>
            </div >
            <div className="container-info">
                <Title size='1rem'>Preço:</Title>
                <p>{cotacao?.preco}</p>
            </div>
            <hr />
        </>
        )
    );
}