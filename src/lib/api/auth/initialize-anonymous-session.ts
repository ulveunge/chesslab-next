import { account, Models } from '@/lib/appwrite/browser';

export default async function initializeAnonymousSession() {
  const toUser = (u: Models.User) => ({ id: u.$id });

  try {
    const current = await account.get().catch(() => null);

    if (current) {
      const isAnonymous = !current.email && !current.phone;
      return isAnonymous ? toUser(current) : null;
    }

    await account.createAnonymousSession();
    return toUser(await account.get());
  } catch (err) {
    console.error('Failed to initialize anonymous session:', err);
    return null;
  }
}
