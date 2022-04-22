import express from 'express';
import { apikey } from '../secrets.json';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const configuration = new Configuration({
    apiKey: apikey,
  });
  const openai = new OpenAIApi(configuration);
  const port = 6969;
  app.post('/', async (req, res) => {
    console.log(req.body.prompt);

    const response = await openai.createCompletion('text-davinci-001', {
      prompt: req.body.prompt,
      temperature: 1,
      max_tokens: 300,
    });
    console.log(response.data);
    if (response.data.choices) res.send(response.data.choices[0].text);
    else res.send('nhp');
  });
  app.listen(port, () => {
    console.log(`seeeeeeeeeeeeeeeeeeeeeeeee ${port}`);
  });
};
main().catch((err) => console.log(err));
