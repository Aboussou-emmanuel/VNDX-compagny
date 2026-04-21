
/*
  # Sports Agency - Full Schema

  ## Tables Created
  1. `athletes` - Athlete profiles with sport, position, stats, media
  2. `applications` - Recruitment form submissions from athletes
  3. `blog_posts` - News and articles
  4. `partners` - Partner clubs and organizations
  5. `team_members` - Agency team/staff
  6. `testimonials` - Success stories and reviews

  ## Security
  - RLS enabled on all tables
  - Public read access for public-facing data (athletes, blog, partners, testimonials, team)
  - Authenticated (admin) write access for all tables
  - Applications: public insert, authenticated read
*/

-- Athletes table
CREATE TABLE IF NOT EXISTS athletes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  sport text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT '',
  age integer NOT NULL DEFAULT 18,
  level text NOT NULL DEFAULT 'amateur',
  nationality text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  photo_url text NOT NULL DEFAULT '',
  video_url text NOT NULL DEFAULT '',
  stats jsonb NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active athletes"
  ON athletes FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can insert athletes"
  ON athletes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update athletes"
  ON athletes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete athletes"
  ON athletes FOR DELETE
  TO authenticated
  USING (true);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT '',
  age integer NOT NULL DEFAULT 18,
  sport text NOT NULL DEFAULT '',
  level text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT '',
  nationality text NOT NULL DEFAULT '',
  video_url text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit application"
  ON applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read applications"
  ON applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  slug text NOT NULL UNIQUE DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'actualite',
  author text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  logo_url text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'club',
  testimonial text NOT NULL DEFAULT '',
  contact_name text NOT NULL DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active partners"
  ON partners FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can insert partners"
  ON partners FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update partners"
  ON partners FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete partners"
  ON partners FOR DELETE
  TO authenticated
  USING (true);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  photo_url text NOT NULL DEFAULT '',
  linkedin text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active team members"
  ON team_members FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT '',
  sport text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  featured boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active testimonials"
  ON testimonials FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
