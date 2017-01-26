
//List all consultants
app.get('/affectation', (req, res) => {
  db.Affectation.findAll()
  .then((affectation) => res.json(affectation))
})

//app.get('/affectation')