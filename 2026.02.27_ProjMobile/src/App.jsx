import { useState } from 'react'
import './App.css'
import FunctionalComponent from './Components/FunctionalComponent'
import FunçoesClasses from './Components/FuncoesClasses'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="area">
      <h1>Alo Mundo</h1>
      <img className='titulo' src="https://github.com/dgouvvea/Img/blob/main/RN/RNc.png?raw=true" alt="Logo React Nativea" />

      <FunctionalComponent />
      <FunçoesClasses />
      
      <img src="https://github.com/dgouvvea/Img/blob/main/RN/RNr.png?raw=true" alt="" className="rodape" />
    </div>
    </>
  )
}

export default App
