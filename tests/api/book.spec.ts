import { test, expect } from '@playwright/test';
import { BookClient } from '../../api-client/BookClient';
import type { Book, CreateBookInput } from '../../models/book.types';

test.describe('FakeRestAPI Books API', () => {
    let bookClient: BookClient;

    test.beforeEach(({ request }) => {
        bookClient = new BookClient(request);
    });

    test('GET /api/v1/Books - retrieves all books', async () => {
        const response = await bookClient.getAllBooks();

        expect(response.status()).toBe(200);

        const books: Book[] = await response.json();
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBeGreaterThan(0);
    });

    test('GET /api/v1/Books/{id} - retrieves a seeded book', async () => {
        const response = await bookClient.getBookById(1);

        expect(response.status()).toBe(200);

        const book: Book = await response.json();
        expect(book.id).toBe(1);
        expect(book.title).toBe('Book 1');
    });

    test('POST /api/v1/Books - creates a book and returns its data', async () => {
        const payload: CreateBookInput = {
            title: 'API test book',
            description: 'A book created by an API test.',
            pageCount: 250,
            excerpt: 'Test excerpt.',
            publishDate: '2026-01-01T00:00:00.000Z',
        };

        const response = await bookClient.createBook(payload);

        expect(response.status()).toBe(200);

        const createdBook: Book = await response.json();
        expect(createdBook.title).toBe(payload.title);
        expect(createdBook.description).toBe(payload.description);
        expect(createdBook.pageCount).toBe(payload.pageCount);
        expect(createdBook.excerpt).toBe(payload.excerpt);
    });

    test('PUT /api/v1/Books/{id} - updates a seeded book and returns its data', async () => {
        const payload: Book = {
            id: 1,
            title: 'Updated API test book',
            description: 'Updated description.',
            pageCount: 300,
            excerpt: 'Updated excerpt.',
            publishDate: '2026-02-01T00:00:00.000Z',
        };

        const response = await bookClient.updateBook(1, payload);

        expect(response.status()).toBe(200);

        const updatedBook: Book = await response.json();
        expect(updatedBook.id).toBe(1);
        expect(updatedBook.title).toBe(payload.title);
        expect(updatedBook.pageCount).toBe(payload.pageCount);
    });

    test('DELETE /api/v1/Books/{id} - deletes a seeded book', async () => {
        const response = await bookClient.deleteBook(1);

        expect(response.status()).toBe(200);
    });
    test('GET /api/v1/Books/{id} - returns not found for an unknown ID', async () => {
        const response = await bookClient.getBookById(201);

        expect(response.status()).toBe(404);
    });
    test('GET /api/v1/Books/{id} - returns not found for IDs outside the seeded range', async () => {
        for (const id of [0, 201]) {
            const response = await bookClient.getBookById(id);
            expect(response.status(), `Expected ID ${id} to be absent`).toBe(404);
        }
    });

    test('GET /api/v1/Books/{id} - rejects a non-numeric ID', async ({ request }) => {
        const response = await request.get('/api/v1/Books/not-a-number');

        expect(response.status()).toBe(400);
    });
});