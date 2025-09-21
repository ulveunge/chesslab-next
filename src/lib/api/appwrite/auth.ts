import { account, Models } from './appwrite';

export async function initializeAnonymousSession() {
  const transform = (u: Models.User) => {
    return { id: u.$id };
  };

  try {
    const user = await account.get().catch(() => null);

    if (user) {
      const isAnonymous = user.$id && !user.email && !user.phone;

      if (!isAnonymous) return null;

      return transform(user);
    }

    await account.createAnonymousSession();

    const newUser = await account.get();

    return transform(newUser);
  } catch (error) {
    console.error('Failed to initialize anonymous session:', error);
  }
}
