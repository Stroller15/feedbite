import React from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon, ArrowLeftIcon, ShieldCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-linkedin-blue text-white p-1.5 rounded-lg">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">Feedbite</span>
          </Link>

          <Link to="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="bg-blue-50 p-3 rounded-xl">
              <ShieldCheckIcon className="w-8 h-8 text-linkedin-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 mt-1">Last updated: January 4, 2026</p>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
            <p className="text-linkedin-blue font-semibold mb-2">Summary</p>
            <p className="text-gray-700">
              We do not collect, store, or transmit any of your personal data to our servers. 
              All data stays locally on your device.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10 text-gray-600 leading-relaxed">
            <Section title="Information We Collect">
              <p>
                The Extension does <strong className="text-gray-900">not</strong> collect any personal information. 
                We do not have servers, databases, or any infrastructure to collect or store user data.
              </p>
            </Section>

            <Section title="Information Stored Locally">
              <p className="mb-4">
                The Extension stores the following data locally on your device using Chrome's built-in storage API:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-gray-900">API Keys:</strong> Your API keys for AI services (Groq, OpenAI, or Google Gemini) 
                  that you voluntarily provide. These are stored locally to authenticate requests to your chosen AI provider.
                </li>
                <li>
                  <strong className="text-gray-900">Preferences:</strong> Your selected AI provider and custom model settings.
                </li>
              </ul>
              <p className="mt-4">
                This data never leaves your device except when making API calls to the AI provider you have selected and configured.
              </p>
            </Section>

            <Section title="How Your Data Is Used">
              <p className="mb-4">Your locally stored API keys are used solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Authenticate requests to your chosen AI service provider (Groq, OpenAI, or Google Gemini)</li>
                <li>Generate summaries of LinkedIn posts when you click the "Summarize" button</li>
              </ul>
            </Section>

            <Section title="Third-Party Services">
              <p className="mb-4">
                When you use the Extension to summarize a post, the text content of that LinkedIn post is sent to your selected AI provider:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-gray-900">Groq:</strong>{' '}
                  <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-linkedin-blue hover:underline">
                    Groq Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-gray-900">OpenAI:</strong>{' '}
                  <a href="https://openai.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-linkedin-blue hover:underline">
                    OpenAI Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-gray-900">Google Gemini:</strong>{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-linkedin-blue hover:underline">
                    Google Privacy Policy
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                We recommend reviewing the privacy policies of these services to understand how they handle data.
              </p>
            </Section>

            <Section title="Data Sharing">
              <p>
                We do <strong className="text-gray-900">not</strong> sell, trade, or transfer your information to third parties. 
                The only data transmission occurs directly between your browser and your selected AI provider.
              </p>
            </Section>

            <Section title="Data Security">
              <p>
                Your API keys and preferences are stored using Chrome's secure local storage API. 
                This data is isolated to your browser profile and is not accessible to other extensions or websites.
              </p>
            </Section>

            <Section title="Data Retention & Deletion">
              <p className="mb-4">
                All data is stored locally on your device. You can delete your stored data at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clicking the "Remove" button next to your API key in the Extension popup</li>
                <li>Uninstalling the Extension (this removes all stored data)</li>
                <li>Clearing your browser's extension data through Chrome settings</li>
              </ul>
            </Section>

            <Section title="Children's Privacy">
              <p>
                The Extension is not intended for use by children under the age of 13. 
                We do not knowingly collect any information from children.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page 
                with an updated "Last updated" date.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please contact us by creating an issue 
                on our GitHub repository or reaching out through the Chrome Web Store listing.
              </p>
            </Section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Feedbite. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    {children}
  </section>
);

export default Privacy;

