# Swagger Simple API

A clean and minimal project using **Express.js** and **TypeScript** with automated Swagger documentation generation from JSDoc and DTOs.

---

## 📌 Features

- Built with **Express.js** and **TypeScript**
- Auto documentation using **swagger-jsdoc**
- Generate **JSON Schemas** from DTOs via `ts-json-schema-generator`
- Automatic flattening for Swagger UI compatibility
- Full CRUD endpoints for `/users`
- Interactive Swagger UI available at `/docs`

---

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
```

### Run the project

```bash
pnpm dev
```

App will be running at `http://localhost:3000`

---

## 📄 Swagger API Docs

Visit the following URL to access the live Swagger UI:

```
http://localhost:3000/docs
```

You will see all API routes, parameters, responses, and models.

---

## 🛠 Generate JSON Schema Automatically

To generate schema files from your TypeScript DTOs, run:

```bash
pnpm generate:schema
```

This command will automatically:

1. Detect all `export interface` or `export type` names ending with `Dto`
2. Generate a `.schema.json` file for each DTO
3. Flatten them to remove `$ref` and make them ready for Swagger

---

## 📁 Project Structure

- `src/types/*.ts`: DTO definitions
- `schema/*.schema.json`: Auto-generated schemas
- `scripts/generate-all-schemas.ts`: Schema generation script
- `src/swagger.ts`: Swagger setup and schema registration
