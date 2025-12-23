"use client";

export default function ContactSection() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-16 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">CONTACT US</span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2 mb-3 tracking-wide">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                ติดต่อเราสำหรับคำปรึกษาเกี่ยวกับวัสดุก่อสร้าง หรือสอบถามข้อมูลสินค้า
              </p>
            </div>

            <form className="space-y-4">
              {/* Row 1: Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="ชื่อ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    นามสกุล
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="นามสกุล"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เบอร์โทร <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="เบอร์โทร"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              {/* Row 3: Topic and LINE ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    บริษัท/หน่วยงาน
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="บริษัท/หน่วยงาน"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID LINE
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="ID LINE"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายละเอียด
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical text-sm"
                  placeholder="รายละเอียด"
                />
              </div>

              <button 
                type="submit"
                className="text-white font-bold py-2.5 px-8 rounded transition-all duration-300 text-sm tracking-wide hover:opacity-90"
                style={{ backgroundColor: '#1e2e4f' }}
              >
                ส่งข้อมูล
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-black text-gray-900 mb-6 tracking-wide">Contact Information</h3>
            
            <p className="text-gray-600 text-base mb-8 leading-relaxed">
              ติดต่อเราสำหรับคำปรึกษาเกี่ยวกับวัสดุก่อสร้าง หรือสอบถามข้อมูลสินค้า 
              ทีมงานของเราพร้อมให้คำแนะนำและบริการที่ดีที่สุด ติดต่อได้ทุกช่องทางตามสะดวก
            </p>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Call Us */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Call Us</h4>
                  <p className="text-gray-600 text-base">091-939-7000</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Email Us</h4>
                  <p className="text-gray-600 text-base">sphardware9@gmail.com</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Working Hours</h4>
                  <p className="text-gray-600 text-base">เปิดทุกวัน: 08:00-17:00</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Address</h4>
                  <p className="text-gray-600 text-base">เลขที่ 28/101 ถ.รัชดา-รามอินทรา<br />แขวงคลองกุ่ม เขตบึงกุ่ม กทม. 10230</p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-base">Follow Us On</h4>
              <div className="flex space-x-2">
                <a href="https://line.me/R/ti/p/@576kulwa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
