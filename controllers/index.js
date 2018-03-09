var knex = require('../db/knex');

module.exports = {
  //get index page
  main: function(req, res, next) {
    res.render('index', { title: 'Express' });
  },

  //get trainers page
  trainersPage: (req, res) => {
    knex('trainers')
    .orderBy('id')
    .then((results)=>{
      res.render('trainers', {trainers:results})
    })
  },

  //get pokemon page and all pokemon
  pokemonPage: (req, res)=>{
    if(!req.session.gym){
      req.session.gym= {};
    }

    knex('pokemon')
    .orderBy('id')
    .then((results)=>{
      console.log('gym:', req.session.gym)
      res.render('pokemon', {pokemon:results, gym:req.session.gym})
    })
  },

  //get gym PAGE
  gymPage: (req, res)=> {
    res.render('gym')
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
      .then((results)=>{
          res.redirect('/pokemon')
      })
  },

// delete pokemon by id
  deletePokemon: (req, res) =>{
    knex('pokemon').del()
    .where('id', req.params.id)
    .then(()=>{
      res.redirect('/pokemon')
    })
  },

  //get page to idividual pokemon by id
  onePokemon: (req, res) => {
    knex('pokemon')
    .where('id', req.params.id)
    .then((results)=>{
      res.render('one_pokemon', {onePokemon:results})
    })
  },

  //get page to edit pokemon
  editPokemon: (req, res) => {
    knex('pokemon').where('id', req.params.id)
    .then((pokemons)=>{
      knex('trainers')
        .then((data)=>{
            //console.log(data)
            res.render('edit_pokemon', {onePokemon:pokemons, trainers:data})
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
    .then((results)=>{
        res.redirect('/pokemon')
    })
  },

// get page to individual trainer by id
oneTrainer: (req, res) => {
  knex('trainers')
  .where('id', req.params.id)
  .then((results)=> {
  knex('pokemon')
  .where('trainer_id', req.params.id)
  .then((data)=>{
    //console.log(data)
    res.render('one_trainer', {trainer:results, pokemon:data})
  })
  })
},

//WTF IS GOING ONNNNNNNNNNNN
// add to gym and cookie
addToGym: (req, res) => {
  knex('pokemon')
  .where('id', req.params.id)
  .then((results)=>{
    req.session.gym = results[0]
    req.session.save(()=>{
      res.redirect('/pokemon')
    })
  })
},


};
