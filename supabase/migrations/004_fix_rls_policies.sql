-- Migration: Fix RLS policies for admin operations
-- File: 004_fix_rls_policies.sql

-- Disable RLS for products table to allow admin operations
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Disable RLS for categories table
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Disable RLS for brands table  
ALTER TABLE brands DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
GRANT ALL ON products TO authenticated;
GRANT ALL ON categories TO authenticated; 
GRANT ALL ON brands TO authenticated;

-- Grant sequence permissions
GRANT USAGE, SELECT ON SEQUENCE products_id_seq TO authenticated;

-- Verify changes
DO $$
BEGIN
    RAISE NOTICE 'RLS Status:';
    RAISE NOTICE 'Products: %', (SELECT rowsecurity FROM pg_tables WHERE tablename = 'products' AND schemaname = 'public');
    RAISE NOTICE 'Categories: %', (SELECT rowsecurity FROM pg_tables WHERE tablename = 'categories' AND schemaname = 'public');  
    RAISE NOTICE 'Brands: %', (SELECT rowsecurity FROM pg_tables WHERE tablename = 'brands' AND schemaname = 'public');
END $$;