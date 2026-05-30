const IMCForm = ({ peso, altura, onPesoChange, onAlturaChange, onCalcular }) => {
  return (
    <div>
      <label style={styles.label}>Peso (kg):</label>
      <input
        style={styles.input}
        placeholder="Ex: 75 ou 75,5"
        type="number"
        step="0.1"
        value={peso}
        onChange={(e) => onPesoChange(e.target.value)}
        maxLength={6}
      />

      <label style={styles.label}>Altura (m):</label>
      <input
        style={styles.input}
        placeholder="Ex: 1,75"
        type="number"
        step="0.01"
        value={altura}
        onChange={(e) => onAlturaChange(e.target.value)}
        maxLength={4}
      />

      <button style={styles.button} onClick={onCalcular}>
        Calcular IMC
      </button>
    </div>
  );
};

const styles = {
  label: {
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '6px',
    display: 'block',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '14px',
    border: '1px solid #cbd7e0',
    borderRadius: '14px',
    fontSize: '17px',
    backgroundColor: '#fbfdff',
    marginBottom: '16px',
    boxSizing: 'border-box',
    color: '#1f2d3d',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#2f80ed',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s ease, transform 0.15s ease',
  },
};

export default IMCForm;