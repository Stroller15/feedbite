
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon, BookOpenIcon, ExternalLinkIcon, ArrowRightIcon } from 'lucide-react';
import ExtensionDemo from '@/components/ExtensionDemo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeSection, setActiveSection] = useState('demo');

  const handleInstallClick = () => {
    // In production, this would be the Chrome Web Store URL
    // For now, we'll use a direct download link to the extension ZIP
    const extensionUrl = '/linkedin-summarizer-extension.zip';
    window.open(extensionUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="relative z-10 px-6 lg:px-8 pt-6 pb-4 border-b border-blue-100/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5 text-linkedin-blue" />
            <h1 className="text-xl font-medium text-gray-900">LinkedIn Summarizer</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveSection('demo')}
              className={`text-sm font-medium transition-colors ${activeSection === 'demo' ? 'text-linkedin-blue' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Demo
            </button>
            <button 
              onClick={() => setActiveSection('features')}
              className={`text-sm font-medium transition-colors ${activeSection === 'features' ? 'text-linkedin-blue' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Features
            </button>
            <button 
              onClick={() => setActiveSection('about')}
              className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-linkedin-blue' : 'text-gray-600 hover:text-gray-900'}`}
            >
              About
            </button>
          </nav>
          <div>
            <Button 
              variant="outline" 
              className="text-sm font-medium border-blue-200 text-linkedin-blue hover:bg-blue-50 transition-colors"
              onClick={handleInstallClick}
            >
              Install Extension
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-0">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                Chrome Extension
              </Badge>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4"
              >
                Summarize LinkedIn Posts
                <br />
                <span className="text-linkedin-blue">In a Single Click</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-xl mx-auto text-lg text-gray-600"
              >
                Get the key insights from any LinkedIn post without the fluff. 
                Save time and focus on what matters most.
              </motion.p>
            </div>

            <div className="mt-16">
              {activeSection === 'demo' && <ExtensionDemo />}
              
              {activeSection === 'features' && (
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <FeatureCard 
                    icon={<FileTextIcon className="w-6 h-6 text-linkedin-blue" />}
                    title="TLDR Summary"
                    description="Get a quick one-line TLDR for any post on your LinkedIn feed."
                  />
                  <FeatureCard 
                    icon={<BookOpenIcon className="w-6 h-6 text-linkedin-blue" />}
                    title="Detailed Summary"
                    description="Receive a comprehensive summary highlighting the key points."
                  />
                  <FeatureCard 
                    icon={<ArrowRightIcon className="w-6 h-6 text-linkedin-blue" />}
                    title="One-Click Access"
                    description="Elegant, unobtrusive button appears next to every post."
                  />
                </div>
              )}
              
              {activeSection === 'about' && (
                <div className="max-w-3xl mx-auto prose prose-blue">
                  <h3>About LinkedIn Summarizer</h3>
                  <p>
                    LinkedIn Summarizer is a Chrome extension designed to help professionals save time while browsing their feed. 
                    Our mission is to help you extract value from LinkedIn content without getting lost in lengthy posts.
                  </p>
                  <p>
                    Built with a focus on elegant design and seamless user experience, the extension integrates naturally with 
                    LinkedIn's interface to provide summaries exactly when and where you need them.
                  </p>
                  <p>
                    We're constantly improving our summarization algorithms to provide the most accurate and helpful summaries possible.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-blue-100/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FileTextIcon className="w-5 h-5 text-linkedin-blue" />
            <span className="text-sm font-medium text-gray-600">LinkedIn Summarizer</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} LinkedIn Summarizer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="p-6 flex flex-col items-center text-center h-full bg-white/70 backdrop-blur-xs border border-blue-50 shadow-subtle hover:shadow-float transition-shadow">
    <div className="rounded-full bg-blue-50 p-3 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

export default Index;
