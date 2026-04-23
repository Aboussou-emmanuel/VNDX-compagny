-- VNDX Admin user creation and seed data
-- Run: npx supabase db reset --local (or link remote project)

-- Enable RLS policies if needed (example)
ALTER POLICY "Enable all for admins" ON auth.users FOR ALL USING (true);

-- Create admin user Companyvndx@gmail.com (password: 'admin123')
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, phone, confirmation_sent_at, phone_confirmed_at, created_at, updated_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, identity_id, provider, user_deleted_at)
VALUES ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'Companyvndx@gmail.com', crypt('admin123', gen_salt('bf')), now(), null, null, null, now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', null, 'email', null);

-- Enable email auth if not
INSERT INTO auth.identities (id, user_id, identity_data, provider, identity_data_updated_at, last_sign_in_at, created_at, updated_at)
SELECT gen_random_uuid(), id, '{"sub":"" || id::text || "','email','{"email":"Companyvndx@gmail.com"}'::json, 'email', now(), now(), now(), now()
FROM auth.users WHERE email = 'Companyvndx@gmail.com';

-- Sample data for tables (adjust table names from migrations)
INSERT INTO athletes (name, sport, age, level, featured, active) VALUES
('John Doe', 'Football', 22, 'pro', true, true),
('Jane Smith', 'Basketball', 25, 'elite', true, true);

INSERT INTO testimonials (name, role, content, rating, featured, active) VALUES
('Athlete X', 'Football Pro', 'VNDX a transformé ma carrière!', 5, true, true);

-- Admin login: admin@vndx.com / admin123
