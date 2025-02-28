// require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET || "shhh";

const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:2182@localhost:5432/sylvias_app_db",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

async function createUser({ password, name }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, password) 
        VALUES($1, $2) 
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
      `,
      [name, await bcrypt.hash(password, 5)]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// async function updateUser(){}

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

async function createBus({ company, number }) {
  try {
    const {
      rows: [bus],
    } = await client.query(
      `
        INSERT INTO posts(company, number) 
        VALUES($1, $2)
        RETURNING *;
      `,
      [company, number]
    );
  } catch (error) {
    throw error;
  }
}

// async function updateBus(){}

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

async function createGreeter({ password, name }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(name, password) 
        VALUES($1, $2) 
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
      `,
      [name, await bcrypt.hash(password, 5)]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// async function updateGreeter(){}

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

async function deleteGreeter() {
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
  // updateUser,
  getAllUsers,
  deleteUser,
  createBus,
  // updateBus,
  getAllBuses,
  deleteBus,
  createGreeter,
  // updateGreeter,
  getAllGreeters,
  deleteGreeter,
};
