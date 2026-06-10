import { useState, useEffect } from "react";

const STORAGE_KEY = "fin_edu_history_v1";

// ─── Utilities ────────────────────────────────────────────────────────────────
const brl = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number(v) || 0,
  );

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  green: "#38a169",
  greenDark: "#2f855a",
  greenLight: "#c6f6d5",
  greenText: "#276749",
  navy: "#1a365d",
  slate: "#2d3748",
  muted: "#718096",
  mutedLight: "#a0aec0",
  border: "#e2e8f0",
  bg: "#f8fafc",
  white: "#ffffff",
  blue: "#3182ce",
  blueLight: "#ebf8ff",
  blueBorder: "#bee3f8",
  blueText: "#2b6cb0",
  blueDark: "#2c5282",
  red: "#e53e3e",
  redLight: "#fff5f5",
  redBorder: "#feb2b2",
  redText: "#c53030",
  redBg: "#fed7d7",
  purple: "#805ad5",
  amber: "#d69e2e",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  card: {
    background: T.white,
    borderRadius: 14,
    boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
    padding: "28px 30px",
    marginBottom: 20,
  },
  section: {
    background: T.bg,
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 14,
  },
  h2: { color: T.navy, margin: "0 0 20px", fontSize: 19, fontWeight: 700 },
  sectionTitle: {
    color: T.slate,
    margin: "0 0 12px",
    fontSize: 15,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  label: {
    display: "block",
    fontWeight: 600,
    color: T.slate,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: "11px 13px",
    border: `2px solid ${T.border}`,
    borderRadius: 8,
    fontSize: 15,
    boxSizing: "border-box",
    fontFamily: "inherit",
    color: T.slate,
    background: "#fafafa",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  errText: {
    color: T.red,
    fontSize: 12,
    marginTop: 4,
    display: "block",
  },
  btnGreen: {
    padding: "10px 20px",
    background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
    color: T.white,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  btnBlue: {
    padding: "8px 14px",
    background: T.blueLight,
    color: T.blueText,
    border: `1px solid ${T.blueBorder}`,
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  },
  btnRed: {
    padding: "8px 14px",
    background: T.redLight,
    color: T.redText,
    border: `1px solid ${T.redBorder}`,
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  },
};

// ─── Field Component ──────────────────────────────────────────────────────────
function Field({
  label,
  name,
  textarea,
  placeholder,
  value,
  onChange,
  error,
  min,
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={S.label}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          style={{ ...S.input, resize: "vertical" }}
        />
      ) : (
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min ?? 0}
          style={{
            ...S.input,
            borderColor: error ? T.red : T.border,
          }}
        />
      )}
      {error && <span style={S.errText}>{error}</span>}
    </div>
  );
}

// ─── Financial Form ──────────────────────────────────────────────────────────
function FinancialForm({ onSubmit }) {
  const [form, setForm] = useState({
    monthlyIncome: "",
    essentialExpenses: "",
    debts: "",
    goal: "",
    goalCost: "",
    goalMonths: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!(Number(form.monthlyIncome) > 0))
      e.monthlyIncome = "Informe sua renda mensal (maior que zero).";
    if (form.essentialExpenses === "" || Number(form.essentialExpenses) < 0)
      e.essentialExpenses = "Informe suas despesas essenciais.";
    if (form.debts === "" || isNaN(Number(form.debts)))
      e.debts = "Informe 0 se não houver dívidas.";
    if (!form.goal.trim()) e.goal = "Descreva seu sonho ou objetivo.";
    if (!(Number(form.goalCost) > 0))
      e.goalCost = "Informe o custo do objetivo.";
    if (!(Number(form.goalMonths) >= 1)) e.goalMonths = "Mínimo de 1 mês.";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit({
      monthlyIncome: Number(form.monthlyIncome),
      essentialExpenses: Number(form.essentialExpenses),
      debts: Number(form.debts) || 0,
      goal: form.goal.trim(),
      goalCost: Number(form.goalCost),
      goalMonths: Number(form.goalMonths),
    });
  };

  return (
    <div style={S.card}>
      <h2 style={S.h2}>📊 Informações Financeiras Mensais</h2>
      <Field
        label="1. Qual é a sua renda mensal total?"
        name="monthlyIncome"
        placeholder="Ex: 5000"
        value={form.monthlyIncome}
        onChange={handleChange}
        error={errors.monthlyIncome}
      />
      <Field
        label="2. Quanto você gasta com despesas essenciais? (aluguel, alimentação, transporte…)"
        name="essentialExpenses"
        placeholder="Ex: 3000"
        value={form.essentialExpenses}
        onChange={handleChange}
        error={errors.essentialExpenses}
      />
      <Field
        label="3. Dívidas ou compromissos financeiros mensais (parcelas, empréstimos)?"
        name="debts"
        placeholder="Ex: 500 (ou 0 se não houver)"
        value={form.debts}
        onChange={handleChange}
        error={errors.debts}
      />

      <h2 style={{ ...S.h2, marginTop: 28 }}>🎯 Seu Objetivo Financeiro</h2>
      <Field
        label="4. Qual é o seu sonho ou objetivo financeiro?"
        name="goal"
        textarea
        placeholder="Ex: Comprar um carro, fazer uma viagem para a Europa, criar uma reserva de emergência…"
        value={form.goal}
        onChange={handleChange}
        error={errors.goal}
      />
      <Field
        label="5. Quanto custa realizar esse sonho? (R$)"
        name="goalCost"
        placeholder="Ex: 30000"
        value={form.goalCost}
        onChange={handleChange}
        error={errors.goalCost}
      />
      <Field
        label="6. Em quantos meses você quer alcançar esse objetivo?"
        name="goalMonths"
        placeholder="Ex: 24"
        value={form.goalMonths}
        onChange={handleChange}
        error={errors.goalMonths}
        min={1}
      />

      <button
        onClick={handleSubmit}
        style={{
          ...S.btnGreen,
          width: "100%",
          padding: "15px",
          fontSize: 17,
          marginTop: 6,
          borderRadius: 10,
        }}
      >
        🤖 Gerar Simulação com IA
      </button>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen() {
  const steps = [
    "Analisando sua situação financeira…",
    "Calculando viabilidade da meta…",
    "Gerando sugestões personalizadas…",
    "Preparando seu plano completo…",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ ...S.card, textAlign: "center", padding: "60px 30px" }}>
      <div
        style={{
          width: 52,
          height: 52,
          border: `5px solid ${T.border}`,
          borderTop: `5px solid ${T.green}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 24px",
        }}
      />
      <h3 style={{ color: T.slate, margin: "0 0 8px", fontSize: 18 }}>
        Gerando simulação com IA…
      </h3>
      <p style={{ color: T.muted, margin: 0, fontSize: 15 }}>{steps[idx]}</p>
    </div>
  );
}

// ─── Stat Box ─────────────────────────────────────────────────────────────────
function StatBox({ label, value, color }) {
  return (
    <div
      style={{
        background: T.white,
        borderRadius: 10,
        padding: "14px 10px",
        textAlign: "center",
        borderTop: `3px solid ${color}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 700, color }}>{value}</div>
      <div
        style={{ fontSize: 11, color: T.muted, marginTop: 4, lineHeight: 1.3 }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ pct, label }) {
  const clamp = Math.min(100, Math.max(0, pct));
  const barColor = clamp > 70 ? T.red : clamp > 50 ? T.amber : T.green;
  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
          fontSize: 12,
          color: T.muted,
        }}
      >
        <span>{label}</span>
        <span style={{ fontWeight: 700, color: barColor }}>{clamp}%</span>
      </div>
      <div
        style={{
          background: T.border,
          borderRadius: 99,
          height: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${clamp}%`,
            height: "100%",
            background: barColor,
            borderRadius: 99,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Simulation Result Card ───────────────────────────────────────────────────
function SimulationResult({ sim, onReset, onHistory }) {
  const { formData: fd, aiData: ai, date } = sim;
  const viable = ai.viabilityStatus === "Viável";
  const pct = Number(ai.commitmentPercent) || 0;

  return (
    <div style={S.card}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 22,
          borderBottom: `2px solid ${T.border}`,
          paddingBottom: 16,
        }}
      >
        <div>
          <h2 style={{ color: T.navy, margin: 0, fontSize: 20 }}>
            📈 Simulação Financeira Personalizada
          </h2>
          <p style={{ color: T.muted, margin: "5px 0 0", fontSize: 13 }}>
            Gerada em {date} · salva automaticamente no histórico
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={onHistory} style={S.btnBlue}>
            📋 Histórico
          </button>
          <button onClick={onReset} style={S.btnRed}>
            ➕ Nova Simulação
          </button>
        </div>
      </div>

      {/* Descrição */}
      <div style={S.section}>
        <h3 style={S.sectionTitle}>📝 Descrição do Objetivo</h3>
        {[
          ["Objetivo", fd.goal],
          ["Valor necessário", brl(fd.goalCost)],
          ["Prazo", `${fd.goalMonths} meses`],
          ["Renda mensal", brl(fd.monthlyIncome)],
          ["Despesas essenciais", brl(fd.essentialExpenses)],
          ["Dívidas mensais", brl(fd.debts)],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: `1px solid ${T.border}`,
              fontSize: 14,
            }}
          >
            <span style={{ color: T.muted }}>{k}</span>
            <span
              style={{
                fontWeight: 600,
                color: T.slate,
                maxWidth: "60%",
                textAlign: "right",
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>

      {/* Viabilidade */}
      <div style={S.section}>
        <h3 style={S.sectionTitle}>🎯 Viabilidade da Meta</h3>
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              display: "inline-block",
              padding: "5px 18px",
              borderRadius: 20,
              fontWeight: 700,
              fontSize: 15,
              background: viable ? T.greenLight : T.redBg,
              color: viable ? T.greenText : T.redText,
            }}
          >
            {viable ? "✅ Viável" : "⚠️ Desafiadora"}
          </span>
        </div>
        <p
          style={{
            color: "#4a5568",
            lineHeight: 1.65,
            margin: 0,
            fontSize: 14,
          }}
        >
          {ai.viabilityExplanation}
        </p>
      </div>

      {/* Diagnóstico */}
      <div style={S.section}>
        <h3 style={S.sectionTitle}>💊 Diagnóstico Financeiro</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <StatBox
            label="Renda comprometida"
            value={`${pct}%`}
            color={pct > 70 ? T.red : pct > 50 ? T.amber : T.green}
          />
          <StatBox
            label="Disponível/mês"
            value={brl(ai.available)}
            color={T.blue}
          />
          <StatBox
            label="Necessário/mês"
            value={brl(ai.monthlyNeeded)}
            color={T.purple}
          />
        </div>
        <ProgressBar pct={pct} label="Comprometimento da renda" />
        <p
          style={{
            color: "#4a5568",
            lineHeight: 1.65,
            margin: "14px 0 0",
            fontSize: 14,
          }}
        >
          {ai.diagnosisAnalysis}
        </p>
      </div>

      {/* Sugestão Prática */}
      <div style={S.section}>
        <h3 style={S.sectionTitle}>💡 Sugestão Prática</h3>
        <p
          style={{
            color: "#4a5568",
            lineHeight: 1.65,
            margin: 0,
            fontSize: 14,
          }}
        >
          {ai.practicalSuggestion}
        </p>
      </div>

      {/* Como Aumentar a Renda */}
      <div style={S.section}>
        <h3 style={S.sectionTitle}>📈 Como Aumentar a Renda</h3>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {(ai.incomeIdeas || []).map((idea, i) => (
            <li
              key={i}
              style={{ color: "#4a5568", lineHeight: 1.85, fontSize: 14 }}
            >
              {idea}
            </li>
          ))}
        </ul>
      </div>

      {/* Sugestões de Investimento */}
      <div style={S.section}>
        <h3 style={S.sectionTitle}>💰 Sugestões de Investimento</h3>
        <p
          style={{
            color: "#4a5568",
            lineHeight: 1.65,
            margin: 0,
            fontSize: 14,
          }}
        >
          {ai.investmentSuggestions}
        </p>
      </div>

      {/* Mensagem Final */}
      <div
        style={{
          ...S.section,
          background: T.blueLight,
          border: `1px solid ${T.blueBorder}`,
          marginBottom: 0,
        }}
      >
        <h3 style={{ ...S.sectionTitle, color: T.blueText }}>
          🌟 Mensagem Final
        </h3>
        <p
          style={{
            color: T.blueDark,
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {ai.finalMessage}
        </p>
      </div>
    </div>
  );
}

// ─── History View ─────────────────────────────────────────────────────────────
function HistoryView({ history, onView, onDelete, onNew }) {
  return (
    <div style={S.card}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          borderBottom: `2px solid ${T.border}`,
          paddingBottom: 16,
        }}
      >
        <h2 style={{ ...S.h2, margin: 0 }}>📋 Histórico de Simulações</h2>
        <button onClick={onNew} style={S.btnGreen}>
          ➕ Nova Simulação
        </button>
      </div>

      {history.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "52px 20px",
            color: T.mutedLight,
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 12 }}>📭</div>
          <p style={{ margin: 0, fontSize: 16 }}>
            Nenhuma simulação salva ainda.
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 14 }}>
            Preencha o formulário para gerar sua primeira simulação.
          </p>
        </div>
      ) : (
        history.map((sim) => (
          <div
            key={sim.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 16px",
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              marginBottom: 10,
              gap: 10,
              flexWrap: "wrap",
              transition: "box-shadow 0.15s",
            }}
          >
            <div style={{ flex: 1, minWidth: 160 }}>
              <div
                style={{
                  fontWeight: 600,
                  color: T.slate,
                  marginBottom: 3,
                  fontSize: 15,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 280,
                }}
              >
                {sim.formData.goal}
              </div>
              <div style={{ fontSize: 13, color: T.muted }}>
                {sim.date} &middot; {brl(sim.formData.goalCost)} &middot;{" "}
                {sim.formData.goalMonths} meses
              </div>
            </div>
            <span
              style={{
                padding: "4px 13px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                flexShrink: 0,
                background: sim.status === "Viável" ? T.greenLight : T.redBg,
                color: sim.status === "Viável" ? T.greenText : T.redText,
              }}
            >
              {sim.status}
            </span>
            <button onClick={() => onView(sim)} style={S.btnBlue}>
              👁️ Visualizar
            </button>
            <button onClick={() => onDelete(sim.id)} style={S.btnRed}>
              🗑️ Excluir
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("form"); // "form" | "loading" | "result" | "history"
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [storageReady, setStorageReady] = useState(false);

  // Load history from persistent storage on mount
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r) setHistory(JSON.parse(r.value));
      } catch {
        // Key doesn't exist yet — first run
      } finally {
        setStorageReady(true);
      }
    })();
  }, []);

  const persistHistory = async (list) => {
    setHistory(list);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Storage error:", e);
    }
  };

  const handleGenerate = async (formData) => {
    setView("loading");

    try {
      // Cole aqui a chave que gerou no OpenRouter (sk-or-...)
      const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY;
      
      const res = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENROUTER_KEY}`
          },
          body: JSON.stringify({
            // Este modelo escolhe automaticamente as melhores opções 100% grátis do momento
            model: "openrouter/free", 
            messages: [
              {
                role: "user",
                content: `Você é um educador financeiro especialista brasileiro. Analise os dados abaixo e retorne SOMENTE um JSON válido, sem markdown, sem backticks, sem texto extra.

Formato exato:
{
  "viabilityStatus": "Viável" ou "Desafiadora",
  "viabilityExplanation": "explicação da viabilidade em 2-3 frases",
  "commitmentPercent": <inteiro: (despesas_essenciais + dívidas) / renda * 100>,
  "available": <número: renda - despesas_essenciais - dívidas>,
  "monthlyNeeded": <número: custo_objetivo / prazo_meses>,
  "diagnosisAnalysis": "análise financeira em 2-3 frases",
  "practicalSuggestion": "sugestão prática e detalhada em 3-4 frases",
  "incomeIdeas": ["ideia concreta 1", "ideia concreta 2", "ideia concreta 3", "ideia concreta 4", "ideia concreta 5"],
  "investmentSuggestions": "sugestões de investimento adequadas ao prazo em 2-3 frases",
  "finalMessage": "mensagem motivacional personalizada com dicas de disciplina financeira em 2-3 frases"
}

Dados do usuário:
- Renda mensal total: R$ ${formData.monthlyIncome.toFixed(2)}
- Despesas essenciais mensais: R$ ${formData.essentialExpenses.toFixed(2)}
- Dívidas/parcelas mensais: R$ ${formData.debts.toFixed(2)}
- Objetivo financeiro: ${formData.goal}
- Custo total do objetivo: R$ ${formData.goalCost.toFixed(2)}
- Prazo para atingir: ${formData.goalMonths} meses

Retorne APENAS o JSON em portugues BR.`
              }
            ]
          }),
        },
      );
      
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || "Erro na API");

      // O OpenRouter adota o padrão da OpenAI para a resposta de texto
      const rawText = data.choices[0].message.content;

      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const aiData = JSON.parse(cleaned);

      const item = {
        id: Date.now(),
        date: new Date().toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        formData,
        aiData,
        status: aiData.viabilityStatus,
      };

      await persistHistory([item, ...history]);
      setCurrent(item);
      setView("result");
    } catch (err) {
      console.error("AI error:", err);
      alert(
        "Erro ao gerar simulação com a IA.\nVerifique sua conexão e tente novamente.\n\nDetalhes: " +
          err.message,
      );
      setView("form");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja excluir esta simulação?")) return;
    const updated = history.filter((h) => h.id !== id);
    await persistHistory(updated);
    if (current?.id === id) {
      setCurrent(null);
      setView("form");
    }
  };

  const handleView = (sim) => {
    setCurrent(sim);
    setView("result");
  };

  const handleReset = () => {
    setCurrent(null);
    setView("form");
  };

  if (!storageReady) return null;

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "20px 16px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        button { transition: opacity 0.15s, transform 0.15s; }
        button:hover { opacity: 0.85; }
        button:active { transform: scale(0.97); }
        input:focus, textarea:focus {
          border-color: #38a169 !important;
          box-shadow: 0 0 0 3px rgba(56,161,105,0.15) !important;
        }
      `}</style>

      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 28 }}>
        <h1
          style={{
            color: T.navy,
            margin: "0 0 4px",
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          💰 Educador Financeiro Inteligente
        </h1>
        <p style={{ color: T.muted, margin: "0 0 16px", fontSize: 15 }}>
          Planeje seu futuro com inteligência e disciplina
        </p>
        {view !== "loading" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {view !== "history" ? (
              <button onClick={() => setView("history")} style={S.btnBlue}>
                📋 Histórico{history.length > 0 ? ` (${history.length})` : ""}
              </button>
            ) : (
              <button
                onClick={() => setView(current ? "result" : "form")}
                style={S.btnBlue}
              >
                ← Voltar
              </button>
            )}
          </div>
        )}
      </header>

      {/* Views */}
      {view === "form" && <FinancialForm onSubmit={handleGenerate} />}
      {view === "loading" && <LoadingScreen />}
      {view === "result" && current && (
        <SimulationResult
          sim={current}
          onReset={handleReset}
          onHistory={() => setView("history")}
        />
      )}
      {view === "history" && (
        <HistoryView
          history={history}
          onView={handleView}
          onDelete={handleDelete}
          onNew={handleReset}
        />
      )}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: 36,
          color: T.mutedLight,
          fontSize: 13,
        }}
      >
        <p style={{ margin: 0 }}>
          Desenvolvido para ajudar você a conquistar seus sonhos financeiros
        </p>
      </footer>
    </div>
  );
}
