"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Users, Heart } from "lucide-react"

export function About() {
  const history = [
    {
      year: "Early Years",
      location: "AIC Citycartoon",
      description:
        "Our church began its journey in Athiriver, Kenya as AIC Citycartoon, establishing our foundation in the community.",
    },
    {
      year: "Growth Phase",
      location: "AIC Mavoko",
      description:
        "We moved to AIC Mavoko in the adjacent Jamcity slum, expanding our reach and ministry to serve more families.",
    },
    {
      year: "2022 - Present",
      location: "Greatwall, Athiriver",
      description:
        "Two years ago, we relocated to our current home in Greatwall, Athiriver, next to Mavuno Church, where we continue to grow.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            About AIC Macedonia
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            African Inland Church Macedonia is a Local Council Church (LCC) under AIC Kasina, dedicated to spreading the
            Gospel and building a strong Christian community.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-pink-200 dark:border-pink-800">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-pink-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To spread the love of Christ through worship, fellowship, and service to our community. We are
                  committed to nurturing spiritual growth and building lasting relationships centered on faith.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To be a beacon of hope and transformation in Athiriver and beyond, raising disciples who will impact
                  their communities with the Gospel of Jesus Christ.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Our Journey</h3>
          <div className="space-y-8">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="flex-1">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{item.year}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <MapPin className="h-5 w-5 text-pink-500 mr-2" />
                        <span className="font-semibold text-pink-600 dark:text-pink-400">{item.location}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
