import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req) {
    try {
        // const { text } = await req.json();

        const body = await req.json();
        const { prompt } = body
        console.log("Text:", prompt);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are an AI assistant specialized in summarizing and completing text. Your summaries should be concise, capturing the main ideas while maintaining the original tone and style. When completing thoughts, ensure the continuation is coherent and consistent with the given context.`,
                },
                {
                    role: "user",
                    content: `Summarize and complete the following text. Keep the summary brief and the completion natural:

Text: ${prompt}

1. Summary (2-3 sentences):
2. Completion (1-2 sentences):`,
                },
            ],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: true,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error("Error in OpenAI API Call:", error);
        return new Response("Error processing request", { status: 500 });
    }
}