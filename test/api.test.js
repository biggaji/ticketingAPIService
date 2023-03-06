const apiServer = require("../index");
const request = require("supertest");

describe(`/v1/tickets`, function() {
  it("book a ticket", async() => {
    const response = await request(apiServer).post(`/v1/tickets/book`).set('devApiKey', "1ef7427e25e25c65612cf265f2edf42cbc5838bca194fae0fb4fead8f6de6cc5")
    .set("Accept", "application/json").send({
      passenger_name: "Shola",
      passenger_email: "shola@mail.io",
      train_id: "T449",
      class: "FIRST"
    });

    expect(response.body).toHaveProperty("status", "success");
    expect(response).toHaveProperty("statusCode", 201);
  })

  it("should not book a ticket", async() => {
    const response = await request(apiServer).post(`/v1/tickets/book`).set('devApiKey', "1ef7427e25e25c65612cf265f2edf42cbc5838bca194fae0fb4fead8f6de6cc5")
    .set("Accept", "application/json").send({
      passenger_name: "Shola",
      passenger_email: "shola@mail.io",
      train_id: "T4T7",
      class: "FIRST"
    });

    expect(response.body).toHaveProperty("status", "error");
    expect(response).toHaveProperty("statusCode", 500);
  })
})


describe(`/v1/trains`, function() {
  it("fetch a train schd", async() => {
    const response = await request(apiServer).get(`/v1/trains/T449/schedules`).set('devApiKey', "1ef7427e25e25c65612cf265f2edf42cbc5838bca194fae0fb4fead8f6de6cc5")
    .set("Accept", "application/json")

    expect(response.body).toHaveProperty("status", "success");
    expect(response).toHaveProperty("statusCode", 200);
    expect(response.body.data).not.toBeNull();

  })
})