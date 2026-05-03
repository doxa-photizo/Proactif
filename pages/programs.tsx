import { motion } from "motion/react";
import { Heart, TrendingUp, MessageCircle, Lightbulb, Users, Award, CheckCircle } from "lucide-react";
import Head from "next/head";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

export default function Programs() {
  const programs = [
    {
      title: "The HyƐ Fa YƆ Campaign",
      tagline: "Normalizing Condom Use Among Young People",
      description: "The HyƐ Fa YƆ Campaign was a large-scale condom activation initiative by ProActif Global aimed at normalizing condom use among young people and empowering them to confidently negotiate for safer sex. Supported by UNFPA Ghana and the Ghana AIDS Commission, the campaign responded to persistent gaps in youth-friendly sexual health education and the stigma surrounding condom use.",
      image: "/pics/Hye fa yc.png",
      icon: MessageCircle,
      bgColor: "bg-red-600",
      iconColor: "text-red-600",
      outcomes: [
        "Significantly improved awareness, acceptance, and willingness to use condoms among participating youth",
        "Contributed to shifting attitudes toward safer sexual practices",
        "Strengthened young people’s ability to make informed decisions",
        "Reinforced multi-stakeholder collaboration in advancing sexual and reproductive health outcomes"
      ],
      approach: "Adopting an interactive, school-based and community-driven approach, the campaign engaged students through practical demonstrations, open conversations, and peer-led discussions that addressed myths, misconceptions, and social barriers to condom use. Over 31 schools across four regions were reached, creating safe spaces for young people to ask questions, build confidence, and develop negotiation skills around consent and protection."
    },
    {
      title: "Skills Acquisition Program (SAP)",
      tagline: "Empowering Women Through Economic Independence",
      description: "SAP equips young women with practical vocational skills and entrepreneurship training, creating pathways to financial independence and empowerment.",
      image: "/pics/skill acquire.jpeg",
      icon: TrendingUp,
      bgColor: "bg-gray-600",
      iconColor: "text-gray-600",
      outcomes: [
        "Trained 60+ women in vocational skills (tailoring, baking, cosmetology)",
        "85% of graduates started income-generating activities",
        "Provided startup capital and mentorship support",
        "Built sustainable livelihood pathways"
      ],
      approach: "Our comprehensive program combines technical skills training with business development, financial literacy, and mentorship. Participants receive hands-on training, starter kits, and ongoing support to launch and grow their businesses."
    },
    {
      title: "Ask Dr. Enimil",
      tagline: "A Safe Space for Your Questions",
      description: "A confidential, judgment-free platform where young people can ask health professionals about sexual and reproductive health concerns.",
      image: "/pics/Ask Dr Enimil.png",
      icon: Heart,
      bgColor: "bg-red-600",
      iconColor: "text-red-600",
      outcomes: [
        "Answered 1,000+ questions from young people",
        "Created accessible online and offline channels",
        "Built trust with youth seeking health information",
        "Connected youth to health services when needed"
      ],
      approach: "Through both digital platforms and community sessions, Dr. Enimil and our team of health professionals provide accurate, compassionate answers to questions young people are often afraid to ask. We ensure privacy, confidentiality, and follow-up support."
    },
    {
      title: "Myth Busters Campaign",
      tagline: "Facts Over Fiction",
      description: "An evidence-based campaign debunking harmful myths and misconceptions about sexual and reproductive health that persist in communities.",
      image: "/pics/What Do You See.png",
      icon: Lightbulb,
      bgColor: "bg-gray-600",
      iconColor: "text-gray-600",
      outcomes: [
        "Reached 300,000+ people through social media campaigns",
        "Addressed 50+ common myths with factual information",
        "Created shareable educational content",
        "Changed misconceptions through community education"
      ],
      approach: "We combine digital storytelling, infographics, videos, and community workshops to address myths head-on with scientific facts. Our content is designed to be engaging, shareable, and culturally relevant."
    },
    {
      title: "Human First?",
      tagline: "Challenging Perceptions, Inspiring Change",
      description: "A thought-provoking campaign that encourages critical thinking about societal norms, gender roles, and the future we want to create.",
      image: "/pics/Human First.png",
      icon: Lightbulb,
      bgColor: "bg-gray-600",
      iconColor: "text-gray-600",
      outcomes: [
        "Engaged thousands in critical conversations",
        "Challenged limiting beliefs and stereotypes",
        "Inspired action towards positive change",
        "Created platforms for diverse perspectives"
      ],
      approach: "Through powerful visuals, interactive content, and community dialogues, we spark conversations that matter. 'What Do You See?' invites everyone to reflect, question, and envision a better future."
    },
    {
      title: "Raw Facts with Auntie Olivia",
      tagline: "Simplifying HIV Data for the Youth",
      description: "Raw Facts with Auntie Olivia was a targeted social media campaign by ProActif Global designed to demystify the figures presented in the annually released HIV/AIDS report by the Ghana AIDS Commission. Recognizing that technical data often remains inaccessible to the general public—especially young people—the campaign translated complex statistics into simple, relatable, and engaging content using short videos, infographics, and conversational messaging led by the relatable persona of “Auntie Olivia.”",
      image: "/pics/Raw Facts.png",
      icon: Lightbulb,
      bgColor: "bg-gray-600",
      iconColor: "text-gray-600",
      outcomes: [
        "Significantly increased awareness and understanding of HIV-related data among young audiences",
        "Improved engagement across ProActif Global’s social media platforms",
        "Contributed to reducing misinformation and stigma",
        "Strengthened the organization’s position as a credible source of simplified, evidence-based sexual and reproductive health information for the youth"
      ],
      approach: "The campaign adopted a youth-friendly, digital-first approach, leveraging platforms such as Instagram, Facebook, and WhatsApp to break down key data points, highlight trends, and address common misconceptions around HIV prevalence, transmission, and treatment. By using clear language, culturally relevant examples, and interactive formats, the initiative created a safe and engaging space for learning and dialogue."
    },
    {
      title: "Living Positively",
      tagline: "Humanizing HIV and Showcasing Resilience",
      description: "Living Positively was a social media campaign implemented by ProActif Global in collaboration with NAP+ Ghana, aimed at humanizing HIV and showcasing the lived realities of persons thriving with the condition. The campaign highlighted inspiring stories of individuals living with HIV who are excelling in business, academia, and various aspects of life, challenging deeply rooted stigma and misconceptions.",
      image: "/pics/Living Positively.png",
      icon: Heart,
      bgColor: "bg-red-600",
      iconColor: "text-red-600",
      outcomes: [
        "Contributed to shifting public perceptions and reducing stigma",
        "Promoted acceptance and inclusion of persons living with HIV",
        "Strengthened community engagement and encouraged positive health-seeking behaviors",
        "Reinforced ProActif Global’s commitment to rights-based advocacy and people-centered HIV communication"
      ],
      approach: "Using a storytelling-driven, digital-first approach, the campaign shared short videos, testimonials, and visual narratives across platforms such as Instagram, Facebook, and WhatsApp. The content emphasized treatment adherence, resilience, and the importance of supportive environments, while presenting HIV not as a limitation but as a manageable condition. The involvement of real voices and authentic experiences made the messaging relatable, impactful, and credible."
    }
  ];

  return (
    <>
      <Head>
        <title>Our Programs | ProActif Global</title>
        <meta name="description" content="Explore the innovative programs and initiatives led by ProActif Global." />
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Programs</h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                Innovative initiatives creating sustainable change in the lives of young people across Ghana.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Programs Detail */}
        {programs.map((program, index) => (
          <section
            key={program.title}
            className={index % 2 === 0 ? "py-20 bg-gray-50 overflow-hidden" : "py-20 overflow-hidden"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                >
                  <div className="relative">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
                    />
                    <div className={`absolute -bottom-6 -right-6 ${program.bgColor} p-6 rounded-xl shadow-xl`}>
                      <program.icon className="size-12 text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                >
                  <div className="inline-block px-4 py-1 bg-gradient-to-r from-red-100 to-gray-100 rounded-full text-sm font-semibold text-red-700 mb-4">
                    Flagship Program
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">{program.title}</h2>
                  <p className="text-xl text-gray-600 mb-6 italic">{program.tagline}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Approach</h3>
                    <p className="text-gray-700 leading-relaxed">{program.approach}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Outcomes</h3>
                    <div className="space-y-3">
                      {program.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className={`size-5 ${program.iconColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* Additional Initiatives */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Additional Initiatives</h2>
              <p className="text-xl text-white/90">Expanding our impact through complementary programs.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "School Outreach Program",
                  description: "Bringing SRHR education directly to students through engaging workshops and peer education.",
                  icon: Users
                },
                {
                  title: "Community Dialogues",
                  description: "Facilitating conversations between youth, parents, and community leaders to bridge generational gaps.",
                  icon: MessageCircle
                },
                {
                  title: "Youth Leadership Academy",
                  description: "Building the next generation of health advocates and community changemakers.",
                  icon: Award
                }
              ].map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
                >
                  <initiative.icon className="size-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{initiative.title}</h3>
                  <p className="text-white/90">{initiative.description}</p>
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
