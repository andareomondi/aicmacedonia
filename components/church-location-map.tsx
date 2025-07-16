"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export function ChurchLocationMap() {
  const handleGetDirections = () => {
    const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=HXCJ%2BJQ4%2C%20Athi%20River"
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Visit Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're located in Greatwall, Athiriver, Kenya, next to Mavuno Church. Join us for worship and fellowship!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5783586964985!2d36.9819531!3d-1.4284875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f7546a677f7bd%3A0x9b5249eb8c361bf0!2sHXCJ%2BJQ4%2C%20Athi%20River!5e0!3m2!1sen!2ske!4v1727202931455!5m2!1sen!2ske"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />

                {/* Overlay with church info */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">AIC Macedonia</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Greatwall, Athiriver, Kenya
                    <br />
                    Next to Mavuno Church
                  </p>
                  <Button
                    onClick={handleGetDirections}
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-sm text-gray-600">
                Greatwall, Athiriver
                <br />
                Machakos County, Kenya
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Navigation className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Landmark</h3>
              <p className="text-sm text-gray-600">
                Next to Mavuno Church
                <br />
                Near Jamcity Area
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="h-8 w-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-sm font-bold">AIC</span>
              </div>
              <h3 className="font-semibold mb-2">Parking</h3>
              <p className="text-sm text-gray-600">
                Free parking available
                <br />
                on church premises
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
