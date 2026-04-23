// Supabase removed, use Firebase now
// Mock data for pages using old supabase calls
export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        orderBy: () => ({
          limit: () => ({
            then: (cb: (res: {data: any[] }) => void) => cb({ data: [] })

          })
        })
      })
    })
  }),
  auth: {
    signInWithPassword: () => Promise.resolve({ error: new Error('Disabled') }),
    signOut: () => Promise.resolve({})
  }
} as any;
