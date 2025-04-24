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

  return (
    <div className="py-16 px-6 max-w-4xl mx-auto mt-16">
      <Link to="/du-an" className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="mr-2" size={18} />
        Quay lại danh sách
      </Link>

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
          </p>
        </div>
      </div>

      {/* Nội dung mô tả chi tiết từ API (HTML render) */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Thông tin chi tiết</h2>
        {/* Chú ý: Dùng `dangerouslySetInnerHTML` để render HTML trả về từ WordPress */}
        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description }} />
      </div>
    </div>
  );
};

export default ProjectDetails;
