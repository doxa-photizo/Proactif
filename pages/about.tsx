import { motion } from "motion/react";
import { Target, Eye, CheckCircle, Calendar, Users, Heart } from "lucide-react";
import Head from "next/head";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | ProActif Global</title>
        <meta name="description" content="Learn about ProActif Global LBG, our mission, vision, and the story behind our youth empowerment organization." />
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                We are ProActif Global LBG, a youth-focused non-governmental organization committed to transforming lives through health, advocacy, and empowerment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    ProActif Global LBG was founded in 2020 by a group of passionate young advocates who recognized the critical need for comprehensive sexual and reproductive health education in Ghana. What started as informal community conversations has grown into a registered non-governmental organization serving thousands of young people across the country.
                  </p>
                  <p>
                    Officially registered in 2022, we have quickly become a trusted voice in youth empowerment, working at the intersection of health, education, and economic development. Our approach is rooted in the belief that young people, when given the right information and opportunities, become powerful agents of change in their communities.
                  </p>
                  <p>
                    Today, we operate across multiple regions in Ghana, partnering with schools, community groups, and international organizations to deliver programs that address the real challenges young people face—from accessing quality health information to building economic independence.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="/pics/orientation.jpeg"
                  alt="Team"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-8" />
                    <div>
                      <div className="text-sm opacity-90">Established</div>
                      <div className="text-2xl font-bold">2020</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10 rounded-2xl shadow-lg"
              >
                <div className="size-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="size-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  To empower young people through comprehensive sexual and reproductive health education, socio-economic development programs, and advocacy that creates lasting positive change in their lives and communities. We are committed to breaking down barriers, challenging stigma, and ensuring every young person has access to the information and opportunities they need to thrive.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-10 rounded-2xl shadow-lg"
              >
                <div className="size-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="size-8 text-gray-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  A Ghana where every young person, regardless of their background, has access to quality sexual and reproductive health information, economic opportunities, and the power to make informed decisions about their future. We envision communities where youth are not just participants but leaders driving sustainable development and social change.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Empowerment",
                  description: "We believe in giving young people the tools, knowledge, and confidence to take control of their futures."
                },
                {
                  title: "Inclusivity",
                  description: "We create safe, welcoming spaces for all young people, regardless of background or circumstance."
                },
                {
                  title: "Integrity",
                  description: "We operate with transparency, accountability, and unwavering commitment to our mission."
                },
                {
                  title: "Innovation",
                  description: "We embrace creative approaches to address the evolving needs of young people."
                },
                {
                  title: "Collaboration",
                  description: "We partner with communities, organizations, and stakeholders to maximize our impact."
                },
                {
                  title: "Continuous Learning",
                  description: "We believe growth never stops. We empower individuals to learn, evolve, and stay informed to make better decisions for their future."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-red-50 to-gray-50 border border-red-100 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Objectives</h2>
              <p className="text-xl text-gray-600">Strategic goals driving our work forward.</p>
            </motion.div>

            <div className="grid gap-6">
              {[
                "Provide comprehensive, youth-friendly sexual and reproductive health education to at least 100,000 young people by 2028.",
                "Establish SRHR education programs in 100+ schools across Ghana.",
                "Train and empower 500+ young women through our Skills Acquisition Program.",
                "Advocate for youth-centered policies at local and national levels.",
                "Build partnerships with 50+ organizations to expand our reach and impact.",
                "Create sustainable economic opportunities for marginalized youth.",
                "Reduce stigma and misconceptions around sexual and reproductive health through evidence-based campaigns."
              ].map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl flex items-start gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="size-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg">{objective}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Working Modalities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
              <p className="text-xl text-gray-600">Our approach to creating sustainable impact.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Community-Led",
                  description: "We work alongside communities, ensuring programs are culturally relevant and locally owned.",
                  icon: Users
                },
                {
                  title: "Evidence-Based",
                  description: "Our programs are grounded in research, data, and proven methodologies for maximum effectiveness.",
                  icon: CheckCircle
                },
                {
                  title: "Youth-Centered",
                  description: "Young people are not just beneficiaries but active partners in designing and implementing our programs.",
                  icon: Heart
                }
              ].map((approach, index) => (
                <motion.div
                  key={approach.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="size-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <approach.icon className="size-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{approach.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{approach.description}</p>
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
