import { useState } from 'react'
import './App.css'

function App() {

  const [input1, setInput1] = useState('') //CEP
  const [input2, setInput2] = useState('') //NUM
  const [input3, setInput3] = useState('') //ENDERECO
  const [input4, setInput4] = useState('') //BAIRRO
  const [input5, setInput5] = useState('') //CIDADE
  const [input6, setInput6] = useState('') //ESTADO

  const clearInput = () => {
    setInput3('')
    setInput4('')
    setInput5('')
    setInput6('')
  }

  const preencheForm = (endereco) => {
    setInput3(endereco.logradouro)
    setInput4(endereco.bairro)
    setInput5(endereco.localidade)
    setInput6(endereco.uf)
  }

  const verifyNumber = (num) => /^[0-9]+$/.test(num)

  const cepValido = (cep) => cep.length == 8 && verifyNumber(cep)

  async function pesquisarCEP() {
    const cep = input1
    clearInput()

    const url = `https://viacep.com.br/ws/${cep}/json/`

    if(cepValido(cep)) {
      const dados = await fetch(url)
      const addres = await dados.json()

      console.log(addres)

      if(addres.hasOwnProperty('erro')) {
        alert('CEP não encontrado')
      }

      else {
        preencheForm(addres)
      }
    }

    else {
      alert('CEP incorreto!')
    }
  }

  return (  
    <div className='container'>
      <form>
        <h1>Cadastrar Endereço</h1>

        <div className='divInputs'>
          <label>CEP</label>
          <input className='inputCEP' type="text" placeholder='ex: 12355679' onChange={(e) => setInput1(e.target.value)} onBlur={pesquisarCEP} value={input1} />

          <label>Número</label>
          <input className='inputNum' type="text" placeholder='55' onChange={(e) => setInput2(e.target.value)} value={input2}/>

          <label>Endereço</label>
          <input type="text" placeholder='ex: Rua dos Bobos' onChange={(e) => setInput3(e.target.value)} value={input3}/>

          <label>Bairro</label>
          <input type="text" onChange={(e) => setInput4(e.target.value)} value={input4}/>

          <label>Cidade</label>
          <input type="text" placeholder='ex: Campinas' onChange={(e) => setInput5(e.target.value)} value={input5}/>

          <label>Estado</label>
          <input type="text" onChange={(e) => setInput6(e.target.value)} value={input6}/>
        </div>

        <button>Cadastrar</button>
      </form>
    </div>
  )
}

export default App
