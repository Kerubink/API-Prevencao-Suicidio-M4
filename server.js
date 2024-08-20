import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './src/database/config.js'; 
import cors from 'cors';
import swaggerConfig from './src/doc/swagger.js'; // Importe o arquivo de configuração do Swagger
import questionnaireRoutes from './src/routers/questionario.routes.js';
import respostasRoutes from './src/routers/answers.routes.js'
import pacienteRouter from './src/routers/pacientes.routes.js';
import resourceRouter from './src/routers/resource.routes.js';
import sessionRouter from './src/routers/session.routes.js';
import professionalRouter from './src/routers/professional.routes.js';
import historicoRouter from './src/routers/historico.routes.js';
import supportRouter from './src/routers/supportgroup.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

swaggerConfig(app);

// Rotas da API
app.use('/api', questionnaireRoutes);
app.use('/api', respostasRoutes);
app.use('/api', pacienteRouter);
app.use('/api', resourceRouter);
app.use('/api', sessionRouter);
app.use('/api', professionalRouter);
app.use('/api', historicoRouter);
app.use('/api', supportRouter)

app.get('/', (req, res) => {
  res.send('API de Saúde Mental e Prevenção ao Suicídio está funcionando!');
});

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor está rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
