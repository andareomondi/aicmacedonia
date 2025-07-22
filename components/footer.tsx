import Link from "next/link"
import { Church, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Church className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">AIC Macedonia</span>
            </div>
            <p className="text-gray-300 mb-4">
              African Inland Church Macedonia - A place of worship, fellowship, and spiritual growth in Athiriver,
              Kenya.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com">
                <Facebook className="h-5 w-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
              </Link>
              <Link href="https://www.youtube.com/@AicmacedoniaGreatwall">
                <Youtube className="h-5 w-5 text-red-400 hover:text-red-300 cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-gray-300 hover:text-white transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/departments" className="text-gray-300 hover:text-white transition-colors">
                  Departments
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ministries</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/departments/youth" className="text-gray-300 hover:text-white transition-colors">
                  Youth Ministry
                </Link>
              </li>
              <li>
                <Link href="/departments/ced" className="text-gray-300 hover:text-white transition-colors">
                  CED Groups
                </Link>
              </li>
              <li>
                <Link href="/choirs" className="text-gray-300 hover:text-white transition-colors">
                  Choirs
                </Link>
              </li>
              <li>
                <Link href="/departments/ushering" className="text-gray-300 hover:text-white transition-colors">
                  Ushering
                </Link>
              </li>
              <li>
                <Link href="/departments/pastoral" className="text-gray-300 hover:text-white transition-colors">
                  Pastoral Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-pink-400" />
                <span className="text-gray-300 text-sm">Greatwall, Athiriver, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-gray-300 text-sm">info@aicmacedonia.org</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Service Times</h4>
              <p className="text-gray-300 text-sm">Sunday: 10:30 AM - 12:30 PM</p>
              <p className="text-gray-300 text-sm">CED: Sunday 1:00 PM - 3:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AIC Macedonia. All rights reserved. Built with ❤️ for the Kingdom.
          </p>
        </div>
      </div>
    </footer>
  )
}
