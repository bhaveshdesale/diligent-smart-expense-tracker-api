import { describe, it, expect } from "vitest";
import request from "supertest";
import { promises as fs } from "fs";
import path from "path";

import app from "../src/app.js";

describe("Expense API", () => {
  describe("POST /api/v1/expenses", () => {
    it("should create a new expense", async () => {
      const expense = {
        title: "Pizza",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      };

      const response = await request(app)
        .post("/api/v1/expenses")
        .send(expense);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(expense.title);
      expect(response.body.data.amount).toBe(expense.amount);
      expect(response.body.data.category).toBe(expense.category);
      expect(response.body.data.date).toBe(expense.date);
      expect(response.body.data.id).toBeDefined();

      const fileContent = await fs.readFile(
        path.resolve("tests/data/expenses.json"),
        "utf-8",
      );

      const expenses = JSON.parse(fileContent);

      expect(expenses).toHaveLength(1);
      expect(expenses[0].title).toBe("Pizza");
    });
    it("should reject an expense with an empty title", async () => {
      const response = await request(app).post("/api/v1/expenses").send({
        title: "",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should reject an expense with an invalid amount", async () => {
      const response = await request(app).post("/api/v1/expenses").send({
        title: "Pizza",
        amount: -100,
        category: "Food",
        date: "2026-07-31",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
    it("should reject an expense with an invalid date", async () => {
      const response = await request(app).post("/api/v1/expenses").send({
        title: "Pizza",
        amount: 250,
        category: "Food",
        date: "31-07-2026",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
    describe("GET /api/v1/expenses", () => {
      it("should return all expenses", async () => {
        await request(app).post("/api/v1/expenses").send({
          title: "Pizza",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

        await request(app).post("/api/v1/expenses").send({
          title: "Movie",
          amount: 500,
          category: "Entertainment",
          date: "2026-07-31",
        });

        const response = await request(app).get("/api/v1/expenses");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);
      });
    });

    it("should return expenses filtered by category", async () => {
      await request(app).post("/api/v1/expenses").send({
        title: "Pizza",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/v1/expenses").send({
        title: "Movie",
        amount: 500,
        category: "Entertainment",
        date: "2026-07-31",
      });

      const response = await request(app).get("/api/v1/expenses?category=Food");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe("Food");
    });

    describe("GET /api/v1/expenses/total", () => {
      it("should calculate the total amount of all expenses", async () => {
        await request(app).post("/api/v1/expenses").send({
          title: "Pizza",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

        await request(app).post("/api/v1/expenses").send({
          title: "Movie",
          amount: 500,
          category: "Entertainment",
          date: "2026-07-31",
        });

        const response = await request(app).get("/api/v1/expenses/total");

        expect(response.status).toBe(200);
        expect(response.body.data.total).toBe(750);
      });
    });

    it("should calculate the total for a specific category", async () => {
      await request(app).post("/api/v1/expenses").send({
        title: "Pizza",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/v1/expenses").send({
        title: "Burger",
        amount: 150,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/v1/expenses").send({
        title: "Movie",
        amount: 500,
        category: "Entertainment",
        date: "2026-07-31",
      });

      const response = await request(app).get(
        "/api/v1/expenses/total?category=Food",
      );

      expect(response.status).toBe(200);
      expect(response.body.data.total).toBe(400);
    });

    describe("DELETE /api/v1/expenses/:id", () => {
      it("should delete an existing expense", async () => {
        const created = await request(app).post("/api/v1/expenses").send({
          title: "Pizza",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

        const id = created.body.data.id;

        const response = await request(app).delete(`/api/v1/expenses/${id}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });

    it("should return 404 when deleting a non-existent expense", async () => {
      const response = await request(app).delete(
        "/api/v1/expenses/550e8400-e29b-41d4-a716-446655440000",
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    describe("GET /api/v1/health", () => {
      it("should return API health status", async () => {
        const response = await request(app).get("/api/v1/health");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });
});
