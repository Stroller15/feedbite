import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileTextIcon,
  ZapIcon,
  ShieldCheckIcon,
  LayoutIcon,
  ArrowRightIcon,
  ChromeIcon,
  CheckCircleIcon,
  SparklesIcon,
  ClockIcon,
  PlayCircleIcon,
} from "lucide-react";
import ExtensionDemo from "@/components/ExtensionDemo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["none", "0 4px 20px -2px rgba(0, 0, 0, 0.05)"]
  );

  const handleInstallClick = () => {
    const extensionUrl =
      "https://chromewebstore.google.com/detail/mnbbbmdiphmdplpgoligldmnifckogfc";
    window.open(extensionUrl, "_blank");
  };

  const handleDemoClick = () => {
    const demoUrl =
      "https://www.loom.com/share/70b0857ff9634c219d758a937529c4a3";
    window.open(demoUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-linkedin-blue/20 selection:text-linkedin-blue">
      {/* Floating Header */}
      <motion.header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          boxShadow: headerShadow,
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-linkedin-blue text-white p-1.5 rounded-lg">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Feedbite
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-linkedin-blue transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-linkedin-blue transition-colors"
            >
              How it Works
            </a>
          </div>

          <Button
            onClick={handleInstallClick}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Download
          </Button>
        </div>
      </motion.header>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-24 lg:mb-32 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-linkedin-blue/5 via-blue-100/20 to-purple-100/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-20 -right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-linkedin-blue/10 to-blue-100 border border-linkedin-blue/20 rounded-full px-4 py-1.5 mb-6"
              >
                <SparklesIcon className="w-4 h-4 text-linkedin-blue" />
                <span className="text-sm font-semibold text-linkedin-blue">
                  AI-Powered Summaries
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.05]"
              >
                Master Your{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-linkedin-blue via-blue-600 to-blue-700">
                    LinkedIn Feed
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      d="M2 8C50 4 100 2 150 6C200 10 250 4 298 8"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#0A66C2" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Stop scrolling through walls of text. Get instant, AI-powered
                summaries of LinkedIn posts with a single click.{" "}
                <span className="text-gray-900 font-semibold">
                  Save hours every week.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              >
                <Button
                  size="lg"
                  onClick={handleInstallClick}
                  className="h-14 px-8 text-lg rounded-full bg-linkedin-blue hover:bg-blue-700 shadow-[0_8px_30px_-6px_rgba(10,102,194,0.5)] hover:shadow-[0_12px_40px_-6px_rgba(10,102,194,0.6)] transition-all w-full sm:w-auto group"
                >
                  <ChromeIcon className="mr-2 w-5 h-5" />
                  Add to Chrome - It's Free
                  <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDemoClick}
                  className="h-14 px-8 text-lg rounded-full border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 w-full sm:w-auto transition-all group"
                >
                  <PlayCircleIcon className="mr-2 w-5 h-5 text-linkedin-blue group-hover:scale-110 transition-transform" />
                  View Demo
                </Button>
              </motion.div>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-500"
              >
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Free forever</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">No account required</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Privacy focused</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Glow effect behind browser */}
              <div className="absolute -inset-4 bg-gradient-to-r from-linkedin-blue/20 via-blue-300/30 to-purple-300/20 rounded-[2rem] blur-2xl opacity-60 -z-10"></div>
              <motion.div
                animate={{
                  boxShadow: [
                    "0 25px 50px -12px rgba(10, 102, 194, 0.15)",
                    "0 35px 60px -12px rgba(10, 102, 194, 0.25)",
                    "0 25px 50px -12px rgba(10, 102, 194, 0.15)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative rounded-2xl overflow-hidden border border-gray-200/80 bg-white"
              >
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 flex items-center px-4 gap-2 z-10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28CA41] shadow-sm"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white border border-gray-200 rounded-lg py-1.5 px-4 text-xs text-gray-600 inline-flex items-center gap-2 mx-auto shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-medium">linkedin.com/feed</span>
                    </div>
                  </div>
                </div>
                <div className="pt-12 bg-gradient-to-b from-gray-50 to-white">
                  <ExtensionDemo />
                </div>
              </motion.div>

              {/* Floating Badge - Time Saved */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.7 },
                  x: { duration: 0.5, delay: 0.7 },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                className="absolute bottom-8 -right-4 lg:-right-8 bg-white p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center gap-3 z-20"
              >
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2.5 rounded-xl shadow-lg shadow-green-500/20">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Avg. Time Saved
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    2.5 hrs
                    <span className="text-sm font-medium text-gray-500">
                      /week
                    </span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-10 border-y border-gray-100 bg-gray-50/50 mb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">
              Trusted by professionals at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {["Google", "Microsoft", "Spotify", "Amazon", "Netflix"].map(
                (company) => (
                  <span
                    key={company}
                    className="text-xl font-bold text-gray-400 hover:text-gray-900 cursor-default"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to consume content faster
            </h2>
            <p className="text-lg text-gray-600">
              Feedbite isn't just a summarizer. It's your personal AI research
              assistant for LinkedIn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ZapIcon className="w-6 h-6 text-amber-500" />}
              title="Instant TL;DR"
              description="Get the gist of any post in seconds. Perfect for skimming through your feed efficiently."
              color="bg-amber-50"
            />
            <FeatureCard
              icon={<LayoutIcon className="w-6 h-6 text-blue-500" />}
              title="Detailed Insights"
              description="Need more? Expand to see key takeaways, action items, and hidden gems within the post."
              color="bg-blue-50"
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-6 h-6 text-green-500" />}
              title="Privacy First"
              description="Your data stays yours. We process content locally or via secure APIs. No data harvesting."
              color="bg-green-50"
            />
          </div>
        </section>

        {/* How it Works */}
        <section
          id="how-it-works"
          className="bg-gray-900 text-white py-24 rounded-[3rem] mx-4 lg:mx-8 mb-24 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How Feedbite Works
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Three simple steps to reclaim your time and sanity on LinkedIn.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <Step
                number="01"
                title="Install Extension"
                description="Add Feedbite to your browser in one click. It automatically detects LinkedIn pages."
              />
              <Step
                number="02"
                title="Browse Feed"
                description="Scroll through your LinkedIn feed as usual. You'll see a subtle 'Summarize' button on posts."
              />
              <Step
                number="03"
                title="Get Insights"
                description="Click to instantly reveal a concise summary. Read what matters, skip the fluff."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-24">
          <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to upgrade your reading experience?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who save time and stay informed
              with Feedbite.
            </p>
            <Button
              size="lg"
              onClick={handleInstallClick}
              className="h-14 px-10 text-lg rounded-full bg-linkedin-blue hover:bg-blue-700 shadow-xl transition-all transform hover:-translate-y-1"
            >
              Get Feedbite for Free
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Free forever • No account required
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-linkedin-blue text-white p-1.5 rounded-lg">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900">Feedbite</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Feedbite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-white border border-gray-100 shadow-subtle hover:shadow-float transition-all duration-300"
  >
    <div
      className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-6`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const Step = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="text-center relative">
    <div className="text-6xl font-bold text-gray-800 mb-6 opacity-30 font-mono">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default Index;
