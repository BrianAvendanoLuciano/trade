import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { tradeRouter } from './routes/trade.route';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'ok',
  });
});

app.use('/v1/trades', tradeRouter);

app.use(errorMiddleware);

app.listen('8000', () => {
  console.log('running');
});
