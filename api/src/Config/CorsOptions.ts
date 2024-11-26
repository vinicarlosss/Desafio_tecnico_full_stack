export  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
  };