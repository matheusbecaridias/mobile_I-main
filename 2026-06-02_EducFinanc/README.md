"""# 💰 Simulador de Planejamento e Educação Financeira com IA

Este é um aplicativo interativo desenvolvido em **React** para ajudar estudantes e usuários a analisarem a viabilidade de seus objetivos financeiros. O sistema utiliza a API do **OpenRouter** de forma totalmente gratuita para processar os dados inseridos e gerar um diagnóstico completo, sugestões práticas, ideias de renda extra e recomendações de investimento personalizadas.

---

## 🚀 Funcionalidades

- **Formulário Inteligente:** Captura de renda mensal, despesas essenciais, dívidas e metas financeiras (custo e prazo).
- **Análise de Viabilidade por IA:** Diagnóstico automatizado indicando se a meta é "Viável" ou "Desafiadora".
- **Métricas Claras:** Cálculo automático do percentual de comprometimento de renda e valor necessário por mês.
- **Plano de Ação:** Geração de sugestões práticas e ideias criativas de renda extra.
- **Histórico Local:** Salvamento automático das simulações anteriores utilizando o `localStorage` do navegador.

---

## 🛠 Prerrequisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- Um gerenciador de pacotes como **npm** (já vem com o Node).

---

## 📦 Instalação e Inicialização

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone ou baixe o projeto** para a sua máquina.
2. Abra o terminal na pasta raiz do projeto e instale as dependências:

```bash
   npm create vite@latest

```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev

```

4. Abra o navegador no endereço indicado no terminal (geralmente `http://localhost:5173` ou `http://localhost:3000`).

---

## 🔐 Configuração Segura da API Key (Boas Práticas)

Para que o aplicativo funcione com a IA sem expor sua chave privada publicamente (essencial caso você vá enviar o projeto para o GitHub), siga estas etapas:

### 1. Criar o arquivo de ambiente

Na raiz do seu projeto (mesma pasta onde fica o `package.json`), crie um arquivo chamado `.env`.

### 2. Adicionar a sua chave

    Pegar a sua Chave Gratuita no OpenRouter

    Aceda ao site oficial: openrouter.ai.

    Crie uma conta gratuita (pode fazer login direto com a sua conta Google).

    No painel de controle (Dashboard), vá à secção API Keys e clique em Create Key.

    Dê um nome à chave (ex: "TrabalhoEscola") e clique em criar.

    Copie a chave gerada (ela começa com sk-or-...).

Abra o arquivo `.env` e adicione a seguinte linha (substituindo pelo seu API key do OpenRouter):

```env
VITE_OPENROUTER_KEY="sua-api-key-aqui";

```

### 3. Proteger no Git

Se estiver usando Git, certifique-se de que o seu arquivo `.gitignore` possua a linha abaixo para evitar que a chave vá para a nuvem:

```text
.env
.env.local

```

---

## 🤖 Modelo de IA Utilizado

O projeto está configurado para consumir o modelo dinâmico `"openrouter/free"`. Este modelo faz o roteamento automático entre as melhores opções de inteligência artificial de código aberto e gratuitas do mercado (como *Llama 3*, *Mistral*, entre outras), garantindo disponibilidade e custo zero para fins pedagógicos e de testes.

---

## 🎓 Fins Pedagógicos

Este software foi desenvolvido como parte de uma atividade escolar, focado no aprendizado prático de desenvolvimento web em React, manipulação de estados, consumo de APIs REST e conceitos de educação financeira.
"""


