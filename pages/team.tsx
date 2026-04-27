import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

export default function Team() {
  const team = [
    {
      name: "Nathaniel Akwasi Oduro",
      role: "Executive Director",
      bio: "Nathaniel provides strategic leadership and vision for the organisation’s mission. He holds a Master’s Degree in Finance and Investment from the University of Central Lancashire and brings a strong background in finance, business development, and organizational leadership from his time as Retail Business Head at Access Bank.",
      image: "/pics/Nathaniel.png",
      email: "nathaniel@proactifglobal.org"
    },
    {
      name: "Anaba Blessing",
      role: "Programs Manager",
      bio: "Anaba provides strategic oversight for the design, implementation, and evaluation of interventions. An alumna of the University for Development Studies, she applies her expertise in behavior change communication to shape responsive and inclusive programs.",
      image: "/pics/Anaba.png",
      email: "blessing.anaba@proactifglobal.org"
    },
    {
      name: "Baafi Michelle",
      role: "Administrator",
      bio: "Baafi provides essential administrative leadership and operational support. Holding a BSc in Management Education from the University of Education, Winneba, she oversees day-to-day functions and supports program coordination to maintain efficient systems.",
      image: "/pics/Michelle.png",
      email: "michelle@proactifglobal.org"
    },
    {
      name: "Blessing Esi Bosomtwe",
      role: "SAP Coordinator",
      bio: "Blessing plays a pivotal role in designing and strengthening youth empowerment initiatives like the Skills Acquisition Program. With a background in Statistics with Economics and entrepreneurial leadership, she brings a strong analytical foundation to program coordination.",
      image: "/pics/Blessing.png",
      email: "blessing.esi@proactifglobal.org"
    },
    {
      name: "Kelvin Boakye",
      role: "ProActif Global Ambassador",
      bio: "Kelvin is a dedicated volunteer and ProActif Global Ambassador at the Senior High School level. He plays a vital role in raising awareness, encouraging participation, and fostering positive conversations among his peers.",
      image: "/pics/Kelvin.png",
      email: "kelvin@proactifglobal.org"
    },
    {
      name: "Community Mobilizers",
      role: "Volunteers",
      bio: "Our Community Mobilizers are the backbone of our grassroots initiatives. They work directly within communities to identify needs, mobilize participation, and ensure our programs reach those who need them most. Their dedication and local knowledge are essential to our success.",
      image: "/pics/volunteer.jpeg",
      email: "[EMAIL_ADDRESS]"
    }
  ];


  return (
    <>
      <Head>
        <title>Our Team | ProActif Global</title>
        <meta name="description" content="Meet the leaders driving change and transforming communities at ProActif Global LBG." />
      </Head>

      <Navbar />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Team</h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                Meet the dedicated leaders driving change and empowering communities across Ghana.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex gap-3">
                        <a
                          href={`mailto:${member.email}`}
                          className="size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <Mail className="size-5 text-white" />
                        </a>
                        <a
                          href="#"
                          className="size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <FaLinkedin className="size-5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-red-100 to-gray-100 rounded-full text-sm font-semibold text-red-700 mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Join Our Team</h2>
              <p className="text-xl text-gray-600 mb-8">
                We're always looking for passionate individuals who share our vision of empowering youth and transforming communities.
              </p>
              <a
                href="mailto:proactifglobal@gmail.com"
                className="inline-block px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>

        {/* Volunteers & Partners */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Volunteers & Community</h2>
              <p className="text-xl text-gray-600">Our work is made possible by dedicated volunteers and community advocates.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  stat: "50+",
                  label: "Active Volunteers",
                  description: "Community members dedicating their time and skills"
                },
                {
                  stat: "20+",
                  label: "Youth Ambassadors",
                  description: "Trained peer educators leading change"
                },
                {
                  stat: "15+",
                  label: "Partner Organizations",
                  description: "Collaborating for greater impact"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center bg-gradient-to-br from-red-50 to-gray-50 p-8 rounded-2xl"
                >
                  <div className="text-5xl font-bold text-red-600 mb-2">{item.stat}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{item.label}</div>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
