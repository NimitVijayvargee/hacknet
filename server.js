const express = require('express');
const { use } = require('express/lib/application');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6942;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/users/:username',(req,res) => {
   const username = req.params.username;
   res.send(`ID: ${username}`)
})

app.get('')

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
