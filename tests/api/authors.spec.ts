import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AuthorClient } from '../../api-client/AuthorClient';
import type { Author, CreateAuthorPayload } from '../../models/author.types';

test.describe('FakeRestAPI Authors API', () => {
    let authorClient: AuthorClient;

    test.beforeEach(({ request }) => {
        authorClient = new AuthorClient(request);
    });

    test('GET /api/v1/Authors - retrieves all authors', async () => {
        const response = await authorClient.getAllAuthors();

        expect(response.status()).toBe(200);

        const authors: Author[] = await response.json();
        expect(Array.isArray(authors)).toBe(true);
        expect(authors.length).toBeGreaterThan(0);
    });

    test('GET /api/v1/Authors/{id} - retrieves a seeded author', async () => {
        const response = await authorClient.getAuthorById(1);

        expect(response.status()).toBe(200);

        const author: Author = await response.json();
        expect(author.id).toBe(1);
        expect(author.firstName).toBeTruthy();
        expect(author.lastName).toBeTruthy();
    });

    test('POST /api/v1/Authors - creates an author and returns its data', async () => {
        const payload: CreateAuthorPayload = {
            id: faker.number.int({ min: 1000, max: 9999 }),
            idBook: 1,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        };

        const response = await authorClient.createAuthor(payload);

        expect(response.status()).toBe(200);

        const createdAuthor: Author = await response.json();
        expect(createdAuthor.id).toBe(payload.id);
        expect(createdAuthor.idBook).toBe(payload.idBook);
        expect(createdAuthor.firstName).toBe(payload.firstName);
        expect(createdAuthor.lastName).toBe(payload.lastName);
    });

    test('PUT /api/v1/Authors/{id} - updates a seeded author and returns its data', async () => {
        const payload: CreateAuthorPayload = {
            id: 1,
            idBook: 1,
            firstName: 'Updated First Name',
            lastName: 'Updated Last Name',
        };

        const response = await authorClient.updateAuthor(1, payload);

        expect(response.status()).toBe(200);

        const updatedAuthor: Author = await response.json();
        expect(updatedAuthor.id).toBe(1);
        expect(updatedAuthor.firstName).toBe(payload.firstName);
        expect(updatedAuthor.lastName).toBe(payload.lastName);
    });

    test('DELETE /api/v1/Authors/{id} - deletes a seeded author', async () => {
        const response = await authorClient.deleteAuthor(1);

        expect(response.status()).toBe(200);
    });
    test('GET /api/v1/Authors/{id} - returns not found for an unknown ID', async () => {
        const response = await authorClient.getAuthorById(1000);

        expect(response.status()).toBe(404);
    });

    test('GET /api/v1/Authors/{id} - rejects a non-numeric ID', async ({ request }) => {
        const response = await request.get('/api/v1/Authors/not-a-number');

        expect(response.status()).toBe(400);
    });
});