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
  StarIcon,
  CheckCircleIcon,
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
          <div className="flex items-center gap-2">
            <div className="bg-linkedin-blue text-white p-1.5 rounded-lg">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Feedbite
            </span>
          </div>

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
            <a
              href="#reviews"
              className="text-sm font-medium text-gray-600 hover:text-linkedin-blue transition-colors"
            >
              Reviews
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
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Master Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-linkedin-blue to-blue-600">
                  LinkedIn Feed
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop scrolling through walls of text. Get instant, AI-powered
                summaries of LinkedIn posts with a single click. Save hours
                every week.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Button
                  size="lg"
                  onClick={handleInstallClick}
                  className="h-14 px-8 text-lg rounded-full bg-linkedin-blue hover:bg-blue-700 shadow-glow hover:shadow-lg transition-all w-full sm:w-auto"
                >
                  <ChromeIcon className="mr-2 w-5 h-5" />
                  Add to Chrome - It's Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full border-gray-200 hover:bg-gray-50 text-gray-700 w-full sm:w-auto"
                >
                  View Demo
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>5-star rating</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[2rem] blur-2xl opacity-50 -z-10"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2 z-10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-white border border-gray-200 rounded-md py-1 px-3 text-xs text-gray-500 inline-flex items-center gap-1.5 mx-auto w-64 justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      linkedin.com/feed
                    </div>
                  </div>
                </div>
                <div className="pt-12 bg-gray-50/50">
                  <ExtensionDemo />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-float border border-gray-100 flex items-center gap-3 z-20"
              >
                <div className="bg-green-100 p-2 rounded-lg">
                  <ZapIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Time Saved
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    2.5 hrs/week
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
            <div className="bg-gray-100 p-1.5 rounded-lg">
              <FileTextIcon className="w-5 h-5 text-gray-900" />
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
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <a
              href="mailto:support@feedbite.app"
              className="hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
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
