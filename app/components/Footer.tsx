import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e2e4f] text-white">
      <div className="container mx-auto px-4 md:px-16 max-w-full py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="SP Hardware Logo"
                width={140}
                height={90}
                className="mb-4"
              />
            </div>
            <p className="text-gray-300 mb-4 text-lg font-medium">
              ศูนย์รวมวัสดุก่อสร้างและกันสาดครบวงจร
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              บริษัท เอสพี ฮาร์ดแวร์ จำกัด - ผู้เชี่ยวชาญด้านวัสดุกันสาดและอุปกรณ์ก่อสร้าง
              ด้วยประสบการณ์กว่า 25 ปี พร้อมให้บริการทั่วประเทศ
            </p>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#31487a] rounded-lg flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">โทรศัพท์</p>
                  <a href="tel:091-939-7000" className="font-semibold hover:text-gray-300 transition-colors">
                    091-939-7000
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#31487a] rounded-lg flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">อีเมล</p>
                  <a href="mailto:sphardware9@gmail.com" className="font-semibold hover:text-gray-300 transition-colors text-sm">
                    sphardware9@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-white">เมนูหลัก</h5>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-[#31487a] rounded-full mr-3"></span>
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-[#31487a] rounded-full mr-3"></span>
                  วัสดุของเรา
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-[#31487a] rounded-full mr-3"></span>
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-[#31487a] rounded-full mr-3"></span>
                  ตะกร้าสินค้า
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-white">ติดต่อเรา</h5>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-[#31487a] flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  เลขที่ 28/101 ถ.รัชดา-รามอินทรา<br />
                  แขวงคลองกุ่ม เขตบึงกุ่ม<br />
                  กรุงเทพฯ 10230
                </span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-[#31487a] flex-shrink-0" />
                <div>
                  <p className="text-sm">เปิดทุกวัน</p>
                  <p className="font-semibold">08:00 - 17:00 น.</p>
                </div>
              </li>
              <li>
                <a 
                  href="https://line.me/R/ti/p/@576kulwa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-[#06C755] text-white px-4 py-2 rounded-lg hover:bg-[#05b04c] transition-colors font-medium"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  แอดไลน์ @576kulwa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 SP HARDWARE. สงวนลิขสิทธิ์ทั้งหมด</p>
            <p className="mt-2 md:mt-0">
              บริษัท เอสพี ฮาร์ดแวร์ จำกัด | ส่วนหนึ่งของ SP Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}