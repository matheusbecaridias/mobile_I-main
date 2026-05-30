import { useState } from 'react'
import './App.css'
import Titulo from './Componets/Titulo'
import Contatos from './Componets/Contatos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
      <Titulo />
      <Contatos />  

      </section>

    </>
  )
}

export default App
