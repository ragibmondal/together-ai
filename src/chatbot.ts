import * as readline from 'readline';
import Together from 'together-ai';

// Initialize the Together AI client
const together = new Together('YOUR_API_KEY');

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function chat() {
  const messages: { role: 'user' | 'assistant'; content: string }[] = [];

  console.log('Welcome to the Together AI Chatbot!');
  console.log('Type "exit" to end the conversation.');

  while (true) {
    const userInput = await new Promise<string>((resolve) => {
      rl.question('You: ', resolve);
    });

    if (userInput.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      break;
    }

    messages.push({ role: 'user', content: userInput });

    try {
      const completion = await together.chat.completions.create({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: messages,
      });

      const assistantResponse = completion.choices[0].message.content;
      console.log('Assistant:', assistantResponse);

      messages.push({ role: 'assistant', content: assistantResponse });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

chat();
