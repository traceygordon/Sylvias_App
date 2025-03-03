const {
  client,
  createUser,
//   updateUser,
  getAllUsers,
  deleteUser,
  createBus,
//   updateBus,
  getAllBuses,
  deleteBus,
  createGreeter,
//   updateGreeter,
  getAllGreeters,
  deleteGreeter,
} = require("./index");

async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS greeter_buses;
        DROP TABLE IF EXISTS greeters;
        DROP TABLE IF EXISTS buses;
        DROP TABLE IF EXISTS users;
      `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          admin boolean DEFAULT false
        );
  
        CREATE TABLE buses (
          id SERIAL PRIMARY KEY,
          company varchar(255) NOT NULL,
          number varchar(255) NOT NULL
        );
  
        CREATE TABLE greeters (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          pickUps INTEGER REFERENCES buses(id)
        );

        CREATE TABLE greeter_buses (
        id SERIAL PRIMARY KEY,
        busId INTEGER REFERENCES buses(id) ON DELETE CASCADE,
        greeterId INTEGER REFERENCES greeters(id)
      );
      `);
  } catch (error) {
    console.log(error);
  }
}

async function createInitialUsers() {
    try {
  
      await createUser({ 
        name: 'Tracey', 
        password: 'password',
      });

      await createUser({ 
        name: 'Sylvia', 
        password: 'argentina',
      });
      
    } catch (error) {
      throw error;
    }
  }

  async function createInitialBuses() {
    try {
  
      await createBus({ 
        company: 'Happy Days', 
        number: '101'
      });

      await createBus({ 
        company: 'Beep Beep', 
        number: '245'
      });

      await createBus({ 
        company: 'Busy Buses', 
        number: '009'
      });
      
    } catch (error) {
      throw error;
    }
  }
  
async function createInitialGreeters() {
    try {
  
      await createGreeter({ 
        name: 'Ms. Frizzle', 
        pickUp: 1
      });

      await createGreeter({ 
        name: 'Ms. Jessica', 
        pickUp: 2
      });
      
    } catch (error) {
      throw error;
    }
  }

  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialBuses();
      await createInitialGreeters();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  };

  rebuildDB();