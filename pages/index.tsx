import { motion } from "motion/react";
import { ArrowRight, Heart, Users, TrendingUp, Award, HeartHandshake, GraduationCap, Megaphone, Sparkles } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>ProActif Global | Youth Empowerment non-profit in Ghana</title>
        <meta
          name="description"
          content="Empowering Ghanaian youth through sexual reproductive health advocacy, skills development, and community impact."
        />
      </Head>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/pics/mentoring.png"
              alt="Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-red-900/85 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Empowering Youth. Transforming Communities.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-red-100 mb-8 leading-relaxed"
              >
                Building a healthier, more empowered future through sexual and
                reproductive health advocacy, youth leadership, and community
                development.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-all font-semibold flex items-center gap-2 group"
                >
                  Join Us
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/programs"
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About ProActif Global
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We are driven by values that create safe spaces, break stigma, and empower
                young people to live healthy, purposeful, and economically independent lives.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Our Mission",
                  description:
                    "To empower young people through comprehensive sexual and reproductive health education, advocacy, and socio-economic development programs.",
                  icon: Heart,
                  bgColor: "bg-red-100",
                  iconColor: "text-red-600",
                },
                {
                  title: "Our Vision",
                  description:
                    "A Ghana where every young person has access to quality health information, economic opportunities, and the power to shape their future.",
                  icon: Sparkles,
                  bgColor: "bg-gray-100",
                  iconColor: "text-gray-600",
                },
                {
                  title: "Our Impact",
                  description:
                    "Established in 2020, registered in 2022, we've reached thousands of youth across Ghana with life-changing programs.",
                  icon: Award,
                  bgColor: "bg-red-100",
                  iconColor: "text-red-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`size-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-6`}
                  >
                    <item.icon className={`size-7 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Focus Areas
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive programs designed to create lasting impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Sexual & Reproductive Health",
                  description:
                    "Comprehensive SRHR education and advocacy for informed decision-making.",
                  icon: Heart,
                  gradient: "from-red-500 to-red-600",
                },
                {
                  title: "Youth Leadership",
                  description:
                    "Developing the next generation of community leaders and changemakers.",
                  icon: Users,
                  gradient: "from-gray-700 to-gray-800",
                },
                {
                  title: "Advocacy & Policy",
                  description:
                    "Influencing policies that affect youth health and development.",
                  icon: Megaphone,
                  gradient: "from-red-500 to-red-700",
                },
                {
                  title: "Skills Acquisition Programs",
                  description:
                    "Building capacity through workshops, seminars, and mentorship.",
                  icon: GraduationCap,
                  gradient: "from-gray-600 to-gray-800",
                },
              ].map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div
                    className={`size-12 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <area.icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-xl text-red-100">
                Making a real difference in communities across Ghana.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: 800000, label: "Youth Reached", suffix: "+" },
                { value: 110, label: "Schools Engaged", suffix: "+" },
                { value: 200, label: "Beneficiaries of Skils acquisition program", suffix: "+" },
                { value: 1000000, label: "Campaign Reach", suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-bold mb-2 flex items-center justify-center">
                    <Counter end={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-lg text-red-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SDG Alignment Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Impact & Global Goals
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Our work contributes to global development priorities in health,
                education, equality, and empowerment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  sdgNumber: "3",
                  title: "Good Health and Well-being",
                  description:
                    "Promoting sexual and reproductive health awareness and access to quality health information.",
                  color: "#4C9F38",
                },
                {
                  sdgNumber: "5",
                  title: "Gender Equality",
                  description:
                    "Empowering women and girls through skills training and advocacy for equal opportunities.",
                  color: "#FF3A21",
                },
                {
                  sdgNumber: "4",
                  title: "Quality Education",
                  description:
                    "Providing comprehensive health education and capacity building for youth development.",
                  color: "#C5192D",
                },
                {
                  sdgNumber: "8",
                  title: "Decent Work and Economic Growth",
                  description:
                    "Creating pathways to employment through vocational skills and entrepreneurship training.",
                  color: "#A21942",
                },
                {
                  sdgNumber: "10",
                  title: "Reduced Inequalities",
                  description:
                    "Ensuring marginalized youth have access to health services and economic opportunities.",
                  color: "#DD1367",
                },
                {
                  sdgNumber: "17",
                  title: "Partnerships for the Goals",
                  description:
                    "Collaborating with organizations to amplify impact and achieve sustainable development.",
                  color: "#19486A",
                },
              ].map((sdg, index) => (
                <motion.div
                  key={sdg.sdgNumber}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                  style={{ borderTop: `4px solid ${sdg.color}` }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="size-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.sdgNumber}
                      </div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        SDG {sdg.sdgNumber}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                      {sdg.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {sdg.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Highlight */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Flagship Programs
              </h2>
              <p className="text-xl text-gray-600">
                Innovative initiatives creating sustainable change.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "HyƐ Fa YƆ Campaign",
                  description:
                    "A bold initiative tackling stigma around sexual and reproductive health through community engagement and youth-led conversations.",
                  image: "/pics/Hye fa yc.png",
                  overlayClass: "from-red-900 via-red-900/70",
                },
                {
                  title: "Skills Acquisition Program (SAP)",
                  description:
                    "Equipping young women with vocational skills and entrepreneurship training for economic independence and empowerment.",
                  image: "/pics/skill acquire.jpeg",
                  overlayClass: "from-gray-900 via-gray-900/70",
                },
                {
                  title: "Ask Dr. Enimil",
                  description:
                    "A safe space for young people to ask questions about sexual and reproductive health without judgment or stigma.",
                  image: "/pics/Ask Dr Enimil.png",
                  overlayClass: "from-red-900 via-red-900/70",
                },
                {
                  title: "Myth Busters Campaign",
                  description:
                    "Debunking harmful myths and misconceptions about SRHR through evidence-based education and community outreach.",
                  image: "/pics/What Do You See.png",
                  overlayClass: "from-gray-900 via-gray-900/70",
                },
              ].map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${program.overlayClass} to-transparent flex flex-col justify-end p-8`}
                  >
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {program.title}
                    </h3>
                    <p className="text-white/90 mb-4">{program.description}</p>
                    <Link
                      href="/programs"
                      className="text-white font-semibold flex items-center gap-2 group/link"
                    >
                      Learn More
                      <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Partners
              </h2>
              <p className="text-xl text-gray-600">
                Collaborating with leading organizations for greater impact.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                { name: "NAP+ Ghana", image: "/pics/NAP+ Logo.png" },
                { name: "Ghana AIDS Commission", image: null }, // Don't see an explicit AIDS commision logo, keep as text
                { name: "UNFPA Ghana", image: "/pics/UNFPA.png" },
                { name: "GNP+", image: null },
              ].map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl flex items-center justify-center h-32 hover:shadow-lg transition-shadow"
                >
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-gray-600 text-center">
                      {partner.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Stories of Impact
              </h2>
              <p className="text-xl text-gray-600">
                Hear from the young people we've empowered.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "ProActif Global gave me the confidence to start my own business. The skills training changed my life completely.",
                  name: "Akosua M.",
                  role: "SAP Graduate",
                  image: "/pics/491354364_1000158678850831_7794252359931159666_n.jpg.jpeg",
                },
                {
                  quote:
                    "I finally found a safe space to ask questions about my health without judgment. The information I received was life-changing.",
                  name: "Kwame A.",
                  role: "Youth Beneficiary",
                  image: "/pics/512622255_1045077861025579_6316323764039927434_n.jpg.jpeg",
                },
                {
                  quote:
                    "The leadership training helped me become a voice for my community. I'm now advocating for youth health rights in my district.",
                  name: "Ama K.",
                  role: "Youth Leader",
                  image: "/pics/513339070_1045077647692267_2937331783500375861_n.jpg.jpeg",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8"
                >
                  <div className="mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="size-16 rounded-full object-cover mb-4"
                    />
                    <p className="text-gray-700 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Support Our Mission
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Together, we can create lasting change in the lives of young
                people across Ghana.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-all font-semibold"
                >
                  Donate Now
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold"
                >
                  Volunteer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
