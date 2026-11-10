import { APIRequestContext, APIResponse } from '@playwright/test';
import type { CreateBookInput, Book } from '../models/book.types';

export class BookClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllBooks(): Promise<APIResponse> {
        return await this.request.get('/api/v1/books');
    }
async getBookById(bookId: number): Promise<APIResponse> {
    return await this.request.get(`/api/v1/books/${bookId}`);
}
    async createBook(payload: CreateBookInput): Promise<APIResponse> {
        return await this.request.post('/api/v1/books', { data: payload });
    }

 async updateBook(bookId: number, payload: Book): Promise<APIResponse> {
  return await this.request.put(`/api/v1/books/${bookId}`, { data: payload });
}

    async deleteBook(bookId: number): Promise<APIResponse> {
        return await this.request.delete(`/api/v1/books/${bookId}`);
    }
}
