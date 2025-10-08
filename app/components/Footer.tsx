import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1e2e4f' }} className="text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="SP Hardware Logo"
                width={120}
                height={120}
                className="mb-3"
              />
            </div>
            <p className="text-gray-300 mb-4">ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-white" />
                <div>
                  <a href="tel:02-123-4567" className="hover:text-gray-300 transition-colors block">02-123-4567</a>
                  <a href="tel:089-123-4567" className="hover:text-gray-300 transition-colors">089-123-4567</a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-white" />
                <a href="mailto:info@sp-hardware.com" className="hover:text-gray-300 transition-colors">
                  info@sp-hardware.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-white flex-shrink-0" />
                <span className="text-gray-300">123/45 ถนนรามคำแหง แขวงมีนบุรี<br />เขตมีนบุรี กรุงเทพฯ 10510</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="font-semibold mb-4">หมวดหมู่สินค้า</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  วัสดุกันสาด
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  วัสดุปรับแสง
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  ระแนง/ฟ้า
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  หลังคาโรงรถ
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  อุปกรณ์ติดตั้ง
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold mb-4">บริการ</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  เลือกวัสดุ
                </Link>
              </li>
              <li>
                <a href="https://line.me/R/ti/p/@sp-hardware" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  ปรึกษาเรา
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  บริการติดตั้ง
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  หลังการขาย
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4">ติดต่อเรา</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="text-white font-medium">Website:</span><br />
                <span>www.sp-hardware.com</span>
              </li>
              <li>
                <span className="text-white font-medium">เวลาทำการ:</span><br />
                <span>จันทร์ - เสาร์: 8:00 - 18:00</span><br />
                <span>อาทิตย์: 9:00 - 17:00</span>
              </li>
              <li className="pt-2">
                <span className="text-white font-medium">ติดตามเรา:</span><br />
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="hover:text-white transition-colors">Facebook</a>
                  <a href="https://line.me/R/ti/p/@sp-hardware" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINE</a>
                  <a href="#" className="hover:text-white transition-colors">YouTube</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2025 SP HARDWARE. สงวนลิขสิทธิ์.</p>
          <p className="text-sm mt-2">
            ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย
          </p>
        </div>
      </div>
    </footer>
  );
}