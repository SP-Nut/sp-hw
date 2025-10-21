-- Add is_popular column to products table
ALTER TABLE products 
ADD COLUMN is_popular BOOLEAN DEFAULT false;

-- Create index for better performance when querying popular products
CREATE INDEX idx_products_is_popular ON products(is_popular);

-- Add comment to explain the column
COMMENT ON COLUMN products.is_popular IS 'Flag to mark product as popular/featured on homepage';
