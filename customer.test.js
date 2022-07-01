"use strict";

const request = require("supertest");
const app = require('./app');
const db = require('./db');

let customer;

beforeEach(async function() {
    await db.query(`DELETE FROM reservations`);
    await db.query(`DELETE FROM customers`);
    const results = await db.query(
        `INSERT INTO customers
            (first_name,
            last_name,
            phone,
            notes)
             VALUES ('tFirstName','tLastName','tPhone','tNotes')
             RETURNING id, first_name, last_name, phone, notes`
    );

    customer = results.rows[0];
});

afterAll(async function() {
    await db.end();
})

describe('GET /', function() {
    test('gets all customers', async function() {
        const resp = await request(app).get('/');
        expect(resp.text).toContain(customer.first_name);
    });
});

describe('POST/', function() {
    test("tests adding customer", async function()  {
        const response = await request(app)
        .post('/add')
        .send({firstName:"dan",lastName:"sark",phone:"2487074232",notes:"please work"})
    //console.log(response)
    expect(response.status).toEqual(302)
    })
})
