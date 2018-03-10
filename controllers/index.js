var knex = require('../db/knex');

module.exports = {
  //get index page
  main: function(req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  },

  //get trainers page
  trainersPage: (req, res) => {
    knex('trainers')
      .orderBy('id')
      .then((results) => {
        res.render('trainers', {
          trainers: results
        })
      })
  },

  //get pokemon page and all pokemon
  pokemonPage: (req, res) => {
    if (!req.session.gym) {
      req.session.gym = [];
    }

    knex('pokemon')
      .orderBy('id')
      .then((results) => {
        req.session.save(() => {
          console.log('gym:', req.session.gym)
          res.render('pokemon', {
            pokemon: results,
            gym: req.session.gym
          })
        })
      })
  },

  //get gym PAGE
  gymPage: (req, res) => {
    if (!req.session.gym) {
      req.session.gym = [];
    }

    knex('pokemon')
      .then((results) => {
        req.session.save(() => {
          console.log('gym:', req.session.gym);
          res.render('gym', {
            allPokemon: results,
            gym: req.session.gym
          })
        })
      })
  },

  /////////////POKEMON////////////
  //get pokemon/add page
  getPokemonForm: (req, res) => {
    res.render('add_pokemon')
  },

  //create a pokemon
  createPokemon: (req, res) => {
    knex('pokemon')
      .insert({
        name: req.body.name,
        cp: req.body.cp,
        in_gym: false
      }, "*")
      .then((results) => {
        res.redirect('/pokemon')
      })
  },

  // delete pokemon by id
  deletePokemon: (req, res) => {
    knex('pokemon').del()
      .where('id', req.params.id)
      .then(() => {
        res.redirect('/pokemon')
      })
  },

  //get page to idividual pokemon by id
  onePokemon: (req, res) => {
    knex('pokemon')
      .where('id', req.params.id)
      .then((results) => {
        res.render('one_pokemon', {
          onePokemon: results
        })
      })
  },

  //get page to edit pokemon
  editPokemon: (req, res) => {
    knex('pokemon').where('id', req.params.id)
      .then((pokemons) => {
        knex('trainers')
          .then((data) => {
            //console.log(data)
            res.render('edit_pokemon', {
              onePokemon: pokemons,
              trainers: data
            })
          })
      })
  },

  //DOES NOT SHOW CURRENT TRAINER ON DROP DOWN AS FIRST CHOICE
  //update pokemon
  editPokemonForm: (req, res) => {
    knex('pokemon')
      .where('id', req.params.id)
      .update({
        name: req.body.name,
        cp: req.body.cp,
        trainer_id: req.body.trainer_id
      }, '*')
      .then((results) => {
        res.redirect('/pokemon')
      })
  },

  // get page to individual trainer by id
  oneTrainer: (req, res) => {
    knex('trainers')
      .where('id', req.params.id)
      .then((results) => {
        knex('pokemon')
          .where('trainer_id', req.params.id)
          .then((data) => {
            //console.log(data)
            res.render('one_trainer', {
              trainer: results,
              pokemon: data
            })
          })
      })
  },

  // add to gym and cookie
  addToGym: (req, res) => {
    knex('pokemon')
      .where('id', req.params.id)
      .update({
        in_gym: true
      })

      .then((results) => {
        req.session.gym.push(req.params.id)
        res.redirect('/pokemon')
      })
  },

  //remove pokemon from gym
  removeFromGym: (req, res) => {
    let gym = req.session.gym;
    for (let i = 0; i < gym.length; i++) {
      if (gym[i] === req.params.id) {
        gym.splice(i, 1);
      }
    }

    knex('pokemon')
      .where('id', req.params.id)
      .update({
        in_gym: false
      })
      .then(() => {
        req.session.save(() => {
          res.redirect('/pokemon');
        })
      })
  },

  //WTF DOESNT WORRRk
  // POST pokemon from dropdown for battle
  gymBattle: (req, res) => {
    knex('pokemon')
      .where('id', req.params.id)
      .update({
        in_gym: true
      })
      .then(() => {
        req.session.gym.push(req.params.id)

        res.redirect('/gym')
      })
  },




};
