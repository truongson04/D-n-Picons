import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { MapPin, Hourglass, Calendar, ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react"; // Import PortableText để render rich text
import { urlFor } from './sanityClient'; // Import urlFor từ sanityClient.js

const ProjectDetails = () => {
  const location = useLocation();
  const project = location.state;
  const [resolvedReferences, setResolvedReferences] = useState([]); // State to hold resolved references

  console.log(project); // 📦 Lấy dữ liệu đã truyền qua khi click project

  useEffect(() => {
    const fetchReferences = async () => {
      // Lọc tất cả các block có kiểu là reference trong phần mô tả
      const references = project?.description?.flatMap((block) => {
        if (block._type === 'reference') {
          return block; // Trả về những block có kiểu 'reference'
        }
        return [];
      });

      if (references && references.length > 0) {
        const resolvedData = await Promise.all(
          references.map(async (reference) => {
            const response = await fetch(
              `https://ecjx2ni0.apicdn.sanity.io/v1/data/query/production?query=*[_id=="${reference._ref}"]{ "url": asset->url, "title": title, "content": content }`
            );
            const data = await response.json();
            return data.result[0]; // trả về dữ liệu đã giải quyết
          })
        );
        setResolvedReferences(resolvedData); // Lưu lại tất cả các dữ liệu đã fetch
      }
    };

    if (project?.description) {
      fetchReferences();
    }
  }, [project]);

  if (!project) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg">Không tìm thấy thông tin dự án.</p>
        <Link to="/du-an" className="mt-4 inline-block text-blue-500 hover:underline">
          ← Quay lại danh sách dự án
        </Link>
      </div>
    );
  }

  // Hàm xử lý render ảnh từ rich text
  const renderImage = (props) => {
    const { value } = props;
    const resolvedImage = resolvedReferences.find(ref => ref._id === value.asset._ref);
  
    const imageUrl = resolvedImage
      ? resolvedImage.url // ✅ resolved already has .url from your API fetch
      : urlFor(value).url(); // ✅ fallback if not found, generate from raw value
  
    if (!imageUrl) {
      return <p>Đang tải ảnh...</p>;
    }
  
    return (
      <img
        src={imageUrl}
        alt={value?.alt || "Project Image"}
        className="w-full h-auto my-4 rounded-xl shadow"
      />
    );
  };
  

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto mt-16">
      <Link to="/du-an" className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="mr-2" size={18} />
        Quay lại danh sách
      </Link>

      {/* Phần thông tin tổng quát */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={urlFor(project.image).url()} // Dùng urlFor để lấy URL ảnh chính
          alt={project.name}
          className="w-full sm:w-1/2 h-80 object-cover rounded-xl shadow"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin size={18} />
            <span><strong>Địa điểm:</strong> {project.location}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Hourglass size={18} />
            <span><strong>Trạng thái:</strong> {project.status}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar size={18} />
            <span><strong>Ngày bắt đầu:</strong> {project.startDate}</span>
          </p>
        </div>
      </div>

      {/* Phần mô tả chi tiết */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Thông tin chi tiết về dự án</h2>
        <div className="text-gray-700 leading-relaxed text-lg">
          {/* Render rich text với PortableText */}
          <PortableText 
            value={project.description} 
            components={{
              types: {
                image: renderImage, // Custom render image component
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
