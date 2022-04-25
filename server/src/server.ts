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
    let final = response.data.choices
      ? (response.data.choices[0].text as string)
      : 'nhp';

    final = final.trim();

    const myData = AppDataSource.getRepository(Panchayat);
    const myDate = new Date();
    const newData = myData.create({
      post: req.body.prompt,
      response: final,
      date:
        myDate.getDate().toString() +
        '.' +
        (myDate.getMonth() + 1).toString() +
        '.' +
        myDate.getFullYear().toString(),
    });
    await myData.insert(newData);
    console.log(response.data);
    console.log(final);
    res.send(final);
  });
  app.post('/stupidserver', async (req, res) => {
    const myData = await AppDataSource.getRepository(Panchayat).find();
    myData.reverse();
    const splittedData = [];
    for (let i = 0; i < myData.length; i += 15) {
      var part = myData.slice(i, i + 15);
      splittedData.push(part);
    }
    if (req.body.cur >= splittedData.length) {
      res.send('');
    } else {
      res.send(splittedData[req.body.cur].reverse());
    }
    console.log(req.body.cur);
  });
  app.listen(port, () => {
    console.log(`seeeeeeeeeeeeeeeeeeeeeeeee ${port}`);
  });
};

main().catch((err) => console.log(err));
