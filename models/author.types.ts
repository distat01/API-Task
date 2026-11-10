export interface Author {
    id: number;
    idBook: number;
    firstName: string;
    lastName: string;
}

export type CreateAuthorPayload = Omit<Author, 'id'> & { id?: number };
