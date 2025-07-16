-- Add admin role to a specific user by email
-- Replace 'your-email@example.com' with the actual email address

UPDATE auth.users 
SET raw_user_meta_data = 
  CASE 
    WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
    ELSE raw_user_meta_data || '{"role": "admin"}'::jsonb
  END
WHERE email = 'your-email@example.com';

-- Verify the update
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'your-email@example.com';
