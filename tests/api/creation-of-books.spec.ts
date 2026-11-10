import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BookClient } from '../../api-client/BookClient';
import type { Book, CreateBookInput } from '../../models/book.types';

test.describe('FakeRestAPI - Create book with Faker data', () => {
    let bookClient: BookClient;

    test.beforeEach(({ request }) => {
        bookClient = new BookClient(request);
    });

    test('creates a book and returns the submitted data', async () => {
        const payload: CreateBookInput = {
            title: `${faker.commerce.productName()} Guide`,
            description: faker.lorem.paragraph(),
            pageCount: faker.number.int({ min: 50, max: 1000 }),
            excerpt: faker.lorem.sentence(),
            publishDate: faker.date.past().toISOString(),
        };

        const response = await bookClient.createBook(payload);

        expect(response.status()).toBe(200);

        const createdBook: Book = await response.json();
        expect(createdBook.title).toBe(payload.title);
        expect(createdBook.description).toBe(payload.description);
        expect(createdBook.pageCount).toBe(payload.pageCount);
        expect(createdBook.excerpt).toBe(payload.excerpt);
    });
});