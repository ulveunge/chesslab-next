import { Client, Account, Databases, Models, ID } from 'appwrite';

export const client = new Client();

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export class Collection<T extends object> {
  private collectionId: string;

  constructor(collectionId: string) {
    this.collectionId = collectionId;
  }

  async create(
    data: Omit<T, keyof Models.Document>,
    id: string = ID.unique(),
  ): Promise<T> {
    return databases.createDocument(
      APPWRITE_DATABASE_ID,
      this.collectionId,
      id,
      data,
    ) as T;
  }

  async get(id: string): Promise<T> {
    return databases.getDocument(
      APPWRITE_DATABASE_ID,
      this.collectionId,
      id,
    ) as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return databases.updateDocument(
      APPWRITE_DATABASE_ID,
      this.collectionId,
      id,
      data,
    ) as T;
  }

  async delete(id: string): Promise<void> {
    await databases.deleteDocument(APPWRITE_DATABASE_ID, this.collectionId, id);
  }

  async list(queries: string[] = []): Promise<T[]> {
    const res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      this.collectionId,
      queries,
    );
    return res.documents as T[];
  }
}

export { ID, Query, type Models } from 'appwrite';
