import { VercelRequest, VercelResponse } from '@vercel/node';
import Together from 'together-ai';
import dotenv from 'dotenv';

dotenv.config();

const together = new Together(process.env.TOGETHER_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body;

      const completion = await together.chat.completions.create({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: messages,
      });

      const assistantResponse = completion.choices[0].message.content;
      res.status(200).json({ response: assistantResponse });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
