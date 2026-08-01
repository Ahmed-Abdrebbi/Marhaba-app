require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(logger); 

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Base de données synchronisée.");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Serveur démarré sur http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Erreur de connexion à la base de données :", err));