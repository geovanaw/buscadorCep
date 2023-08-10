import { useState } from 'react'; //estado
import { FiSearch } from 'react-icons/fi'; //ícone de lupa
import './style.css';

import api from './services/api'



function App() {

  const [input, setInput] = useState(''); //useState input
  const [cep, setCep] = useState({});

  async function handleSearch(){

    if(input === '') {
      alert('Preencha algum CEP!')
      return; // para a execuçao do codigo
    }

    try { //o que pode fazer            //pega o input e traz em formato json
      const response = await api.get(`${input}/json`); //esperar o tipo de requisiçao
      setCep(response.data) // as informações da API estão dentro do response data
      setInput("");


    } catch{ //o que acontece caso dê errado
      alert("Ops! Erro ao buscar CEP.");
      setInput(""); //volta o valor do input para vazio qnd der erro
    }
  }


  return (
    <div className="container">

        <div className='container_left'>
          <h1 className="title">Busque um CEP!</h1>

          <div className="containerInput">
            <input 
            type="text"
            placeholder="Digite seu cep..."
            value={input} //atrela ao estado importado (useState input), ou seja, fica salvo
            onChange={(e) => setInput(e.target.value)} // e = evento; quando chama o input, passa um estado para ele
            />               

            <button className="buttonSearch" onClick={handleSearch}> 
              <FiSearch size={25} color="#FFF"/>
            </button>

            <div className="container_right"></div>
        </div>
      </div>


    {Object.keys(cep).length > 0 && ( //mostra as informações do main apenas se houver alguma propriedade dentro do objeto
      <main className="main">
      <h2>CEP: {cep.cep}</h2>

      <span>Logradouro: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>Cidade: {cep.localidade}</span>
      <span>Estado: {cep.uf}</span>
      </main>
    )};
   

    </div>
  );
}

export default App;
