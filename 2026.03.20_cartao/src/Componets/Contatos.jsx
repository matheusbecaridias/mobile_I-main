import React from 'react'

const Contatos = () => {
  return (
    <div className="contatos">
      <h2>Meus Contatos</h2>

      <a href="tel:+5543999739119" className="telefone"> 
        ☎ Telefone
        </a>

      <a href="mailto:donizete.gouvea@escola.pr.gov.br" className="email">
        ✉ E-mail
      </a>

    <a href="https://wa.me/5543999739119" className="whatsapp">
        📞 WhatsApp
    </a>

    </div>
  )
}

export default Contatos