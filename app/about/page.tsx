import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Lightbulb } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          African Inland Church - Macedonia is a vibrant community dedicated to spreading the love of Christ and serving
          our neighbors.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Lightbulb className="h-6 w-6" /> Our Mission & Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <p className="text-gray-700 mb-4">
              To glorify God by making disciples of Jesus Christ who are transformed by the Gospel, committed to
              community, and engaged in mission.
            </p>
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p className="text-gray-700">
              To be a beacon of hope and transformation in Athiriver, Kenya, fostering spiritual growth, social impact,
              and a deep connection with God and one another.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <History className="h-6 w-6" /> Our Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              AIC Macedonia, originally known as AIC Citycartoon, began its journey in Athiriver, Kenya. Over the years,
              the church has moved and grown, adapting to the needs of its community.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>**AIC Citycartoon**: The initial establishment in Athiriver.</li>
              <li>**AIC Mavoko**: Moved to an adjacent slum, Jamcity, continuing its ministry.</li>
              <li>
                **AIC Macedonia (Greatwall)**: Two years ago, the church relocated to Greatwall, Athiriver, next to
                Mavuno Church, where it continues to thrive as a Local Council Church (LCC) under the District Church
                Council (DCC) of AIC Kasina.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find Us on the Map</h2>
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5783586964985!2d36.9819531!3d-1.4284875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f7546a677f7bd%3A0x9b5249eb8c361bf0!2sHXCJ%2BJQ4%2C%20Athi%20River!5e0!3m2!1sen!2ske!4v1727202931455!5m2!1sen!2ske"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Map of AIC Macedonia Church"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We are a diverse and welcoming family, united by faith and a desire to serve God and our community.
        </p>
        <div className="flex justify-center mt-8 space-x-4">
          <img
            src="https://picsum.photos/id/237/100/100"
            alt="Community member 1"
            className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow-md"
          />
          <img
            src="https://picsum.photos/id/238/100/100"
            alt="Community member 2"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md"
          />
          <img
            src="https://picsum.photos/id/239/100/100"
            alt="Community member 3"
            className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow-md"
          />
        </div>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600">Have questions or want to connect? Reach out to us!</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <a href="mailto:info@aicmacedonia.org">Email Us</a>
          </Button>
          <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50 bg-transparent">
            <a href="tel:+254712345678">Call Us</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
