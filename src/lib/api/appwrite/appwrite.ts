import {
  Client,
  Account,
  Databases,
  Models,
  ID,
  Query,
  RealtimeResponseEvent,
} from 'appwrite';

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

  async getById(id: string): Promise<T> {
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

  async get<
    P extends { limit: number; offset: number } | undefined = undefined,
  >({
    queries = [],
    pagination,
  }: {
    queries?: string[];
    pagination?: P;
  } = {}): Promise<
    P extends undefined
      ? T[]
      : {
          items: T[];
          total: number;
          remaining: number;
          hasMore: boolean;
          page: number;
          pageCount: number;
        }
  > {
    const res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      this.collectionId,
      [
        ...(pagination
          ? [Query.limit(pagination.limit), Query.offset(pagination.offset)]
          : []),
        ...queries,
      ],
    );

    if (pagination) {
      return {
        items: res.documents as unknown as T[],
        total: res.total,
        remaining: Math.max(
          res.total - (pagination.offset + res.documents.length),
          0,
        ),
        hasMore: pagination.offset + pagination.limit < res.total,
        page: Math.floor(pagination.offset / pagination.limit) + 1,
        pageCount: Math.ceil(res.total / pagination.limit),
      } as unknown as Promise<
        P extends undefined
          ? T[]
          : {
              items: T[];
              total: number;
              remaining: number;
              hasMore: boolean;
              page: number;
              pageCount: number;
            }
      >;
    }

    return res.documents as unknown as Promise<
      P extends undefined
        ? T[]
        : {
            items: T[];
            total: number;
            remaining: number;
            hasMore: boolean;
            page: number;
            pageCount: number;
          }
    >;
  }

  subscribe({
    id,
    callback,
  }: {
    callback: (event: RealtimeResponseEvent<T>) => void;
    id?: string;
  }) {
    const channel = `databases.${APPWRITE_DATABASE_ID}.collections.${this.collectionId}.documents${
      id ? `.${id}` : ''
    }`;

    return client.subscribe(channel, callback);
  }
}

export { ID, Query, type Models } from 'appwrite';
