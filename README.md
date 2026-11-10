# FakeRestAPI Bookstore API Tests

API automation tests for the Books and Authors endpoints of [FakeREST API](https://fakerestapi.azurewebsites.net), built with Playwright Test, TypeScript, and Faker.

## Requirements

- Node.js
- npm

## Setup

Install project dependencies:

```bash
npm install
```

## Running tests

Run the API test project:

```bash
npx playwright test --project=api
```

List tests assigned to the API project without running them:

```bash
npx playwright test --project=api --list
```

## Test report

The Playwright HTML reporter is configured in `playwright.config.ts`. After running tests, open the report with:

```bash
npx playwright show-report
```

The report summarizes the run and shows the status of each test. Playwright writes the report to `playwright-report/`.

For CI/CD, publish `playwright-report/` as a workflow artifact so the report remains available after the job completes.

## API coverage

### Books

| Method | Endpoint | Coverage |
|---|---|---|
| GET | `/api/v1/Books` | Retrieve all books |
| GET | `/api/v1/Books/{id}` | Retrieve a seeded book by ID; check unknown and invalid IDs |
| POST | `/api/v1/Books` | Create a book and verify the response data |
| PUT | `/api/v1/Books/{id}` | Update a seeded book and verify the response data |
| DELETE | `/api/v1/Books/{id}` | Check the delete endpoint response |

### Authors

| Method | Endpoint | Coverage |
|---|---|---|
| GET | `/api/v1/Authors` | Retrieve all authors |
| GET | `/api/v1/Authors/{id}` | Retrieve a seeded author by ID; check unknown and invalid IDs |
| POST | `/api/v1/Authors` | Create an author with Faker data and verify the response |
| PUT | `/api/v1/Authors/{id}` | Update a seeded author and verify the response |
| DELETE | `/api/v1/Authors/{id}` | Check the delete endpoint response |

## Project structure

```text
api-client/
  AuthorClient.ts
  BookClient.ts
models/
  author.types.ts
  book.types.ts
tests/
  api/
    authors.spec.ts
    book.spec.ts
    creation-of-books.spec.ts
playwright.config.ts
package.json
```

- `api-client/` contains reusable API request methods.
- `models/` defines TypeScript types for request and response data.
- `tests/api/` contains the API tests.
- `playwright.config.ts` sets the API base URL, configures the HTML reporter, and assigns API tests to the `api` project.

## About the hosted demo API

The hosted FakeREST API is a demo service and may not persist POST, PUT, or DELETE changes between requests. Tests therefore check each endpoint response independently; they do not assume that a created record can be fetched later or that an update or deletion changes a subsequent response. This is endpoint coverage, not a persisted end-to-end CRUD lifecycle.