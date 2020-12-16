// Import path module
const path = require('path')
// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})
// Create a table in the database called "books"
knex.schema
  // Make sure no "books" table exists
  // before trying to create new
  .hasTable('students')
    .then((exists) => {
      if (!exists) {
        // If no "books" table exists
        // create new
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record
        return knex.schema.createTable('students', (table)  => {
          table.increments('id').primary()
          table.string('student_id')
          table.string('name')
          table.string('surname')
          table.integer('time')
          table.string("presence");
          table.integer("mark").foreign()
        })
        .then(() => {
          // Log success message
          console.log('Table \'Students\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })
knex.schema
  .hasTable('teachers')
     .then((exists)=>{
       if(!exists){
         return knex.schema.createTable('teachers',(table)=>{
          table.increments('id').primary()
          table.string('email')
          table.string('name')
          table.string('surname')
          table.string('password')
         })
         .then(() => {
          // Log success message
          console.log('Table \'Teachers\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
       }
     })
     .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })
// Just for debugging purposes:
// Log all data in "students" table

// Export the database
module.exports = knex