
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileTextIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ExtensionDemo = () => {
  const [activeSummary, setActiveSummary] = useState<number | null>(null);
  const [summaryAnimation, setSummaryAnimation] = useState<'show' | 'hide' | null>(null);

  const toggleSummary = (postId: number) => {
    if (activeSummary === postId) {
      setSummaryAnimation('hide');
      setTimeout(() => {
        setActiveSummary(null);
        setSummaryAnimation(null);
      }, 300); // Match animation duration
    } else {
      setActiveSummary(postId);
      setSummaryAnimation('show');
    }
  };

  // Demo LinkedIn posts with different types of content
  const posts = [
    {
      id: 1,
      author: {
        name: 'Alex Johnson',
        role: 'Product Manager at TechCorp',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      content: `I've been seeing a lot of discussion about productivity tools lately, and I wanted to share my experience. After trying dozens of apps and methods over the years, I've found that the best productivity system is the one you'll actually use consistently. The fanciest app with all the features won't help if it's too complicated for daily use. I've settled on a simple note-taking app combined with calendar blocking. It might not be the most sophisticated approach, but it works reliably for me and has helped me manage multiple projects simultaneously. What productivity systems work best for you? I'd love to hear your thoughts and recommendations in the comments below!`,
      summary: {
        tldr: "The best productivity system is the one you'll actually use consistently, regardless of features.",
        details: "After trying many productivity tools, the author has found that simplicity and consistency are more important than advanced features. They currently use a basic note-taking app with calendar blocking, which has proven effective for managing multiple projects. They're asking for others to share their own productivity systems."
      },
      time: '2 hours ago',
      likes: 248,
      comments: 57
    },
    {
      id: 2,
      author: {
        name: 'Maya Patel',
        role: 'Software Engineer at InnovateTech',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      content: `Just finished a major refactoring project that reduced our codebase by 30% while improving performance by 25%! The key insights from this project: 1) Technical debt compounds faster than you think. What started as a few shortcuts for a deadline turned into months of maintenance headaches. 2) Getting buy-in from leadership is crucial - we had to clearly demonstrate how this investment would improve both developer productivity and user experience. 3) Test coverage was our safety net - we couldn't have been confident in our changes without comprehensive tests. 4) Incremental changes with frequent deployments made this manageable. 5) Documentation is just as important as the code itself. Has anyone else tackled a major refactoring recently? Any lessons learned?`,
      summary: {
        tldr: "Completed a major code refactoring that reduced codebase size by 30% while improving performance by 25%.",
        details: "The project revealed several key insights: technical debt compounds quickly, leadership buy-in is essential, good test coverage provides confidence during refactoring, incremental changes with frequent deployments help manage complexity, and documentation is critically important. The author is asking for others to share their refactoring experiences."
      },
      time: '4 hours ago',
      likes: 412,
      comments: 93
    }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-float overflow-hidden">
      <div className="h-12 bg-linkedin-blue flex items-center px-4">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="flex-1 text-center">
          <span className="text-xs text-white font-medium">linkedin.com</span>
        </div>
      </div>
      
      <div className="bg-linkedin-light p-4 max-h-[600px] overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="mb-6 bg-white rounded-lg shadow-subtle p-4 relative">
            <div className="flex items-start mb-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.author.role}</p>
                <p className="text-xs text-gray-400 mt-1">{post.time}</p>
              </div>
              
              {/* Summarize button - appears next to every post */}
              <motion.div 
                className="absolute right-4 top-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs font-medium text-gray-500 hover:text-linkedin-blue hover:bg-blue-50 transition-colors flex items-center gap-1"
                  onClick={() => toggleSummary(post.id)}
                >
                  <FileTextIcon className="h-3.5 w-3.5" />
                  Summarize
                </Button>
              </motion.div>
            </div>
            
            <div className="text-gray-700 text-sm mb-3">
              <p>{post.content}</p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{post.likes} Likes</span>
              <span>{post.comments} Comments</span>
            </div>
            
            {/* Summary panel that appears when summarize is clicked */}
            <AnimatePresence>
              {activeSummary === post.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`summary-panel absolute right-4 top-14 w-[calc(100%-2rem)] md:max-w-sm z-10 ${summaryAnimation}`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-1 mr-2">
                          <FileTextIcon className="h-4 w-4 text-linkedin-blue" />
                        </div>
                        <h4 className="font-medium text-gray-900">Post Summary</h4>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => toggleSummary(post.id)}
                      >
                        <XIcon className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="summary-tag bg-blue-100 text-blue-800 mb-2">TLDR</div>
                        <p className="text-sm font-medium text-gray-800">{post.summary.tldr}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="summary-tag bg-gray-100 text-gray-800 mb-2">Summary</div>
                        <p className="text-sm text-gray-600">{post.summary.details}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionDemo;
