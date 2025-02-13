## 🔌EcoTrack - Sistema de Monitoramento de Consumo de Energia

Este projeto é um sistema para fins de estudo. Monitoramento e inserção do consumo de energia elétrica, com geração de alertas automáticos para picos de consumo. 
Desenvolvido em Node.js, TypeScript, Prisma e MySQL, tem como objetivo auxiliar no controle eficiente do uso de energia elétrica.

### ⚡ Problema:
Muitas pessoas e pequenas empresas não têm visibilidade clara do consumo de energia em tempo real. 
Isso dificulta a identificação de equipamentos que consomem mais energia, gerando desperdícios e contas de luz mais altas.

### 🖇️ Recursos
  - Monitoramento e inserção do consumo de energia elétrica.
  - Geração de alertas automáticos para picos de consumo.
  - Armazenamento de dados em banco de dados relacional para análise posterior.
  - Simulador de consumo de energia para fins de teste e desenvolvimento.

### 💻 Tecnologias
  - Node.js: Plataforma de desenvolvimento para execução do código JavaScript no servidor.
  - TypeScript: Superset do JavaScript que adiciona tipagem estática ao código.
  - Express: Framework para aplicativo da web do Node.js
  - Prisma: ORM (Object-Relational Mapping) para interação com o banco de dados.
  - MySQL: Sistema de gerenciamento de banco de dados relacional.
  - Docker: Plataforma para criação e gerenciamento de containers.
  - Zod: Validação de dados

### ⚙️ Configuração e Instalação
## 📌 Requisitos
  - Docker
  - .env
```bash
DATABASE_URL="mysql://root:senha123rte@db:3306/energy_consumption"

PORT=3000

SECRET_KEY=3530af62-8384-470b-be22-9e12d7d56a61

PERCENTAGE=120

API_CONSUMPTION=http://localhost:3000/devices/1/consumption
```

### 📥 Passos para Instalação

  - Clone o repositório:
```bash
git clone https://github.com/gefersonholdorf/energy-consumption-monitoring-system.git
cd energy-consumption-monitoring-system
docker-compose up -d --build 
```

  - O sistema estará disponível em http://localhost:3000.

### 📡 Uso da API
A API possui endpoints para capturar e monitorar dados de consumo de energia. Exemplos de uso podem ser encontrados na documentação integrada (a ser adicionada via Swagger).

Desenvolvido por Geferson Holdorf 🚀
