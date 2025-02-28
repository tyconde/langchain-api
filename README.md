### 🚀 **LangChain API com Node.js + OpenAI**

Este projeto é uma API simples que utiliza **Node.js**, **Express** e **LangChain** para interagir com a OpenAI.

- - -

## 📌 **Requisitos**

*   **Node.js** instalado (versão 18+ recomendada)
*   Uma conta na [OpenAI](https://platform.openai.com/signup/) para obter uma API Key

- - -

## ⚙️ **Como configurar o projeto**

### 1️⃣ **Clone o repositório**

```sh
git clone <URL_DO_REPOSITORIO> cd langchain-api
```

### 2️⃣ **Instale as dependências**

```sh
npm install
```

### 3️⃣ **Crie um arquivo `.env`** e adicione suas credenciais:
> use o .env.example como base

```
OPENAI_API_KEY="sua_api_key_aqui"
MODEL_NAME="gpt-4o-mini"
```

### 4️⃣ **Inicie o servidor**
```sh
npm run dev
```

O servidor estará rodando em **http://localhost:3000** 🚀

- - -

## 🔑 **Como conseguir uma API Key da OpenAI?**

1.  Acesse [https://platform.openai.com/signup/](https://platform.openai.com/signup/) e crie uma conta.
2.  Vá até a aba **API Keys** ([link direto](https://platform.openai.com/api-keys)).
3.  Clique em **"Create new secret key"**.
4.  Copie a chave gerada e cole no arquivo `.env` na variável `OPENAI_API_KEY`.

- - -

## 📡 **Como chamar a API?**

### **Rota: `/chat`**

*   **Método:** `POST`
*   **URL:** `http://localhost:3000/chat`
*   **Headers:**
    
```json
{   
    "Content-Type": "application/json" 
}
```
    
*   **Body (JSON):**
    
```json
{   
    "message": "Olá, como você está?" 
}
```
    
*   **Resposta esperada:**
    
```json
{   
    "response": "Estou bem! Como posso te ajudar?" 
}
```

- - -

## 💡 **Exemplo de chamada via `cURL`**

```sh
curl -X POST http://localhost:3000/chat \
-H "Content-Type: application/json" \
-d '{"message": "Olá, como você está?"}'
```

Ou usando **JavaScript (fetch)**:
```js
fetch("http://localhost:3000/chat", 
    {   
        method: "POST",   
        headers: { 
            "Content-Type": "application/json" 
        },   
        body: JSON.stringify({ 
            message: "Olá, como você está?" 
        }), 
    })   
        .then((res) => res.json())   
        .then((data) => console.log(data));
```

- - -

## 📜 **Tecnologias utilizadas**

*   Node.js (v20.9.0)
*   Express
*   LangChain
*   OpenAI API
*   Dotenv
