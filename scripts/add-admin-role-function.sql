-- Create a function to easily add admin role to users
CREATE OR REPLACE FUNCTION add_admin_role(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Check if user exists
  SELECT COUNT(*) INTO user_count
  FROM auth.users
  WHERE email = user_email;
  
  IF user_count = 0 THEN
    RETURN 'User not found with email: ' || user_email;
  END IF;
  
  -- Update user metadata to include admin role
  UPDATE auth.users 
  SET raw_user_meta_data = 
    CASE 
      WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
      ELSE raw_user_meta_data || '{"role": "admin"}'::jsonb
    END
  WHERE email = user_email;
  
  RETURN 'Admin role successfully added to: ' || user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage example:
-- SELECT add_admin_role('your-email@example.com');
