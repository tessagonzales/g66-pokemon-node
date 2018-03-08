
exports.up = function(knex, Promise) {
  return knex.schema.createTable("trainers",(table)=>{
  table.increments();
  table.string("name");
  table.timestamps(true, true);
})

  .createTable("pokemon",(table)=>{
  table.increments();
  table.string("name");
  table.integer('cp');
  table.boolean("in_gym");
  table.integer("trainer_id")
    .references("id")
    .inTable("trainers")
    .onDelete("CASCADE")
    .index();
  table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trainers')
  .dropTable('pokemon')
};
