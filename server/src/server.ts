import 'reflect-metadata';

import express from 'express';
import { apikey } from '../secrets.json';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';
import { AppDataSource } from './parkour';
import { Panchayat } from './ingredients/entities/Panchayat';

const main = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('ho gya connect? pausechamp');
    })
    .catch((error) => console.log(error));
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
    if (response.data.choices) response.data.choices[0].text?.trim();
    const myData = AppDataSource.getRepository(Panchayat);
    const newData = myData.create({
      post: req.body.prompt,
      response: response.data.choices ? response.data.choices[0].text : 'nhp',
    });
    await myData.insert(newData);
    console.log(response.data);
    if (response.data.choices) res.send(response.data.choices[0].text);
    else res.send('nhp');
  });
  app.get('/stupidserver', async (_, res) => {
    const myData = await AppDataSource.getRepository(Panchayat).find();
    res.send(myData);
  });
  app.listen(port, () => {
    console.log(`seeeeeeeeeeeeeeeeeeeeeeeee ${port}`);
  });
};

main().catch((err) => console.log(err));
