import express from "express";
import dotenv from "dotenv";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import customTemplate from './customTemplate.js';
import { ChatMessageHistory } from "langchain/memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

dotenv.config();

const app = express();
app.use(express.json());

const llm = new ChatOpenAI({
    verbose: true, // desativar isso faz aparecer menos logs
    temperature: 1,
    apiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.MODEL_NAME,
});

const promptTemplate = ChatPromptTemplate.fromTemplate(customTemplate);

// Armazenamento de histórico por sessão
const messageHistories = new Map();

const getMessageHistory = (sessionId) => {
    if (!messageHistories.has(sessionId)) {
        messageHistories.set(sessionId, new ChatMessageHistory());
    }
    return messageHistories.get(sessionId);
};

// Cadeia de processamento com histórico
const chain = promptTemplate.pipe(llm);

const withHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});

app.post("/chat", async (req, res) => {
    try {
        const { message, sessionId = "default" } = req.body;

        if (!message) return res.status(400).json({ error: "Mensagem obrigatória!" });

        const response = await withHistory.invoke(
            // @ts-ignore
            { input: message },
            { configurable: { sessionId } }
        );

        await getMessageHistory(sessionId).addMessage(response);

        res.json({ response: response.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao processar a requisição" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
