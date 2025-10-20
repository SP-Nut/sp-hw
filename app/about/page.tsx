import { Phone, Mail, Clock, Users, Zap, Shield, HandHeart, DollarSign, Building2, Award, Calendar, Facebook, Youtube } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section - Responsive Design */}
      <div className="bg-[#1E2E4F] text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-full py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 py-2 sm:px-4 bg-[#31487A] rounded-full text-xs sm:text-sm font-medium">
                ผู้นำอุตสาหกรรมกันสาดและก่อสร้าง
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              SP Hardware
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#8FB3E2] mb-3 sm:mb-4">
              เอสพี ฮาร์ดแวร์ จำกัด
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#8FB3E2] mb-6 sm:mb-8 px-2">
              ส่วนหนึ่งของ SP Group - เครือข่ายบริษัทชั้นนำด้านก่อสร้าง
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 md:mb-12 text-gray-100 max-w-3xl mx-auto px-2">
              มากกว่า 25 ปีแห่งความเชี่ยวชาญด้านฮาร์ดแวร์และอุปกรณ์ก่อสร้าง 
              ด้วยประสบการณ์ระดับนานาชาติและทีมงานมืออาชีพ
            </p>
            
            {/* Stats Row - Responsive with icons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8">
              <div className="text-center group">
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#8FB3E2] mr-2" />
                  <div className="text-2xl sm:text-3xl font-bold">25+</div>
                </div>
                <div className="text-[#8FB3E2] text-sm sm:text-base">ปีประสบการณ์</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#8FB3E2] mr-2" />
                  <div className="text-2xl sm:text-3xl font-bold">5</div>
                </div>
                <div className="text-[#8FB3E2] text-sm sm:text-base">สาขาทั่วประเทศ</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#8FB3E2] mr-2" />
                  <div className="text-2xl sm:text-3xl font-bold">3</div>
                </div>
                <div className="text-[#8FB3E2] text-sm sm:text-base">บริษัทในเครือ</div>
              </div>
            </div>

            {/* SP Group Companies - Responsive */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#8FB3E2]">SP Group เครือข่ายบริษัท</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm px-2">
                <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-lg">
                  <span className="font-medium">SP Kansard</span>
                  <p className="text-xs text-[#8FB3E2]">งานกันสาด</p>
                </div>
                <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-lg">
                  <span className="font-medium">SP Warehouse</span>
                  <p className="text-xs text-[#8FB3E2]">โกดัง โรงงาน</p>
                </div>
                <div className="bg-white/20 px-3 sm:px-4 py-2 rounded-lg border border-white/30">
                  <span className="font-bold">SP Hardware</span>
                  <p className="text-xs text-[#8FB3E2]">ฮาร์ดแวร์ ก่อสร้าง</p>
                </div>
              </div>
            </div>

            {/* CEO Quote - Responsive */}
            <div className="bg-[#31487A] p-4 sm:p-6 md:p-8 rounded-lg max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-2 sm:mb-0 sm:mr-3" />
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-sm sm:text-base">นายสมพร แก้วรัศมีโชติ</h3>
                  <p className="text-[#8FB3E2] text-xs sm:text-sm">ประธาน SP Group</p>
                </div>
              </div>
              <blockquote className="text-base sm:text-lg italic text-center px-2">
                &ldquo;สร้างได้ไว สร้างได้จริง มั่นใจไปกับครอบครัว SP&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values Section - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">ค่านิยมองค์กร</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
                หลักการที่ SP Group ยึดถือในการดำเนินธุรกิจและสร้างคุณค่าให้ลูกค้า
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#1E2E4F] to-[#31487A] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">รวดเร็ว</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">ส่งมอบงานตรงเวลา ด้วยกระบวนการที่มีประสิทธิภาพและทีมงานที่พร้อม</p>
              </div>
              
              <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#1E2E4F] to-[#31487A] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">แข็งแรง</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">คุณภาพงานระดับมาตรฐานสากล ทนทานและปลอดภัยในทุกสภาพอากาศ</p>
              </div>
              
              <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#1E2E4F] to-[#31487A] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HandHeart className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">ไม่ทิ้งงาน</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">รับผิดชอบงานจนเสร็จสมบูรณ์ พร้อมบริการหลังการขายตลอดอายุการใช้งาน</p>
              </div>
              
              <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#1E2E4F] to-[#31487A] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">ราคาประหยัด</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">ราคาที่เป็นธรรมและโปร่งใส คุมทุนและคุ้มค่าการลงทุนระยะยาว</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story - Responsive Layout */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">ประวัติความเป็นมา</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
                การเดินทางของ SP Group จากการเริ่มต้นสู่การเป็นผู้นำอุตสาหกรรมก่อสร้างและฮาร์ดแวร์
              </p>
            </div>

            {/* CEO Story - Responsive */}
            <div className="mb-10 sm:mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#1E2E4F] rounded-full flex items-center justify-center mx-auto sm:mx-0">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">จุดเริ่มต้นด้วยประสบการณ์ระดับนานาชาติ</h3>
                  <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-sm sm:text-base">
                      <strong>นายสมพร แก้วรัศมีโชติ</strong> ประธานบริษัท เอสพี กันสาด จำกัด และประธาน SP Group 
                      เริ่มต้นจากการเรียนรู้งานด้านกันสาดในกรุงเทพมหานคร ตั้งแต่ปี พ.ศ. 2531 
                      โดยก่อนหน้านี้ได้มีโอกาสร่วมงานกับบริษัทระดับนานาชาติ
                    </p>
                    <div className="bg-[#8FB3E2]/10 p-4 sm:p-6 rounded-lg border-l-4 border-[#8FB3E2]">
                      <p className="text-[#1E2E4F] font-medium text-sm sm:text-base">
                        ประสบการณ์ร่วมงานกับ: <strong>Barclay Mowlem</strong>, <strong>Alstom Transportation Services</strong> 
                        และ <strong>John Holland</strong> เกี่ยวกับงานเชื่อมรางรถไฟสายเหนือ สายใต้ สายอีสาน 
                        รวมถึงโครงการรถไฟใต้ดินในกรุงเทพฯ ประสบการณ์ระดับนานาชาตินี้เป็นรากฐานสำคัญในการพัฒนา SP Group
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Timeline */}
            <div className="space-y-12">
              <div className="relative pl-8 border-l-2 border-[#8FB3E2]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#1E2E4F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-[#31487A] text-white px-3 py-1 rounded-full text-sm font-medium">พ.ศ. 2547</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-2">เริ่มต้นธุรกิจ</h3>
                <p className="text-gray-700">
                  เริ่มต้นธุรกิจร้านกันสาดแห่งแรกย่านนวมินทร์ 97 วางรากฐานของ SP Group
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-[#8FB3E2]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#1E2E4F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-[#31487A] text-white px-3 py-1 rounded-full text-sm font-medium">พ.ศ. 2552</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-2">ก่อตั้งบริษัทแรก</h3>
                <p className="text-gray-700">
                  ก่อตั้ง บริษัท เอสพี สแตนเลส คอนสตรัคชั่น จำกัด เมื่อวันที่ 4 พฤษภาคม 2552 
                  โดยมุ่งเน้นงานจำหน่ายแผ่นหลังคาและติดตั้งกันสาด ทั้งวัสดุในประเทศและนำเข้าจากแบรนด์ชั้นนำ 
                  พร้อมอุปกรณ์ติดตั้งครบวงจร อีกทั้งยังได้ลงทุนในเครื่องจักรผลิตแผ่นเมทัลชีท และเครื่องฉีดฉนวน PU Foam 
                  เพื่อเพิ่มคุณภาพและมาตรฐานของงานติดตั้ง
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-[#8FB3E2]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#1E2E4F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-[#31487A] text-white px-3 py-1 rounded-full text-sm font-medium">พ.ศ. 2554</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-2">ขยายสู่ SP Warehouse</h3>
                <p className="text-gray-700">
                  เพื่อตอบโจทย์ลูกค้าในวงกว้างมากขึ้น ได้ก่อตั้ง SP Warehouse เพื่อรับสร้างโกดัง โรงงาน โรงจอดรถ และอาคารอเนกประสงค์ 
                  โดยมีความพร้อมด้านวัตถุดิบและอุปกรณ์ครบถ้วน เช่น โรงงานผลิตแผ่นเมทัลชีท โรงจำหน่ายเหล็กรูปพรรณ 
                  และการเป็นตัวแทนจำหน่ายสี TOA ทำให้สามารถควบคุมต้นทุนได้ต่ำลง แต่ยังคงคุณภาพงานระดับสูง
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-[#8FB3E2]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#1E2E4F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-[#31487A] text-white px-3 py-1 rounded-full text-sm font-medium">พ.ศ. 2558</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-2">SP Kansard ก่อตั้งอย่างเป็นทางการ</h3>
                <p className="text-gray-700">
                  ในวันที่ 24 กันยายน 2558 ได้ก่อตั้ง บริษัท เอสพี กันสาด จำกัด อย่างเป็นทางการ 
                  เพื่อตอบสนองความต้องการของลูกค้าในงานกันสาดเต็มรูปแบบ ด้วยทีมงานที่มีความเป็นมืออาชีพและประสบการณ์สูง 
                  ทำให้บริษัทเติบโตอย่างมั่นคง ได้รับความไว้วางใจ และเป็นที่ยอมรับอย่างกว้างขวางในวงการกันสาด
                </p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#8FB3E2] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-[#8FB3E2] text-white px-3 py-1 rounded-full text-sm font-medium">ปัจจุบัน</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-4">SP Group วันนี้</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      ปัจจุบัน SP Group มีทั้งหมด 5 สาขาทั่วประเทศ ด้วยทีมงานวิศวกร สถาปนิก และช่างผู้ชำนาญการ 
                      สามารถส่งมอบงานที่ <strong>รวดเร็ว แข็งแรง ไม่ทิ้งงาน และราคาประหยัด</strong> 
                      เพื่อช่วยให้ลูกค้าสามารถต่อยอดธุรกิจได้อย่างมั่นใจ
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-[#1E2E4F] mb-3">ความพร้อมแบบครบวงจร</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• โรงงานผลิตแผ่นเมทัลชีท</li>
                      <li>• โรงจำหน่ายเหล็กรูปพรรณ</li>
                      <li>• ตัวแทนจำหน่ายสี TOA</li>
                      <li>• เครื่องฉีดฉนวน PU Foam</li>
                      <li>• ทีมวิศวกร สถาปนิก และช่างมืออาชีพ</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#1E2E4F] text-white rounded text-center">
                    <p className="font-medium">
                      &ldquo;รวดเร็ว แข็งแรง ไม่ทิ้งงาน และราคาประหยัด 
                      เพื่อช่วยให้ลูกค้าสามารถต่อยอดธุรกิจได้อย่างมั่นใจ&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Fully Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E2E4F] mb-3 sm:mb-4">ติดต่อเรา</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">พร้อมให้บริการและตอบทุกคำถาม</p>
            </div>
            
            {/* Main Contact Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
              {/* Phone */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#31487A] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Phone className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="font-bold text-[#1E2E4F] mb-2 sm:mb-3 text-base sm:text-lg">โทรศัพท์</h3>
                <div className="space-y-1 sm:space-y-2 text-gray-700">
                  <p className="font-medium text-sm sm:text-base">
                    <a href="tel:084-909-7777" className="hover:text-[#1E2E4F] transition-colors">084-909-7777</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#31487A] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Mail className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="font-bold text-[#1E2E4F] mb-2 sm:mb-3 text-base sm:text-lg">อีเมล</h3>
                <div className="space-y-1 sm:space-y-2 text-gray-700">
                  <p className="text-xs sm:text-sm">
                    <a href="mailto:spgroup555@gmail.com" className="hover:text-[#1E2E4F] underline transition-colors break-all">spgroup555@gmail.com</a>
                  </p>
                  <p className="text-xs sm:text-sm">
                    <a href="mailto:info@spkansard.com" className="hover:text-[#1E2E4F] underline transition-colors break-all">info@spkansard.com</a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#31487A] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="font-bold text-[#1E2E4F] mb-2 sm:mb-3 text-base sm:text-lg">เวลาทำการ</h3>
                <div className="text-gray-700 text-sm sm:text-base space-y-1">
                  <p><strong>จันทร์-เสาร์:</strong> 8:00-17:00</p>
                  <p><strong>อาทิตย์:</strong> 9:00-17:00</p>
                </div>
              </div>

              {/* LINE OA */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#00B900] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:scale-105 transition-transform duration-300">
                  <svg className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 fill-white" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.635 0 .35-.281.63-.63.63-.348 0-.63-.281-.63-.63 0-.35.282-.635.63-.635zm-6.365 0c.349 0 .63.285.63.635 0 .35-.281.63-.63.63-.348 0-.63-.281-.63-.63 0-.35.282-.635.63-.635zm-6.365 0c.349 0 .63.285.63.635 0 .35-.281.63-.63.63-.348 0-.63-.281-.63-.63 0-.35.282-.635.63-.635zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#1E2E4F] mb-2 sm:mb-3 text-base sm:text-lg">LINE OA</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  <a href="https://line.me/R/ti/p/@566pppph" target="_blank" rel="noopener noreferrer" className="text-[#00B900] hover:text-green-700 underline font-medium transition-colors">
                    @566pppph
                  </a>
                </p>
              </div>
            </div>

            {/* Secondary Contact Info - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* FAX */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1E2E4F] mb-2 text-sm sm:text-base">FAX</h4>
                <p className="text-gray-700 font-medium text-sm sm:text-base">02-936-8843</p>
              </div>

              {/* Website */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1E2E4F] mb-2 text-sm sm:text-base">Website</h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  <a href="https://www.spkansard.com" target="_blank" rel="noopener noreferrer" className="text-[#1E2E4F] hover:text-[#31487A] underline font-medium transition-colors break-all">
                    www.spkansard.com
                  </a>
                </p>
              </div>

              {/* Social Media */}
              <div className="text-center bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm">
                <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1877F2] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Facebook className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF0000] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Youtube className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-[#1E2E4F] mb-2 text-sm sm:text-base">ติดตามเรา</h4>
                <div className="text-gray-700 text-xs sm:text-sm space-y-1">
                  <p>
                    <a href="#" className="text-[#1877F2] hover:text-blue-700 underline font-medium transition-colors">SP Group</a>
                  </p>
                  <p>
                    <a href="#" className="text-[#FF0000] hover:text-red-700 underline font-medium transition-colors">SP Channel</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}