const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const timestories = [
  {
    "title": "Saudi King Salman Hospitalized for Medical Tests",
    "link": "https://time.com/5868873/saudi-kind-salman-hospitalized/"
    },
    {
    "title": "Iran Executes Man Convicted of Spying on Soleimani",
    "link": "https://time.com/5868856/iran-executed-spy-soleimani/"
    },
    {
    "title": "Kim Jong Un Berates Officials Over Hospital Project",
    "link": "https://time.com/5868844/kim-jong-un-berate-hospital-officials/"
    },
    {
    "title": "Boy, 12, Driving Stolen Truck Leads Police on Chase",
    "link": "https://time.com/5868839/delaware-boy-stolen-truck-police/"
    },
    {
    "title": "N.J. Federal Judge’s Son Killed, Husband Wounded",
    "link": "https://time.com/5868834/new-jersey-federal-judge-shooting/"
    }
];

app.get('/api/timestories', (req, res) => {
  res.send(timestories);
});

app.post('/api/timestories', (req, res) => {
  const { error } = validatetimes(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const times = {
    id: timestories.length + 1,
    name: req.body.name
  };
  timestories.push(times);
  res.send(times);
});

app.put('/api/timestories/:id', (req, res) => {
  const times = timestories.find(c => c.id === parseInt(req.params.id));
  if (!times) return res.status(404).send('The times with the given ID was not found.');

  const { error } = validatetimes(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  times.name = req.body.name; 
  res.send(times);
});

app.delete('/api/timestories/:id', (req, res) => {
  const times = timestories.find(c => c.id === parseInt(req.params.id));
  if (!times) return res.status(404).send('The times with the given ID was not found.');

  const index = timestories.indexOf(times);
  timestories.splice(index, 1);

  res.send(times);
});

app.get('/api/timestories/:id', (req, res) => {
  const times = timestories.find(c => c.id === parseInt(req.params.id));
  if (!times) return res.status(404).send('The times with the given ID was not found.');
  res.send(times);
});

function validatetimes(times) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(times, schema);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));