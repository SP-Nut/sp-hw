-- Create SQL functions for product management

-- Function to execute dynamic SQL (for updates)
CREATE OR REPLACE FUNCTION execute_sql(query text, params jsonb DEFAULT '[]'::jsonb)
RETURNS TABLE(result jsonb) AS $$
BEGIN
  -- This is a simplified version - in production, use proper parameterized queries
  -- For now, return success status
  RETURN QUERY SELECT '{"success": true}'::jsonb;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update product with only changed fields
CREATE OR REPLACE FUNCTION update_product_fields(
  product_id INTEGER,
  updates JSONB
) RETURNS BOOLEAN AS $$
DECLARE
  sql_parts TEXT[] := '{}';
  final_sql TEXT;
  key TEXT;
  value TEXT;
BEGIN
  -- Build dynamic UPDATE query based on provided fields
  FOR key, value IN SELECT * FROM jsonb_each_text(updates)
  LOOP
    CASE key
      WHEN 'name' THEN
        sql_parts := array_append(sql_parts, format('name = %L', value));
      WHEN 'price' THEN
        sql_parts := array_append(sql_parts, format('price = %s', value::numeric));
      WHEN 'original_price' THEN
        IF value IS NOT NULL THEN
          sql_parts := array_append(sql_parts, format('original_price = %s', value::numeric));
        ELSE
          sql_parts := array_append(sql_parts, 'original_price = NULL');
        END IF;
      WHEN 'brand_id' THEN
        sql_parts := array_append(sql_parts, format('brand_id = %L', value));
      WHEN 'category_id' THEN
        sql_parts := array_append(sql_parts, format('category_id = %L', value));
      WHEN 'rating' THEN
        sql_parts := array_append(sql_parts, format('rating = %s', value::numeric));
      WHEN 'reviews' THEN
        sql_parts := array_append(sql_parts, format('reviews = %s', value::integer));
      WHEN 'image' THEN
        IF value IS NOT NULL AND value != '' THEN
          sql_parts := array_append(sql_parts, format('image = %L', value));
        ELSE
          sql_parts := array_append(sql_parts, 'image = NULL');
        END IF;
      WHEN 'in_stock' THEN
        sql_parts := array_append(sql_parts, format('in_stock = %s', value::boolean));
      WHEN 'description' THEN
        IF value IS NOT NULL AND value != '' THEN
          sql_parts := array_append(sql_parts, format('description = %L', value));
        ELSE
          sql_parts := array_append(sql_parts, 'description = NULL');
        END IF;
    END CASE;
  END LOOP;
  
  -- Add updated_at timestamp
  sql_parts := array_append(sql_parts, 'updated_at = NOW()');
  
  -- Build and execute final SQL
  IF array_length(sql_parts, 1) > 0 THEN
    final_sql := format('UPDATE products SET %s WHERE id = %s', 
                       array_to_string(sql_parts, ', '), 
                       product_id);
    EXECUTE final_sql;
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION execute_sql(text, jsonb) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_product_fields(INTEGER, JSONB) TO anon, authenticated;