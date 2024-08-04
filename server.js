const express = require('express');
const { use } = require('express/lib/application');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6942;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Hacknet' });
});

app.get('/users/:username',(req,res) => {
  const username = req.params.username;
  res.render('user', { title: `Profile of ${username}`, username: username });
})

app.get('*', function(req, res){
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

