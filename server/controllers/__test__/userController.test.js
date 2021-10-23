const request = require("supertest");
const app = require("../../app");
const db = require("../../utils/database");

describe("User controller ", () => {
  describe("Register user", () => {
    it("should register a user succesfully [status 200]", async () => {
      const response = await request(app)
        .post("/register")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: `doe${Math.random() * 100}@example.com`,
          password: "password",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "User registered successfully",
      });
    });

    it("should throw an error if the user is already registered [status 401]", async () => {
      const randomEmail = `doe${Math.random() * 100}@example.com`;

      const firstRegisterResponse = await request(app).post("/register").send({
        first_name: "John",
        last_name: "Doe",
        email: randomEmail,
        password: "password",
      });

      expect(firstRegisterResponse.status).toBe(200);
      expect(firstRegisterResponse.body).toEqual({
        message: "User registered successfully",
      });

      const secondRegisterResponse = await request(app).post("/register").send({
        first_name: "John",
        last_name: "Doe",
        email: randomEmail,
        password: "password",
      });

      expect(secondRegisterResponse.status).toBe(401);
      expect(secondRegisterResponse.body).toEqual({
        message: "The email provided is already registered.",
      });
    });
  });

  describe("Log user", () => {
    it("should log in a user successfully [status 200]", async () => {
      const randomEmail = `doe${Math.random() * 100}@example.com`;

      await request(app).post("/register").send({
        first_name: "Mary",
        last_name: "Jane",
        email: randomEmail,
        password: "password",
      });

      const response = await request(app).post("/login").send({
        email: randomEmail,
        password: "password",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Welcome back!" });
    });

    it("should throw an error if no email or password is provided [status 400]", async () => {
      const randomEmail = `doe${Math.random() * 100}@example.com`;

      const response = await request(app).post("/login").send({
        email: randomEmail,
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Password and/or email is missing in request!",
      });
    });

    it("should throw an error if email and/or password do not match [status 401]", async () => {
      const randomEmail = `doe${Math.random() * 100}@example.com`;

      await request(app).post("/register").send({
        first_name: "Mary",
        last_name: "Jane",
        email: randomEmail,
        password: "password",
      });

      const response = await request(app).post("/login").send({
        email: randomEmail,
        password: "notGoodPassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Provided email and/or password do not match!",
      });
    });
  });
});
