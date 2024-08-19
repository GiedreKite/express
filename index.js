import express from 'express';
const app = express();
const port = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (request, response) => {
  return response.send('Labas rytas, Lietuva!');
})

app.get('/about', (request, response) => {
    return response.send('Nori suzinoti daugiau apie projekta? ');
  })

app.get('/*', (request, response) => {
  return response.send('ups, norimo puslapio nera ');
})  

app.listen(port, () => {
   console.log(`App running on : http://localhost:${port}`);
  });