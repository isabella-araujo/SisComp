import React, { useState } from 'react'
import Container from '../components/Container'
import Input from '../components/Input'

export default function CadastroCotacao() {
    const [cotacao, setCotacao] = useState({
        preco: '',
        fornecedor: {},
    });
    return (
        <>
            <Container width="90%">
                <Input
                />
            </Container>
        </>
    )
}
