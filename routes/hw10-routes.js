// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
const express = require('express');
const router = express.Router();
const db = require('../db');

function buildPage(monsters, message, error, battle) {
    const roster = monsters.map((monster) =>
        `<div class="monster-card">
                        <h1>${monster.name}</h1>
                        <h2>Species: ${monster.species}</h2>
                        <p>Attack: ${monster.attack} </p>
                        <p>Defense: ${monster.defense}</p>
                        <p>Hp: ${monster.hp}</p>
                        <p>ID: ${monster.id}</p>

        </div>`).join("\n");

    const results = battle? `
    <div class="battle-results">
      <h3>Battle Results</h3>
        <p> 
        <em>${battle.a.name} </em>
         <em>${battle.a.species} </em>
         <em>${battle.a.attack} </em>
         <em>${battle.a.defense} </em>
         <em>${battle.a.hp} </em>
         <em>${battle.scoreA} </em> 
         </p>
        <p>
         <em> ${battle.b.name} </em>
         <em>${battle.b.species} </em>
         <em>${battle.b.attack} </em>
         <em>${battle.b.defense} </em>
         <em>${battle.b.hp} </em>
         <em>${battle.scoreB} </em> 
         </p>
        <p class="winner"> ${battle.winner}</p>
    </div>`: '';

  return(
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HW10: Monster Arena</title>
  <link rel="stylesheet" href="/hw10/css/hw10.css">
</head>
<body>
    <h1>Monster Arena</h1>
    ${message ? `<p class="banner-success">${message}</p>` : ''}
    ${error ? `<p class="banner-error">${error}</p>` : ''}
    ${results}

    <div class="monster-roster">
     <h2> Monster Roster (${monsters.length})</h2>
     <div class="roster-grid">
       ${roster || `<p>Vacant arena </p>`}
     </div>
    </div>

    <form class="recruit-form" action="/hw10/recruit" method="POST">
     <label> Name
      <input type="text" name="name" required>
     </label>
     <label> Species
      <input type="text" name="species" required>
     </label>
     <label> Attack
      <input type="number" name="attack" required>
     </label>
     <label> Defense
      <input type="number"  name="defense" required>
     </label>
     <label> HP
      <input type="number" name ="hp" required>
     </label>
      <button type="submit">Recruit</button>
    </form>

    <form class="retire-form" action="/hw10/retire" method="POST">
    <h3>Retire Form</h3>
     <label>ID
      <input type="number" name="id" required>
     </label>
      <button type="submit">Retire</button>
    </form>

    <form class="battle-form" action="/hw10/battle" method="POST">
      <button type="submit">Battle!</button>
     </form>

</body>
</html>`);
}

router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});
router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});
router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});
router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html   = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;