import { About } from "@/components/about"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />

      {/* Contact & Location Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Visit Us
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-8 w-8 text-pink-500" />
                      <div>
                        <h3 className="font-semibold text-lg">Location</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Greatwall, Athiriver, Kenya
                          <br />
                          Next to Mavuno Church
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-lg">Service Times</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Sunday Service: 9:00 AM - 12:00 PM
                          <br />
                          CED Classes: 1:00 PM - 3:00 PM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Phone className="h-8 w-8 text-pink-500" />
                      <div>
                        <h3 className="font-semibold text-lg">Contact</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Phone: +254 700 000 000
                          <br />
                          Email: info@aicmacedonia.org
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Find Us</h3>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5783586964985!2d36.9819531!3d-1.4284875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f7546a677f7bd%3A0x9b5249eb8c361bf0!2sHXCJ%2BJQ4%2C%20Athi%20River!5e0!3m2!1sen!2ske!4v1727202931455!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AIC Macedonia Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
