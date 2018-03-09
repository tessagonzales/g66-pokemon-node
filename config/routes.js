//Update the name of the controller below and rename the file.
const index = require("../controllers/index.js");


module.exports = function(app){

  //get index page
  app.get('/', index.main);

  //get trainers page
  app.get('/trainers', index.trainersPage)

  //get pokemon page and all pokemon
  app.get('/pokemon', index.pokemonPage)

  //get gym PAGE
  app.get('/gym', index.gymPage)


  /////////POKEMON/////////
  //get pokemon/add page
  app.get('/pokemon/add', index.getPokemonForm)

  // create a pokemon
  app.post('/pokemon/add', index.createPokemon)

  // delete pokemon by id
  app.get('/pokemon/delete/:id', index.deletePokemon)

  //get page to idividual pokemon by id
  app.get('/pokemon/:id', index.onePokemon)

  //get page to edit pokemon
  app.get('/pokemon/edit/:id', index.editPokemon)

  // update pokemon
  app.post('/pokemon/edit/:id', index.editPokemonForm)

  // add to gym and cookie
  app.get('/pokemon/gym/:id', index.addToGym)

  //remove pokemon from gym
  app.get('/pokemon/remove/:id', index.removeFromGym)


  /////////TRAINERS/////////
  // get page to individual trainer by id
  app.get('/trainers/:id', index.oneTrainer)

}
