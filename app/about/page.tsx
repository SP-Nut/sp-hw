import { MapPin, Phone, Mail, Clock, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section - Clean Design */}
      <div className="bg-[#1E2E4F] text-white">
        <div className="container mx-auto px-12 md:px-16 max-w-full py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-[#31487A] rounded-full text-sm font-medium">
                ผู้นำอุตสาหกรรมกันสาดและก่อสร้าง
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              SP Hardware
            </h1>
            <p className="text-2xl md:text-3xl font-light text-[#8FB3E2] mb-4">
              เอสพี ฮาร์ดแวร์ จำกัด
            </p>
            <p className="text-lg text-[#8FB3E2] mb-8">
              ส่วนหนึ่งของ SP Group - เครือข่ายบริษัทชั้นนำด้านก่อสร้าง
            </p>
            <p className="text-xl leading-relaxed mb-12 text-gray-100 max-w-3xl mx-auto">
              มากกว่า 25 ปีแห่งความเชี่ยวชาญด้านฮาร์ดแวร์และอุปกรณ์ก่อสร้าง 
              ด้วยประสบการณ์ระดับนานาชาติและทีมงานมืออาชีพ
            </p>
            
            {/* Stats Row */}
            <div className="flex justify-center gap-12 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-[#8FB3E2]">ปีประสบการณ์</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-[#8FB3E2]">สาขาทั่วประเทศ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-[#8FB3E2]">บริษัทในเครือ</div>
              </div>
            </div>

            {/* SP Group Companies */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4 text-[#8FB3E2]">SP Group เครือข่ายบริษัท</h3>
              <div className="flex justify-center gap-8 text-sm">
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-medium">SP Kansard</span>
                  <p className="text-xs text-[#8FB3E2]">งานกันสาด</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-medium">SP Warehouse</span>
                  <p className="text-xs text-[#8FB3E2]">โกดัง โรงงาน</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg border border-white/30">
                  <span className="font-bold">SP Hardware</span>
                  <p className="text-xs text-[#8FB3E2]">ฮาร์ดแวร์ ก่อสร้าง</p>
                </div>
              </div>
            </div>

            {/* CEO Quote */}
            <div className="bg-[#31487A] p-8 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <h3 className="font-bold">นายสมพร แก้วรัศมีโชติ</h3>
                  <p className="text-[#8FB3E2] text-sm">ประธาน SP Group</p>
                </div>
              </div>
              <blockquote className="text-lg italic text-center">
                &ldquo;สร้างได้ไว สร้างได้จริง มั่นใจไปกับครอบครัว SP&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-12 md:px-16 max-w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1E2E4F] mb-4">ค่านิยมองค์กร</h2>
              <p className="text-xl text-gray-600">
                หลักการที่ SP Group ยึดถือในการดำเนินธุรกิจและสร้างคุณค่าให้ลูกค้า
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#1E2E4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-3">รวดเร็ว</h3>
                <p className="text-gray-600 text-sm">ส่งมอบงานตรงเวลา ด้วยกระบวนการที่มีประสิทธิภาพ</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#1E2E4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🏗️</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-3">แข็งแรง</h3>
                <p className="text-gray-600 text-sm">คุณภาพงานระดับมาตรฐาน ทนทานและปลอดภัย</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#1E2E4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-3">ไม่ทิ้งงาน</h3>
                <p className="text-gray-600 text-sm">รับผิดชอบงานจนเสร็จสมบูรณ์ พร้อมบริการหลังการขาย</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#1E2E4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2E4F] mb-3">ราคาประหยัด</h3>
                <p className="text-gray-600 text-sm">ราคาที่เป็นธรรม คุมทุน และคุ้มค่าการลงทุน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story - Clean Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-12 md:px-16 max-w-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1E2E4F] mb-4">ประวัติความเป็นมา</h2>
              <p className="text-xl text-gray-600">
                การเดินทางของ SP Group จากการเริ่มต้นสู่การเป็นผู้นำอุตสาหกรรมก่อสร้างและฮาร์ดแวร์
              </p>
            </div>

            {/* CEO Story */}
            <div className="mb-16">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-16 h-16 bg-[#1E2E4F] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1E2E4F] mb-4">จุดเริ่มต้นด้วยประสบการณ์ระดับนานาชาติ</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      <strong>นายสมพร แก้วรัศมีโชติ</strong> ประธานบริษัท เอสพี กันสาด จำกัด และประธาน SP Group 
                      เริ่มต้นจากการเรียนรู้งานด้านกันสาดในกรุงเทพมหานคร ตั้งแต่ปี พ.ศ. 2531 
                      โดยก่อนหน้านี้ได้มีโอกาสร่วมงานกับบริษัทระดับนานาชาติ
                    </p>
                    <div className="bg-[#8FB3E2]/10 p-6 rounded-lg border-l-4 border-[#8FB3E2]">
                      <p className="text-[#1E2E4F] font-medium">
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
                      ปัจจุบัน SP Kansard มีทั้งหมด 5 สาขา ได้แก่ กรุงเทพฯ (รัชดา–รามอินทรา) สำนักงานใหญ่, 
                      กรุงเทพฯ (บางแวก), นนทบุรี (ราชพฤกษ์), ปทุมธานี (สามโคก), และภูเก็ต
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ด้วยทีมงานวิศวกร สถาปนิก และช่างผู้ชำนาญการ SP Warehouse สามารถส่งมอบงานที่ 
                      <strong> รวดเร็ว แข็งแรง ไม่ทิ้งงาน และราคาประหยัด</strong> 
                      เพื่อช่วยให้ลูกค้าสามารถต่อยอดธุรกิจได้อย่างมั่นใจ
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="font-bold text-[#1E2E4F] mb-3">5 สาขาทั่วประเทศ</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• กรุงเทพฯ (รัชดา–รามอินทรา) - สำนักงานใหญ่</li>
                        <li>• กรุงเทพฯ (บางแวก)</li>
                        <li>• นนทบุรี (ราชพฤกษ์)</li>
                        <li>• ปทุมธานี (สามโคก)</li>
                        <li>• ภูเก็ต</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E2E4F] mb-3">ความพร้อมแบบครบวงจร</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• โรงงานผลิตแผ่นเมทัลชีท</li>
                        <li>• โรงจำหน่ายเหล็กรูปพรรณ</li>
                        <li>• ตัวแทนจำหน่ายสี TOA</li>
                        <li>• เครื่องฉีดฉนวน PU Foam</li>
                        <li>• ทีมวิศวกร สถาปนิก และช่างมืออาชีพ</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-[#1E2E4F] mb-3">3 บริษัทใน SP Group</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border-l-4 border-[#1E2E4F]">
                        <h5 className="font-bold text-[#1E2E4F]">SP Kansard</h5>
                        <p className="text-sm text-gray-600">งานกันสาด โรงจอดรถ</p>
                      </div>
                      <div className="bg-white p-4 rounded border-l-4 border-[#31487A]">
                        <h5 className="font-bold text-[#31487A]">SP Warehouse</h5>
                        <p className="text-sm text-gray-600">โกดัง โรงงาน อาคาร</p>
                      </div>
                      <div className="bg-white p-4 rounded border-l-4 border-[#8FB3E2]">
                        <h5 className="font-bold text-[#8FB3E2]">SP Hardware</h5>
                        <p className="text-sm text-gray-600">ฮาร์ดแวร์ อุปกรณ์ก่อสร้าง</p>
                      </div>
                    </div>
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

      {/* Contact Section - Simple Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-12 md:px-16 max-w-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1E2E4F] mb-4">ติดต่อเรา</h2>
              <p className="text-xl text-gray-600">พร้อมให้บริการและตอบทุกคำถาม</p>
            </div>
            
            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E2E4F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2">โทรศัพท์</h3>
                    <p className="text-gray-700">
                      <a href="tel:02-998-5222" className="hover:text-[#1E2E4F] font-medium">02-998-5222</a><br />
                      <a href="tel:089-5324454" className="hover:text-[#1E2E4F] font-medium">089-5324454</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E2E4F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2">FAX</h3>
                    <p className="text-gray-700 font-medium">
                      02-936-8843
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E2E4F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2">อีเมล</h3>
                    <p className="text-gray-700">
                      <a href="mailto:spgroup555@gmail.com" className="hover:text-[#1E2E4F] underline">spgroup555@gmail.com</a><br />
                      <a href="mailto:info@spkansard.com" className="hover:text-[#1E2E4F] underline">info@spkansard.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E2E4F] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2">Website</h3>
                    <p className="text-gray-700">
                      <a href="https://www.spkansard.com" target="_blank" rel="noopener noreferrer" className="text-[#1E2E4F] hover:text-[#31487A] underline font-medium">
                        www.spkansard.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E2E4F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2">เวลาทำการ</h3>
                    <p className="text-gray-700">
                      <strong>จันทร์ - เสาร์:</strong> 8:00 - 18:00<br />
                      <strong>อาทิตย์:</strong> 9:00 - 17:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E2E4F] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2">LINE OA</h3>
                    <p className="text-gray-700">
                      <a href="https://line.me/R/ti/p/@566pppph" target="_blank" rel="noopener noreferrer" className="text-[#1E2E4F] hover:text-[#31487A] underline font-medium">
                        @566pppph
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#1E2E4F] mb-8 text-center">ติดตามข่าวสารจาก SP Group</h3>
              <div className="flex justify-center gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">f</span>
                  </div>
                  <h4 className="font-bold text-[#1E2E4F] mb-2">Facebook</h4>
                  <p className="text-sm text-gray-600">ข่าวสารและผลงาน</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-[#00B900] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">LINE</span>
                  </div>
                  <h4 className="font-bold text-[#1E2E4F] mb-2">LINE</h4>
                  <p className="text-sm text-gray-600">@566pppph</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">▶</span>
                  </div>
                  <h4 className="font-bold text-[#1E2E4F] mb-2">YouTube</h4>
                  <p className="text-sm text-gray-600">วิดีโอผลงาน</p>
                </div>
              </div>
            </div>

            {/* Branch Locations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#1E2E4F] mb-8 text-center">สาขาทั่วประเทศ</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {[
                  { 
                    name: "สำนักงานใหญ่", 
                    location: "รัชดา-รามอินทรา", 
                    area: "กรุงเทพฯ", 
                    address: "แขวงลาดพร้าว เขตลาดพร้าว",
                    phone: "02-998-5222",
                    isHQ: true 
                  },
                  { 
                    name: "สาขาบางแวก", 
                    location: "บางแวก", 
                    area: "กรุงเทพฯ", 
                    address: "แขวงบางแวก เขตภาษีเจริญ",
                    phone: "02-998-5222",
                    isHQ: false 
                  },
                  { 
                    name: "สาขาราชพฤกษ์", 
                    location: "ราชพฤกษ์", 
                    area: "นนทบุรี", 
                    address: "ตำบลบางพลับ อำเภอปากเกร็ด",
                    phone: "02-998-5222",
                    isHQ: false 
                  },
                  { 
                    name: "สาขาสามโคก", 
                    location: "สามโคก", 
                    area: "ปทุมธานี", 
                    address: "ตำบลสามโคก อำเภอสามโคก",
                    phone: "02-998-5222",
                    isHQ: false 
                  },
                  { 
                    name: "สาขาภูเก็ต", 
                    location: "ภูเก็ต", 
                    area: "ภาคใต้", 
                    address: "ตำบลรัษฎา อำเภอเมืองภูเก็ต",
                    phone: "076-xxx-xxx",
                    isHQ: false 
                  }
                ].map((branch, index) => (
                  <div key={index} className={`bg-white p-6 rounded-lg border-2 hover:shadow-md transition-shadow ${branch.isHQ ? 'border-[#1E2E4F] bg-[#1E2E4F]/5' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-[#1E2E4F] mr-2" />
                        <h4 className="font-bold text-[#1E2E4F] text-sm">{branch.name}</h4>
                      </div>
                      {branch.isHQ && (
                        <span className="bg-[#1E2E4F] text-white text-xs font-bold px-2 py-1 rounded">
                          HQ
                        </span>
                      )}
                    </div>
                    <div className="text-gray-700 space-y-2">
                      <p className="font-medium">{branch.location}</p>
                      <p className="text-xs text-gray-500">{branch.address}</p>
                      <p className="text-xs text-gray-500">{branch.area}</p>
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs font-medium text-[#1E2E4F]">📞 {branch.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">ครอบคลุมพื้นที่บริการทั่วประเทศ</p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="bg-[#1E2E4F] text-white px-3 py-1 rounded-full">ภาคกลาง</span>
                  <span className="bg-[#31487A] text-white px-3 py-1 rounded-full">ภาคเหนือ</span>
                  <span className="bg-[#8FB3E2] text-white px-3 py-1 rounded-full">ภาคใต้</span>
                </div>
              </div>
            </div>

            {/* Services Highlight */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#1E2E4F] mb-8 text-center">บริการหลักของ SP Group</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#1E2E4F] to-[#31487A] text-white p-8 rounded-lg">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🏗️</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">SP Kansard</h4>
                    <p className="text-[#8FB3E2] text-sm mb-4">งานกันสาดและโรงจอดรถ</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li>• กันสาดบ้าน อาคาร</li>
                    <li>• โรงจอดรถ</li>
                    <li>• หลังคาเมทัลชีท</li>
                    <li>• งานสแตนเลส</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-[#31487A] to-[#8FB3E2] text-white p-8 rounded-lg">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🏭</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">SP Warehouse</h4>
                    <p className="text-white/80 text-sm mb-4">โกดัง โรงงาน อาคาร</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li>• สร้างโกดัง โรงงาน</li>
                    <li>• อาคารสำนักงาน</li>
                    <li>• โครงสร้างเหล็ก</li>
                    <li>• งานก่อสร้างทั่วไป</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-[#8FB3E2] to-[#1E2E4F] text-white p-8 rounded-lg">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">SP Hardware</h4>
                    <p className="text-white/80 text-sm mb-4">ฮาร์ดแวร์และอุปกรณ์ก่อสร้าง</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li>• อุปกรณ์ฮาร์ดแวร์</li>
                    <li>• วัสดุก่อสร้าง</li>
                    <li>• เครื่องมือช่าง</li>
                    <li>• อะไหล่และสต๊อกสินค้า</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#1E2E4F] text-white p-10 rounded-lg text-center">
              <h3 className="text-3xl font-bold mb-4">พร้อมให้คำปรึกษาฟรี</h3>
              <p className="text-[#8FB3E2] mb-8 max-w-3xl mx-auto text-lg">
                ทีมผู้เชี่ยวชาญของ SP Group พร้อมให้คำแนะนำและออกแบบโซลูชันที่เหมาะสมกับความต้องการของคุณ 
                ตั้งแต่การสำรวจพื้นที่ ออกแบบ จนถึงการติดตั้งและบริการหลังการขาย
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <a href="tel:02-998-5222" className="bg-white text-[#1E2E4F] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition inline-flex items-center text-lg">
                  <Phone className="h-6 w-6 mr-3" />
                  โทรเลย 02-998-5222
                </a>
                <a href="https://line.me/R/ti/p/@566pppph" target="_blank" rel="noopener noreferrer" className="bg-[#00B900] text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition inline-flex items-center text-lg">
                  <span className="mr-3">💬</span>
                  LINE @566pppph
                </a>
                <a href="mailto:spgroup555@gmail.com" className="bg-[#31487A] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#8FB3E2] transition inline-flex items-center text-lg">
                  <Mail className="h-6 w-6 mr-3" />
                  ส่งอีเมล
                </a>
              </div>
              <div className="text-center">
                <p className="text-[#8FB3E2] text-sm">
                  🕒 เวลาทำการ: จันทร์-เสาร์ 8:00-18:00 | อาทิตย์ 9:00-17:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}