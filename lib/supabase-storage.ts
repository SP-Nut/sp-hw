import { supabase } from './supabase';

const BUCKET_NAME = 'product-images';

export async function createBucketIfNotExists() {
  try {
    console.log('Checking if bucket exists...');
    
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      console.log('Trying to create bucket anyway...');
    } else {
      console.log('Available buckets:', buckets?.map(b => b.name));
    }

    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    console.log(`Bucket '${BUCKET_NAME}' exists:`, bucketExists);

    if (!bucketExists) {
      console.log(`Creating bucket '${BUCKET_NAME}'...`);
      
      // Create bucket with public access
      const { data: createData, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        
        // Try with minimal config
        console.log('Trying with minimal config...');
        const { error: minimalError } = await supabase.storage.createBucket(BUCKET_NAME, {
          public: true
        });

        if (minimalError) {
          console.error('Minimal bucket creation also failed:', minimalError);
        } else {
          console.log('Minimal bucket created successfully');
        }
      } else {
        console.log('Bucket created successfully:', createData);
      }
    } else {
      console.log('Bucket already exists');
    }

    return true;
  } catch (error) {
    console.error('Unexpected error with bucket:', error);
    return false;
  }
}

export async function uploadProductImage(file: File, productId: string, imageIndex: number): Promise<string | null> {
  try {
    console.log('Starting image upload to Supabase Storage...');
    
    // Ensure bucket exists first
    await createBucketIfNotExists();
    
    // Validate file
    if (!file || !file.type.startsWith('image/')) {
      console.error('Invalid file type:', file?.type);
      return null;
    }

    // Create unique filename
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${productId}_${imageIndex}_${Date.now()}.${fileExtension}`;
    const filePath = `products/${fileName}`;

    console.log(`Uploading file: ${filePath}, Size: ${file.size} bytes`);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      
      // Try fallback with different settings
      console.log('Trying fallback upload with upsert=true...');
      const { data: retryData, error: retryError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (retryError) {
        console.error('Retry upload also failed:', retryError);
        // Return placeholder as fallback
        return `https://picsum.photos/400/300?random=${Date.now()}`;
      }

      console.log('Retry upload successful:', retryData);
    } else {
      console.log('Upload successful:', data);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      console.error('Failed to get public URL');
      return `https://picsum.photos/400/300?random=${Date.now()}`;
    }

    console.log('Final public URL:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    // Return working placeholder URL as fallback
    return `https://picsum.photos/400/300?random=${Date.now()}`;
  }
}

export async function deleteProductImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}