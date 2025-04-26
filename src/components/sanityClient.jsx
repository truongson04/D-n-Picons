import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Cấu hình Sanity client
const client = createClient({
    projectId: 'ecjx2ni0',
   // Project ID của bạn
  dataset: 'production', // Dataset của bạn (thường là 'production')
  useCdn: true, // Dùng CDN để tối ưu tốc độ
  
});

// Khởi tạo image url builder
const builder = imageUrlBuilder(client);

// Hàm tạo URL ảnh
export const urlFor = (source) => builder.image(source);
export default client;
