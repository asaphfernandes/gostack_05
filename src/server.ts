import app from './app';

app.listen(3333, () => {
  const started = new Date().toLocaleTimeString();
  console.log('Desafio 05: Primeiro projeto Node.js - Asaph Fernandes');
  console.log(`Serve started in port 3333 at ${started}`);
});
