# **🚀 Space Connect - Advanced Programming & Mobile DEV - MOBILE**

Aplicação mobile desenvolvida para consumo da API REST do sistema *Space Connect*, permitindo visualizar e cadastrar informações relacionadas ao monitoramento de Sensores, Módulos Computacionais, Eventos Operacionais e Alertas do Sistema.

A aplicação comunica com o back-end por meio de requisições HTTP utilizando JSON.

---

## **📌 Descrição do Projeto**

O aplicativo mobile foi desenvolvido para demonstrar a integração entre Front-end e Back-end, permitindo:

- Consulta de dados cadastrados na API
- Envio de novos dados ao servidor
- Exibição de informações monitorados
- Comunicação cliente-servidor via HTTP

<br>

A aplicação depende da execução da API REST para funcionamento correto.

---

## **📱 Integração Funcional entre Front-end (Mobile) e Back-end (API)**

O aplicativo possui integração funcional com uma API REST desenvolvida em Spring Boot.

A comunicação ocorre utilizando:

- Requisições **GET** para consulta de dados
- Requisições **POST** para envio de informações
- Dados trafegados no formato **JSON**

<br>

**♾️ Fluxo da Comunicação**

```txt
Aplicativo Mobile
        ↓
 Requisições HTTP (GET / POST)
        ↓
      API REST
(Spring Boot + JPA + H2)
        ↓
   Banco de Dados
```

---

## **🔄 Demonstração de Requisições HTTP**

Durante a entrega do projeto foram demonstrados requisições **GET** e **POST** entre aplicação Moile e API.

### **GET — Consulta de dados**

Utilizado para buscar informações cadastradas

<br>

**🔵 Exemplo:**

```http
GET /sensores
```

<br>

**🟢 Resposta:**

```json
[
  {
    "id": 1,
    "nome": "Sensor Temperatura",
    "tipo": "Temperatura",
    "status": "Ativo",
    "valorAtual": 32.5,
    "unidade": "°C"
  }
]
```

<br>

**🟣 Aplicação:**

- Buscar sensores cadastrados
- Atualizar informações na interface mobile
- Consultar dados persistidos

<br>
<br>

### **POST — Cadastro de dados**

Utilizado para persistir informações enviadas pelo aplicativo

<br>

**🔵 Exemplo:**

```http
POST /sensores
```

<br>

**🟢 Resposta:**

```json
{
  "nome": "Sensor Temperatura",
  "tipo": "Temperatura",
  "status": "Ativo",
  "valorAtual": 32.5,
  "unidade": "°C"
}
```

<br>

**🟣 Aplicação:**

- Cadastro de novos registros
- Envio de informações para a API
- Persistência de dados

---

## **🛠️ Tecnologias Utilizadas**

- React Native
- Expo
- TypeScript
- Fetch API
- JavaScript
- API REST (Spring Boot)

---

## **▶️ Como Rodar o Projeto**

### **📃 Pré-requisitos**

Antes de iniciar, tenha instalado:

- Node.js
- npm
- Expo CLI
- Expo Go (celular) ou Android Studio (emulador)
- Java 17+ (para execução da API)
- Maven (para execução do Back-end)

<br>

### **1. Clonar o repositório mobile**

```bash
git clone <URL_DO_REPOSITORIO_MOBILE>
```

<br>

Entre na pasta:

```bash
cd Space_Connect_Mobile
```

<br>

### **2. Clonar e executar o backend (OBRIGATÓRIO)**

Este aplicativo dependo da API REST para o seu funcionamento

<br>

2.1 Clone o repositório do back-end:

```bash
git clone <https://github.com/CarlosPossi/backend_SpaceConnect.git>
```

<br>

2.2 Entre na pasta:

```bash
cd connect
```

<br>

2.3 Execute a API: 

```bash
mvn spring-boot:run
```

<br>

A API será iniciada em:

```txt
http://localhost:8080
```

<br>

**⚠️ O backend deve estar em execução antes de iniciar o aplicativo mobile.**

<br>

### **3. Configurar a URL da API**

Caso necessário, altere a URL base utilizada nas requisições HTTP

<br>

Exemplo:

```ts
const API_URL = "http://SEU_IP_LOCAL:8080";
```

<br>

> Em dispositivo físico, utilize o IP da máquina local ao invés de `localhost`.

<br>

Exemplo:

```txt
http://192.168.0.10:8080
```

<br>

### **4. Instalar dependências do mobile**

Na pasta do projeto mobile:

```bash
npm install
```

<br>

### **5. Executar aplicação**

```bash
npx expo start
```

<br>

Depois:

- Pressione `a` → Android Emulator
- Escaneie QR Code → Expo Go
- Pressione `w` → Execute pelo navegador

---

## **📁 Estrutura do Projeto**

```txt
Space_Connect_Mobile
│
├── assets/
│
├── components/
│
├── screens/
│
├── services/
│   └── api.ts
│
├── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```

---

## **🌐 Endpoints Consumidos**

| Método | Endpoint | Função |
|--------|----------|--------|
| GET | `/sensores` | Buscar sensores |
| POST | `/sensores` | Criar sensor |
| GET | `/eventosoperacionais` | Consultar eventos |
| POST | `/eventosoperacionais` | Registrar evento |

---

## **👨‍💻 Projeto Acadêmico**

Aplicação mobile integrada a uma API REST para demonstrar comunicação entre front-end e back-end através de requisições HTTP (**GET** e **POST**).

---

## **🎞️ Vídeo Demonstrativo do Projeto**

[![Assista ao vídeo](https://img.youtube.com/vi/sTqOvJN18Ds/maxresdefault.jpg)](https://youtube.com/shorts/sTqOvJN18Ds)

---

### **👥 Integrantes do Projeto**

- 🧔🏻‍♂️ **Nome:** Carlos Augusto da Cruz Possi  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; **RM:** 558758

- 👦🏻 **Nome:** Fabio Henrique dos Santos Farias  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; **RM:** 552453

- 🧑🏻‍🦱 **Nome:** João Pedro Bernardo Santos da Silva &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  **RM:** 557142

