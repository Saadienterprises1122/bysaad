import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  text: string;
  isBot: boolean;
}

interface ConversationData {
  name?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  details?: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! 👋 I'm here to help you get started. What's your name?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);
  const [conversationData, setConversationData] = useState<ConversationData>({});

  const questions = [
    { key: 'name', question: "Nice to meet you, {name}! What service are you interested in? (Web Development, Graphic Design, or Data Analysis)" },
    { key: 'service', question: "Great choice! What's your estimated budget for this project?" },
    { key: 'budget', question: "Perfect! When do you need this project completed?" },
    { key: 'timeline', question: "Got it! Can you briefly describe your project requirements?" },
    { key: 'details', question: "Thank you! I'm sending all this information to WhatsApp now. Someone will get back to you shortly! 🚀" }
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const currentQuestion = questions[step];
    const updatedData = { ...conversationData, [currentQuestion.key]: inputValue };
    setConversationData(updatedData);

    setInputValue('');

    setTimeout(() => {
      if (step < questions.length - 1) {
        const nextQuestion = questions[step + 1].question.replace('{name}', updatedData.name || 'there');
        setMessages(prev => [...prev, { text: nextQuestion, isBot: true }]);
        setStep(step + 1);
      } else {
        // Send to WhatsApp
        sendToWhatsApp(updatedData);
        setMessages(prev => [...prev, { text: questions[questions.length - 1].question, isBot: true }]);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setMessages([{ text: "Hi! 👋 I'm here to help you get started. What's your name?", isBot: true }]);
          setStep(0);
          setConversationData({});
        }, 3000);
      }
    }, 1000);
  };

  const sendToWhatsApp = (data: ConversationData) => {
    const message = `🔔 New Project Inquiry\n\n👤 Name: ${data.name}\n💼 Service: ${data.service}\n💰 Budget: ${data.budget}\n📅 Timeline: ${data.timeline}\n📝 Details: ${data.details}`;
    const whatsappUrl = `https://wa.me/447393642179?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp with your project details!');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary-600 hover:bg-primary-700 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center text-white transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md bg-dark-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Chat with Us</h3>
                <p className="text-xs text-white/80">We typically reply instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white/5 text-gray-300 rounded-tl-none'
                        : 'bg-primary-600 text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-dark-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-grow bg-dark-800 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
