import express from 'express';

const app = express();
app.get('/', (_req, res) => res.send('OK'));
app.get('/api/animalitos-hourly', (_req, res) =>
  res.json([{ hour: '12:00 pm', animal: 'Test', image: 'https://via.placeholder.com/120' }])
);
app.listen(3001, () => console.log('✅ Test server listening on 3001'));
