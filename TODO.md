# TODO - Réparation du site VNDX

## Plan approuvé

- [x] Analyse complète du code et identification des erreurs
- [x] Étape 1 : Corriger `src/lib/firebase.ts` (types, paramètres inutilisés)
- [x] Étape 2 : Corriger `src/contexts/authcontext.tsx` (auth initialisé, signOut récursif, try/catch)
- [x] Étape 3 : Corriger `src/components/admin/adminlayout.tsx` (appel useAuth)
- [x] Étape 4 : Corriger `src/data/mock.ts` (imports inutilisés)
- [x] Étape 5 : Corriger `src/lib/supabase.ts` (mock chaînable complet)
- [x] Étape 6 : Rebuild (`npm run build`)
- [x] Étape 7 : Vérification build OK
