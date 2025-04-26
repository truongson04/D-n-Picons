import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <section
      className="relative min-h-screen px-4 sm:px-6 md:px-10 py-12 flex flex-col justify-center items-center bg-[url('https://toppng.com/uploads/preview/city-night-moon-buildings-water-dark-11569870921inbgemqnla.jpg')] bg-cover bg-center"
    >
      {/* Contact Info Header */}
      <div className="text-center mt-8 sm:mt-10 max-w-[900px]">
        <h2 className="text-3xl sm:text-4xl font-medium text-white">Liên hệ</h2>
        <p className="text-sm sm:text-base font-light text-white mt-2">
        Sẵn sàng bắt đầu dự án xây dựng tiếp theo của bạn? Hãy liên hệ với chúng tôi ngay hôm nay để thảo luận về tầm nhìn của bạn và để chúng tôi giúp bạn xây dựng một điều gì đó tuyệt vời.
        </p>
      </div>
      {/* Contact Details & Form - Centered in Wide Screens */}
      <div className="w-full max-w-[900px] mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-10 ">
        {/* Contact Details */}
        <div className="flex flex-col space-y-6 w-full">
          {/* Address */}
          <div className="flex space-x-4">
            <MapPin size={24} strokeWidth={2} className="text-cyan-500" />
            <div className="text-white text-sm sm:text-base font-light">
              <h3 className="font-medium text-cyan-400">Địa chỉ</h3>
              <p>Đ. Lê Văn Lương, phường Nhân Chính, quận Thanh Xuân, Hà Nội</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex space-x-4">
            <Mail size={24} strokeWidth={2} className="text-cyan-500" />
            <div className="text-white text-sm sm:text-base font-light">
              <h3 className="font-medium text-cyan-400">Email</h3>
              <p>gì đó @gmail.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex space-x-4">
            <Phone size={24} strokeWidth={2} className="text-cyan-500" />
            <div className="text-white text-sm sm:text-base font-light">
              <h3 className="font-medium text-cyan-400">Điện thoại</h3>
              <a href="tel: +09123458676"><p>+09123458676</p></a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg self-center">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800 text-center mb-4">
            Gửi mail cho chúng tôi
          </h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                required
                placeholder="Họ & Tên"
                className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div className="mb-4">
              <textarea
                required
                placeholder="Tin nhắn của bạn..."
                className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <button className="w-full p-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition duration-300">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

