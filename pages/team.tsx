import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";
import image from "next/image";

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    role: string;
    bio: string;
    fullBio?: string[];
    image: string;
    email: string;
  } | null>(null);

  const team = [
    {
      name: "Nathaniel Akwasi Oduro",
      role: "Executive Director",
      bio: "Nathaniel Akwasi Oduro is the Executive Director of ProActif Global, providing strategic leadership and vision for the organisation’s mission to empower young people...",
      fullBio: [
        "Nathaniel Akwasi Oduro is the Executive Director of ProActif Global, providing strategic leadership and vision for the organisation’s mission to empower young people—particularly adolescent girls and young women—to make informed decisions about their health, livelihoods, and future.",
        "He holds a Master’s Degree in Finance and Investment from the University of Central Lancashire, United Kingdom, and a Bachelor’s degree in Banking and Finance from Methodist University, Ghana. With a strong background in finance, business development, and organizational leadership, Nathaniel brings a results-oriented, impact-driven approach to managing development programs.",
        "Before leading ProActif Global, he built a distinguished professional career across the banking and corporate sectors. He served as Retail Business Head at Access Bank Ghana, where he led strategic initiatives to drive growth and deepen customer engagement. He also worked as Branch Manager at Royal Winners Microfinance Ltd, overseeing operations and strengthening financial inclusion at the community level. Earlier in his career, he contributed to business expansion efforts as Marketing Manager at Innovation Creek.",
        "Under his leadership, ProActif Global has expanded its reach and influence through innovative programs such as the Skills Acquisition Program (SAP), advocacy campaigns addressing HIV stigma and discrimination, and strategic partnerships with national and international stakeholders. Nathaniel is particularly passionate about integrating economic empowerment with sexual and reproductive health and rights (SRHR) education to ensure that young people are equipped not only with knowledge but also with practical opportunities to thrive."
      ],
      image: "/pics/Nathaniel.png",
      email: "nathaniel@proactifglobal.org"
    },
    {
      name: "Anaba Blessing",
      role: "Programs Manager",
      bio: "Anaba Blessing serves as the Programs Manager of ProActif Global, a role she has held since the beginning of the year, where she provides strategic oversight for the design, implementation...",
      fullBio: [
        "Anaba Blessing serves as the Programs Manager of ProActif Global, a role she has held since the beginning of the year, where she provides strategic oversight for the design, implementation, and evaluation of the organization’s interventions. She leads the coordination of youth-focused programs, ensuring that all initiatives are impactful, well-structured, and aligned with ProActif Global’s mission to empower young people and address critical issues such as HIV prevention and sexual and reproductive health and rights (SRHR).",
        "An alumna of the University for Development Studies (UDS), Tamale, Blessing holds a degree in Social Change and Communication. Her academic training has equipped her with strong expertise in behavior change communication, community engagement, and advocacy, which she applies effectively in shaping responsive and inclusive programs that meet the needs of diverse communities.",
        "In her role, Blessing oversees program planning, stakeholder engagement, and field implementation, while strengthening internal systems to enhance efficiency and accountability. Her progression from Administrator to Programs Manager reflects her dedication, leadership capacity, and consistent delivery of results, positioning her as a key driver of ProActif Global’s commitment to sustainable impact and community transformation."
      ],
      image: "/pics/Anaba.png",
      email: "[EMAIL_ADDRESS]"
    },
    {
      name: "Benedicta Mensah",
      role: "Administrator",
      bio: "Benedicta Mensah serves as the Administrator of ProActif Global LBG, where she provides essential administrative leadership and operational support to ensure the effective delivery...",
      fullBio: [
        "Benedicta Mensah is a dedicated young professional and emerging development practitioner with a strong academic background in governance and public administration. She is a graduate of University of Education, Winneba, where she studied Political Science, equipping her with knowledge in leadership, public policy, governance systems, and community development. Her academic journey reflects her passion for social impact, youth empowerment, and institutional growth.",
        "Currently serving as the Administrator of ProActif Global, Benedicta plays a critical role in the coordination and management of the organization’s administrative operations and programs. Her commitment to professionalism, organizational efficiency, and teamwork has contributed significantly to the smooth implementation of ProActif Global’s interventions, particularly those focused on youth empowerment, sexual and reproductive health rights, skills development, and community engagement.",
        "Prior to joining ProActif Global in a full-time capacity, Benedicta undertook her National Service at the Kwadaso Municipal Assembly, where she served as an Organizer for the Revenue Department. In this role, she supported revenue mobilization activities, stakeholder engagement, and administrative coordination within the Assembly. Her experience in local governance and public administration has strengthened her capacity to work effectively within both public and civil society institutions, positioning her as a promising young leader committed to national development and social transformation."
      ],
      image: "/pics/benedicta.jpeg",
      email: "[EMAIL_ADDRESS]"
    },
    {
      name: "Azumah Collins",
      role: "Finance Officer",
      bio: "Azumah Collins is a dedicated finance and administrative professional with a strong background in accounting, financial management, procurement, and statutory...",
      fullBio: [
        "Azumah Collins is a dedicated finance and administrative professional with a strong background in accounting, financial management, procurement, and statutory compliance. He holds a degree from the University of Education, Winneba, and is currently pursuing the Level Two Professional Qualification of the Institute of Chartered Accountants, Ghana. Throughout his career, he has demonstrated exceptional attention to detail, analytical competence, and a commitment to accountability, earning recognition as Best Administrative Staff at Little Angels Academy in Kumasi. His expertise spans financial reporting, budget preparation and monitoring, tax administration, bank reconciliation, inventory management, and procurement oversight.",
        "For the past eighteen months, Azumah has served as the Finance Officer of ProActif Global, where he has played a pivotal role in strengthening the organization’s financial systems and ensuring compliance with donor and regulatory requirements. He provides strategic financial oversight, maintains accurate financial records, supports project budgeting and reporting, and contributes to the efficient management of organizational resources. Beyond his technical competencies, Azumah is known for his integrity, teamwork, and dedication to supporting ProActif Global’s mission of empowering young people and advancing social development initiatives across Ghana. His blend of financial expertise and commitment to community impact makes him a valuable asset to the organization."
      ],
      image: "/pics/collins.jpeg",
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
                  className="group flex flex-col"
                >
                  <div className={`relative mb-6 overflow-hidden rounded-2xl aspect-square ${
                    member.name === "Azumah Collins" ? "bg-[#b8b6b4]" : ""
                  }`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full transition-transform duration-500 ${
                        member.name === "Azumah Collins"
                          ? "object-cover object-[center_10%] scale-90"
                          : "object-cover group-hover:scale-105"
                      }`}
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
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="inline-block self-start px-4 py-1 bg-gradient-to-r from-red-100 to-gray-100 rounded-full text-sm font-semibold text-red-700 mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4 flex-grow">{member.bio}</p>
                    {member.fullBio && (
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="text-red-600 font-semibold text-left flex items-center hover:text-red-800 transition-colors mt-auto"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for full bio */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-10 size-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="size-5 text-gray-800" />
                </button>

                <div className={`w-full md:w-2/5 h-64 md:h-auto shrink-0 relative ${
                  selectedMember.name === "Azumah Collins" ? "bg-[#b8b6b4]" : ""
                }`}>
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className={`absolute inset-0 w-full h-full ${
                      selectedMember.name === "Azumah Collins"
                        ? "object-cover object-[center_10%] scale-90"
                        : "object-cover"
                    }`}
                  />
                </div>

                <div className="p-8 md:p-12 overflow-y-auto w-full">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
                  <div className="inline-block px-4 py-1 bg-red-100 rounded-full text-sm font-semibold text-red-700 mb-6">
                    {selectedMember.role}
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {selectedMember.fullBio?.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      <Mail className="size-4" />
                      Email {selectedMember.name.split(" ")[0]}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
