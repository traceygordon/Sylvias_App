const { Client } = require("pg");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;
const client = new Client({
  connectionString:
    process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

require("dotenv").config();

//***************USERS********************
async function createUser({ password, name }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, password) 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [name, await bcrypt.hash(password, 5)]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, {name, password}) {
  try {
    const { rows: [ user ] } = await client.query(`
      UPDATE users
      SET name=$1, password=$2
      WHERE id = $3
      RETURNING *;
    `, [name, password, id]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
          SELECT *
          FROM users;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByName(name) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE name=$1
    `, [ name ]);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that name does not exist"
      }
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=${ id }
    `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    await client.query(
      `
          DELETE FROM users WHERE id=$1;
        `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

//***************BUSES********************
async function createBus({ company, number }) {
  try {
    const {
      rows: [bus],
    } = await client.query(
      `
        INSERT INTO buses(company, number) 
        VALUES($1, $2)
        RETURNING *;
      `,
      [company, number]
    );
  } catch (error) {
    throw error;
  }
}

async function updateBus(id, {company, number}) {
  try {
    const { rows: [ bus ] } = await client.query(`
      UPDATE buses
      SET company=$1, number=$2
      WHERE id = $3
      RETURNING *;
    `, [company, number, id]);

    return bus;
  } catch (error) {
    throw error;
  }
}

async function getAllBuses() {
  try {
    const { rows } = await client.query(`
          SELECT *
          FROM buses;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getBusById(id) {
  try {
    const { rows: [ bus ] } = await client.query(`
      SELECT *
      FROM buses
      WHERE id=${ id }
    `);

    if (!bus) {
      throw {
        name: "UserNotFoundError",
        message: "A bus with that id does not exist"
      }
    }

    return bus;
  } catch (error) {
    throw error;
  }
}

async function deleteBus(id) {
    try {
        await client.query(
          `
              DELETE FROM buses WHERE id=$1;
            `,
          [id]
        );
      } catch (error) {
        throw error;
      }
}

//***************GREETERS********************
async function createGreeter({ 
  name, 
  pickUps}) {
  try {
    const {
      rows: [greeter],
    } = await client.query(
      `
        INSERT INTO greeters(name, pickUps) 
        VALUES($1, $2) 
        RETURNING *;
      `,
      [name, pickUps]
    );

    return greeter;
  } catch (error) {
    throw error;
  }
}

async function updateGreeter(id, {name, pickUps}) {
  try {
    const { rows: [ greeter ] } = await client.query(`
      UPDATE greeters
      SET name=$1, pickUps=$2
      WHERE id = $3
      RETURNING *;
    `, [name, pickUps, id]);

    return greeter;
  } catch (error) {
    throw error;
  }
}

async function getAllGreeters() {
  try {
    const { rows } = await client.query(`
          SELECT *
          FROM greeters;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getGreeterById(id) {
  try {
    const { rows: [ greeter ] } = await client.query(`
      SELECT *
      FROM greeters
      WHERE id=${ id }
    `);

    if (!greeter) {
      throw {
        name: "UserNotFoundError",
        message: "A greeter with that id does not exist"
      }
    }

    return greeter;
  } catch (error) {
    throw error;
  }
}

async function deleteGreeter(id) {
    try {
        await client.query(
          `
              DELETE FROM greeters WHERE id=$1;
            `,
          [id]
        );
      } catch (error) {
        throw error;
      }
}

module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserByName,
  getUserById,
  updateUser,
  deleteUser,
  createBus,
  updateBus,
  getAllBuses,
  getBusById,
  deleteBus,
  createGreeter,
  updateGreeter,
  getAllGreeters,
  getGreeterById,
  deleteGreeter
};
