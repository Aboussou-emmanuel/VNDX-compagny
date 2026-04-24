// Supabase removed, use Firebase now
// Mock data for pages using old supabase calls

function createQueryBuilder() {
  const chain = {
    select: () => chain,
    eq: () => chain,
    order: () => chain,
    orderBy: () => chain,
    limit: () => chain,
    then: (cb: (res: { data: any[]; count?: number | null }) => any) => Promise.resolve(cb({ data: [], count: 0 })),
    insert: () => Promise.resolve({ error: null }),
    update: () => ({
      eq: () => Promise.resolve({ error: null }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ error: null }),
    }),
  };
  return chain;
}

export const supabase = {
  from: () => createQueryBuilder(),
  auth: {
    signInWithPassword: () => Promise.resolve({ error: new Error('Disabled') }),
    signOut: () => Promise.resolve({}),
  },
} as any;

