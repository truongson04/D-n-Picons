import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Hourglass, Calendar, Search } from "lucide-react";
<<<<<<< HEAD
import client from './sanityClient'; // Đúng đường dẫn tới sanityClient

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const navigate = useNavigate();

  // 🟢 Fetch dữ liệu từ Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `
          *[_type == "project"] {
            _id,
            name,
            location,
            status,
            startDate,
            "imageUrl": image.asset->url,
            description
          }
        `;

        const data = await client.fetch(query);

        const formattedProjects = data.map((item) => ({
          id: item._id,
          name: item.name,
          location: item.location || "Không xác định",
          status: item.status || "Chưa cập nhật",
          startDate: item.startDate || "2024-01-01",
          image: item.imageUrl || "https://via.placeholder.com/400x300?text=No+Image",
          description: item.description || "Chưa có mô tả."
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Lỗi khi fetch dự án từ Sanity:", error);
      }
    };

    fetchProjects();
  }, []);

  // 🟡 Filter theo tìm kiếm và bộ lọc
  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === "" || project.location === locationFilter) &&
      (statusFilter === "" || project.status === statusFilter) &&
      (startDateFilter === "" || project.startDate >= startDateFilter)
    );
  });

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto mt-16">
      <h1 className="text-3xl font-bold text-center mb-6">Danh sách Dự án</h1>

      {/* Bộ lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg py-2 px-3"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">Tất cả địa điểm</option>
          {[...new Set(projects.map((p) => p.location))].map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          className="border rounded-lg py-2 px-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          {[...new Set(projects.map((p) => p.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách dự án */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative group cursor-pointer"
              onClick={() => navigate(`/du-an/${project.id}`, { state: project })}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover transition duration-500 group-hover:opacity-50"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-4">
                  <div className="text-white text-lg font-semibold">{project.name}</div>
                  <div className="text-white mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} /> {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Hourglass size={16} /> {project.status}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} /> {project.startDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không tìm thấy dự án nào!</p>
        )}
      </div>
    </div>
  );
=======

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [startDateFilter, setStartDateFilter] = useState("");
    const navigate = useNavigate();

    // 🟢 Fetch dự án từ WordPress REST API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://Picons.local/wp-json/wp/v2/posts?categories=6");
                const data = await response.json();
                console.log(data);

                // Mảng để chứa các dự án đã được format
                const formattedProjects = data.map((item) => ({
                    id: item.id,
                    name: item.title.rendered,
                    location: item.acf?.location || "Không xác định",
                    status: item.acf?.status || "Chưa cập nhật",
                    startDate: item.acf?.start_date || "2024-01-01",
                    image: `http://Picons.local/wp-json/wp/v2/media/${item.featured_media}`
                }));

                // Lấy thông tin ảnh từ API nếu có
                for (let i = 0; i < formattedProjects.length; i++) {
                    if (formattedProjects[i].image.includes("wp-json/wp/v2/media")) {
                        const mediaResponse = await fetch(formattedProjects[i].image);
                        const mediaData = await mediaResponse.json();
                        formattedProjects[i].image = mediaData.source_url;
                    }
                }

                setProjects(formattedProjects);
            } catch (error) {
                console.error("Lỗi khi fetch dự án:", error);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter((project) => {
        return (
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (locationFilter === "" || project.location === locationFilter) &&
            (statusFilter === "" || project.status === statusFilter) &&
            (startDateFilter === "" || project.startDate >= startDateFilter)
        );
    });

    return (
        <div className="py-16 px-6 max-w-7xl mx-auto mt-16">
            <h1 className="text-3xl font-bold text-center mb-6">Danh sách Dự án</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Tìm kiếm dự án..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="border rounded-lg py-2 px-3" value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}>
                    <option value="">Tất cả địa điểm</option>
                    {[...new Set(projects.map((p) => p.location))].map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div key={project.id} className="relative group cursor-pointer"
                            onClick={() => navigate(`/du-an/${project.id}`, { state: project })}>
                            <div className="relative overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out">
                                <img src={project.image} alt={project.name}
                                     className="w-full h-64 object-cover transition duration-500 group-hover:opacity-50"/>
                                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-4">
                                    <div className="text-white text-lg font-semibold">{project.name}</div>
                                    <div className="text-white mt-2">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} /> {project.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Hourglass size={16} /> {project.status}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} /> {project.startDate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không tìm thấy dự án nào!</p>
                )}
            </div>
        </div>
    );
>>>>>>> 5cbc9a5a9e0a95e30f783f3ef8b14834dfedf12c
};

export default Project;
