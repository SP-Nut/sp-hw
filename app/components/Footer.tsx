import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">SP <span className="text-blue-400">Hardware</span></h4>
            <p className="text-slate-400 mb-4">ผู้จำหน่ายวัสดุก่อสร้างและฮาร์ดแวร์ครบวงจร</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <a href="tel:080-123-4567" className="hover:text-blue-400 transition-colors">080-123-4567</a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <a href="mailto:info@sphardware.com" className="hover:text-blue-400 transition-colors">
                  info@sphardware.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span>กรุงเทพฯ 10110</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="font-semibold mb-4">หมวดหมู่สินค้า</h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/categories?category=roofing" className="hover:text-blue-400 transition-colors">
                  กันสาด/หลังคา
                </Link>
              </li>
              <li>
                <Link href="/categories?category=metal-sheet" className="hover:text-blue-400 transition-colors">
                  เมทัลชีท
                </Link>
              </li>
              <li>
                <Link href="/categories?category=electrical" className="hover:text-blue-400 transition-colors">
                  อุปกรณ์ไฟฟ้า
                </Link>
              </li>
              <li>
                <Link href="/categories?category=pvc-pipe" className="hover:text-blue-400 transition-colors">
                  ท่อ PVC
                </Link>
              </li>
              <li>
                <Link href="/categories?category=paint" className="hover:text-blue-400 transition-colors">
                  สีทาอาคาร
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold mb-4">บริการ</h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/quotation" className="hover:text-blue-400 transition-colors">
                  ใบเสนอราคา
                </Link>
              </li>
              <li>
                <Link href="/services/installation" className="hover:text-blue-400 transition-colors">
                  บริการติดตั้ง
                </Link>
              </li>
              <li>
                <Link href="/services/consultation" className="hover:text-blue-400 transition-colors">
                  คำปรึกษา
                </Link>
              </li>
              <li>
                <Link href="/services/support" className="hover:text-white">
                  หลังการขาย
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-blue-400 transition-colors">
                  รับประกันสินค้า
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4">ลิงก์ด่วน</h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  เงื่อนไขการใช้งาน
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-400 transition-colors">
                  นโยบายการส่งสินค้า
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Working Hours */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="text-center mb-6">
            <h5 className="font-semibold mb-2 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-2 text-blue-400" />
              เวลาทำการ
            </h5>
            <div className="text-slate-400 space-y-1">
              <p>จันทร์ - เสาร์: 8:00 - 18:00</p>
              <p>อาทิตย์: 9:00 - 17:00</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mb-6">
            <h5 className="font-semibold mb-4">ติดตามเรา</h5>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com/sphardware"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://line.me/R/ti/p/@sphardware"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                LINE
              </a>
              <a
                href="https://instagram.com/sphardware"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700 pt-6 text-center text-slate-400">
            <p>&copy; 2024 SP Hardware. สงวนลิขสิทธิ์.</p>
            <p className="text-sm mt-2">
              พัฒนาโดย{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                SP Development Team
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}