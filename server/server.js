const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/user-routes');

// - Express middleware configuring format exchange as json - //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// - If in production mode, serve statics from build directory - //
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// - Set up API user routes as Express middleware - //
app.use('/api/', userRoutes);

// - Initialize the server instance at PORT - //
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);