import { APIRequestContext, APIResponse } from '@playwright/test';
import { CreateAuthorPayload } from '../models/author.types';

export class AuthorClient {
private request: APIRequestContext;

constructor(request: APIRequestContext) {
    this.request = request;
}

async getAllAuthors(): Promise<APIResponse> {
    return await this.request.get('/api/v1/authors');
}

async getAuthorById(authorId: number): Promise<APIResponse> {
    return await this.request.get(`/api/v1/authors/${authorId}`);
    
}

async createAuthor(payload: CreateAuthorPayload): Promise<APIResponse> {
    return await this.request.post('/api/v1/authors', { data: payload });
}

async updateAuthor(authorId: number, payload: CreateAuthorPayload): Promise<APIResponse> {
    return await this.request.put(`/api/v1/authors/${authorId}`, { data: payload });
}

async deleteAuthor(authorId: number): Promise<APIResponse> {
    return await this.request.delete(`/api/v1/authors/${authorId}`);
}
}