import { useState } from 'react';
import IMCForm from './IMCForm';
import IMCResultado from './IMCResultado';

const IMCCalculadora = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const calcularIMC = () => {
    if (!peso || !altura) {
      setErro('Por favor, preencha peso e altura.');
      setResultado(null);
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      setErro('Por favor, insira valores numéricos válidos.');
      setResultado(null);
      return;
    }

    setErro('');

    const imc = (pesoNum / (alturaNum * alturaNum)).toFixed(2);

    let classificacao;
    let cor;

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
      cor = '#ff8a66';
    } else if (imc < 25) {
      classificacao = 'Peso normal';
      cor = '#3d8a72';
    } else if (imc < 30) {
      classificacao = 'Sobrepeso';
      cor = '#f2b659';
    } else if (imc < 35) {
      classificacao = 'Obesidade grau I';
      cor = '#e37c5d';
    } else if (imc < 40) {
      classificacao = 'Obesidade grau II';
      cor = '#d55f61';
    } else {
      classificacao = 'Obesidade grau III (mórbida)';
      cor = '#b03c43';
    }

    setResultado({ imc, classificacao, cor });
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.titulo}>Calculadora de IMC</h1>

        <IMCForm
          peso={peso}
          altura={altura}
          onPesoChange={setPeso}
          onAlturaChange={setAltura}
          onCalcular={calcularIMC}
        />

        <IMCResultado resultado={resultado} erro={erro} />
      </div>
    </div>
  );
};

const styles = {
  background: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #eef6fb 0%, #f9fbff 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 18px 45px rgba(24, 43, 80, 0.08)',
    border: '1px solid rgba(34, 60, 80, 0.08)',
  },
  titulo: {
    fontSize: '30px',
    fontWeight: '700',
    color: '#1f2d3d',
    textAlign: 'center',
    marginBottom: '28px',
  },
};

export default IMCCalculadora;