const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// move requiring routes here
const routes = require('./routes')
const userRoutes = require('./routes/users.js');
const thoughtRoutes = require('./routes/thoughts.js');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Use api routes
app.use(routes);

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('DB Connected!'))
.catch(error => {
 console.log('DB Connection Error: ' + error);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
