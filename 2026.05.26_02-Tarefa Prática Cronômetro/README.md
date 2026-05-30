02 — Tarefa Prática: Cronômetro
DONIZETE DE GOUVEA
•
26 de mai. (editado: 26 de mai.)

    npx create-expo-app@latest
    npm run reset-project
    npx expo start -c

Objetivo
Desenvolver um aplicativo cronômetro funcional em React Native Expo, aplicando os conceitos de gerenciamento de estado com useState, controle de intervalos de tempo com setInterval/clearInterval e listagem de dados com ScrollView.
Este projeto é uma evolução do Dado Virtual já desenvolvido em sala. Você irá trabalhar com os mesmos componentes e estrutura, acrescentando novos recursos como useRef para controle do intervalo e arrays no estado.

Funcionalidades obrigatórias
O aplicativo deve conter:
•       Display do tempo no formato MM:SS.cc (minutos, segundos e centésimos)
•       Botão Iniciar — começa a contagem do zero
•       Botão Pausar — suspende a contagem mantendo o tempo atual
•       Botão Continuar — retoma de onde parou (o mesmo botãode Iniciar, com texto alterado)
•       Botão Reset — zera o tempo e limpa a lista de voltas
•       Botão Volta — registra o tempo atual na lista de voltas 
•       Lista de voltas exibida abaixo dos botões com ScrollView, mostrando o número da volta e o tempo registrado
