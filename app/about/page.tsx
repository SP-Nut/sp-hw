import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#1E2E4F] text-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">เกี่ยวกับเรา & ติดต่อเรา</h1>
            <p className="text-xl leading-relaxed text-[#8FB3E2]">
              ผู้นำด้านจำหน่ายฮาร์ดแวร์และอุปกรณ์ก่อสร้างมากกว่า 15 ปี 
              พร้อมให้คำปรึกษาและตอบทุกคำถาม
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ความเป็นมาของเรา</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  บริษัท SP Hardware จำกัด ก่อตั้งขึ้นในปี 2008 ด้วยวิสัยทัศน์ในการเป็นผู้นำ
                  ด้านการจำหน่ายฮาร์ดแวร์และอุปกรณ์ก่อสร้างที่มีคุณภาพสูง ในราคาที่เป็นธรรม
                </p>
                <p>
                  เราเริ่มต้นจากร้านขายฮาร์ดแวร์เล็กๆ และได้พัฒนาเป็นศูนย์รวมฮาร์ดแวร์และอุปกรณ์ก่อสร้าง
                  ครบวงจรที่ได้รับความไว้วางใจจากลูกค้ามากกว่า 10,000 ราย ทั่วประเทศ
                </p>
                <p>
                  ปัจจุบันเรามีสาขาหลัก 3 แห่ง และระบบจัดส่งครอบคลุมทั่วประเทศไทย 
                  พร้อมทีมงานมืออาชีพที่พร้อมให้คำปรึกษาและบริการหลังการขาย
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400 text-lg">รูปบริษัท/โรงงาน</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1E2E4F] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-[#8FB3E2]">ปีประสบการณ์</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-[#8FB3E2]">ลูกค้าที่ไว้วางใจ</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-[#8FB3E2]">รายการสินค้า</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-[#8FB3E2]">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ติดต่อเรา</h2>
            <p className="text-gray-600">พร้อมให้บริการและตอบทุกคำถาม</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#8FB3E2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-[#1E2E4F]" />
                  </div>
                  <h3 className="font-semibold mb-2">ที่อยู่</h3>
                  <p className="text-gray-600 text-sm">
                    123 ถนนประชาชื่น แขวงทุ่งสองห้อง<br />
                    เขตหลักสี่ กรุงเทพฯ 10210
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#8FB3E2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-[#1E2E4F]" />
                  </div>
                  <h3 className="font-semibold mb-2">โทรศัพท์</h3>
                  <p className="text-gray-600 text-sm">
                    089-123-4567<br />
                    Call Center 1160
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#8FB3E2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-[#1E2E4F]" />
                  </div>
                  <h3 className="font-semibold mb-2">อีเมล</h3>
                  <p className="text-gray-600 text-sm">
                    info@sphardware.com<br />
                    support@sphardware.com
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#8FB3E2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-[#1E2E4F]" />
                  </div>
                  <h3 className="font-semibold mb-2">เวลาทำการ</h3>
                  <p className="text-gray-600 text-sm">
                    จันทร์-เสาร์: 8:00-18:00<br />
                    อาทิตย์: 9:00-17:00
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ส่งข้อความถึงเรา</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#8FB3E2] focus:outline-none" placeholder="กรุณากรอกชื่อ" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">โทรศัพท์</label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#8FB3E2] focus:outline-none" placeholder="089-123-4567" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#8FB3E2] focus:outline-none" placeholder="example@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">หัวข้อ</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#8FB3E2] focus:outline-none" placeholder="หัวข้อของคุณ" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ข้อความ</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#8FB3E2] focus:outline-none" placeholder="กรุณาบอกรายละเอียด..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#1E2E4F] hover:bg-[#31487A] text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">แผนที่</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">แผนที่ Google Maps</p>
                <p className="text-sm text-gray-400">123 ถนนประชาชื่น แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพฯ</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}