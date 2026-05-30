const IMCResultado = ({ resultado, erro }) => {
  if (erro) {
    return <p style={styles.erro}>{erro}</p>;
  }

  if (!resultado) {
    return null;
  }

  return (
    <div style={styles.container}>
      <p style={styles.titulo}>
        Seu IMC: <span style={styles.imcValor}>{resultado.imc}</span>
      </p>
      <p style={{ ...styles.classificacao, backgroundColor: resultado.cor }}>
        {resultado.classificacao}
      </p>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '30px',
    paddingTop: '24px',
    borderTop: '1px solid #e4e9ef',
    textAlign: 'center',
  },
  titulo: {
    fontSize: '22px',
    color: '#1f2d3d',
    marginBottom: '14px',
    lineHeight: '1.3',
  },
  imcValor: {
    fontWeight: '800',
    fontSize: '30px',
    color: '#1f2d3d',
  },
  classificacao: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '14px',
    display: 'inline-block',
    marginTop: '14px',
    minWidth: '180px',
  },
  erro: {
    color: '#b33845',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '25px',
    fontSize: '16px',
    backgroundColor: '#fde8ea',
    padding: '14px 18px',
    borderRadius: '14px',
    border: '1px solid #f0c2c7',
  },
};

export default IMCResultado;