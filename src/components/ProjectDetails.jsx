<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { MapPin, Hourglass, Calendar, ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const location = useLocation();
  const projectId = location.state?.id; // Lấy ID dự án từ route

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage]= useState("");

  // 🟢 Fetch thông tin chi tiết dự án từ API WordPress
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://Picons.local/wp-json/wp/v2/posts/${projectId}`);
        const data = await response.json();

        // Lấy thông tin chi tiết dự án từ API (ví dụ: tên, địa điểm, trạng thái, ngày bắt đầu, mô tả...)
        const formattedProject = {
          id: data.id,
          name: data.title.rendered,
          location: data.acf?.location || "Không xác định",
          status: data.acf?.status || "Chưa cập nhật",
          startDate: data.acf?.start_date || "2024-01-01",
          description: data.content.rendered || "Không có mô tả chi tiết.", // Lấy content.rendered
         
        };
        if(data.featured_media){
                  fetch(`http://Picons.local/wp-json/wp/v2/media/${data.featured_media}`)
                  .then(res=>res.json())
                  .then(item=>setImage(item.source_url))
        }

        setProject(formattedProject);
        setLoading(false); // Set loading to false khi fetch xong
      } catch (error) {
        console.error("Lỗi khi fetch dự án:", error);
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg">Đang tải thông tin dự án...</p>
      </div>
    );
  }
>>>>>>> 5cbc9a5a9e0a95e30f783f3ef8b14834dfedf12c

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

<<<<<<< HEAD
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
=======
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto mt-16">
>>>>>>> 5cbc9a5a9e0a95e30f783f3ef8b14834dfedf12c
      <Link to="/du-an" className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="mr-2" size={18} />
        Quay lại danh sách
      </Link>

<<<<<<< HEAD
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
=======
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={image}
          alt={project.name}
          className="w-full sm:w-1/2 h-64 object-cover rounded-xl shadow"
        />
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin size={18} />
            <span>{project.location}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Hourglass size={18} />
            <span>{project.status}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar size={18} />
            <span>{project.startDate}</span>
>>>>>>> 5cbc9a5a9e0a95e30f783f3ef8b14834dfedf12c
          </p>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Nội dung mô tả chi tiết từ API (HTML render) */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Thông tin chi tiết</h2>
        {/* Chú ý: Dùng `dangerouslySetInnerHTML` để render HTML trả về từ WordPress */}
        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description }} />
>>>>>>> 5cbc9a5a9e0a95e30f783f3ef8b14834dfedf12c
      </div>
    </div>
  );
};

export default ProjectDetails;
