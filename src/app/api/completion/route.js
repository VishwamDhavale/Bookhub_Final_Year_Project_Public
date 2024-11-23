import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
export const runtime = 'edge';

const openai = new OpenAIApi(config);

export async function POST(req) {
    // extract the prompt from the body
    const { prompt } = await req.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        Also the ai will summarize the text and provide a response that is consistent with the tone of the text.`,
            },
            {
                role: "user",
                content: `
        I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here: ##${prompt}##
        keep the tone of the text consistent with the rest of the text.
        keep the response .
        `,
            },
        ],
        stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}