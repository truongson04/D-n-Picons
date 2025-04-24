import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [newsItems, setNews] = useState([]);
  const [thumb, setThumb] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);  // Initialize as empty array
  const [isNotFound, setIsNotFound] = useState(false);  // New state to track no results

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://picons.fwh.is/wp-json/wp/v2/posts?categories=tin-tuc');
        const data = await response.json();
        console.log(data);
        setNews(data);
        setFilteredNews(data);  // Set the filtered news to all news items initially
        setIsNotFound(false);  // Reset not found state when data is fetched

        // Fetch thumbnails in parallel
        const thumbPromises = data.map(async (item) => {
          if (item.featured_media) {
            const mediaResponse = await fetch(
              `http://Picons.local/wp-json/wp/v2/media/${item.featured_media}`
            );
            const mediaData = await mediaResponse.json();
            return { id: item.id, source: mediaData.source_url };
          }
          return { id: item.id, source: "fallback-image-url.jpg" };
        });

        const thumbData = await Promise.all(thumbPromises);
        setThumb(thumbData);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = () => {
    const searchResults = newsItems.filter((item) =>
      item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(searchResults);
    setIsNotFound(searchResults.length === 0);  // Set not found state if no results
  };

  const handleFilter = () => {
    const filteredResults = newsItems.filter((item) => {
      const matchesDate = selectedDate ? item.date_gmt.startsWith(selectedDate) : true;
      return matchesDate;
    });
    setFilteredNews(filteredResults);
    setIsNotFound(filteredResults.length === 0);  // Set not found state if no results
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <div className="flex-grow max-w-6xl mx-auto p-6">
        <header className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900">Chuyên mục tin tức</h1>
          <p className="text-lg text-gray-600 mt-4">Cập nhật những tin tức mới nhất từ công ty chúng tôi</p>
        </header>

        {/* Search and Filter Bar */}
        <div className="mb-8 p-6 bg-white border border-gray-300 rounded-lg shadow-md min-h-[150px]">
          <div className="flex flex-row justify-between items-center gap-6">
            {/* Search Section */}
            <div className="flex items-center gap-6">
              <input
                type="text"
                placeholder="Nhập nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg w-full sm:w-72 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              />
              <button
                onClick={handleSearch}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Tìm kiếm
              </button>
            </div>

            {/* Date Filter Section */}
            <div className="flex items-center gap-6">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg w-full sm:w-72 focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
              />
              <button
                onClick={handleFilter}
                className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
              >
                Lọc
              </button>
            </div>
          </div>
        </div>

        {/* Message Displayed When No Results are Found */}
        {isNotFound && (
          <p className="text-center text-red-500 font-semibold mt-4">Chúng tôi không tìm thấy thông tin bạn đang cần</p>
        )}

        {/* News Content */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {currentItems.map((item) => (
            <article
              key={item.id}
              className="border border-gray-300 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-4 h-auto flex flex-col justify-between hover:bg-gray-50"
            >
              <img
                src={thumb.find((img) => img.id === item.id)?.source || "fallback-image-url.jpg"}
                alt={item.title.rendered}
                className="w-full h-48 object-cover mb-4"
              />
              <div className="flex flex-col flex-grow">
                <Link to="/details" state={[item, { list: newsItems }]}>
                  <h3 className="text-sm font-semibold cursor-pointer hover:text-blue-600 transition-colors break-words whitespace-normal">
                    {item.title.rendered}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500 mt-2">Ngày đăng: {item.date_gmt}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <nav className="mt-8 flex justify-center">
          <ul className="inline-flex items-center gap-4">
            {[...Array(Math.ceil(filteredNews.length / itemsPerPage)).keys()].map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-4 py-2 border rounded-full p-4 ${
                    currentPage === number + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300"
                  }`}
                >
                  {number + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredNews.length / itemsPerPage)}
                className={`text-center px-4 py-2 border rounded-full p-4 ${
                  currentPage === Math.ceil(filteredNews.length / itemsPerPage)
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white hover:bg-cyan-100 hover:scale-110 transition-transform duration-300"
                }`}
              >
                ➤
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default News;
