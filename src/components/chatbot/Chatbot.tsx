import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, FileText, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '../assessment/AssessmentForm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Message = {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}


const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<FormData | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  
  useEffect(() => {
    const storedData = localStorage.getItem('assessmentData');
    if (storedData) {
      setAssessmentData(JSON.parse(storedData));
    }
    
    const initialMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: 'Hello! I\'m your Gentle Birth Assistant. How can I help you today?',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const context = assessmentData ? `
        Context:Act as a compassionate and supportive companion for pregnant women and mothers who may be experiencing challenges related to health, emotional well-being, or physical conditions.

        When conversing, always prioritize empathy, patience, and warmth.

        Adapt your tone to the emotional needs of the user: offer encouragement, active listening, and thoughtful responses.

        Use the context and parameters provided by the user to personalize your support, acknowledging their feelings and offering gentle advice or reassurance when appropriate.

        Avoid judgment, minimize giving unsolicited advice, and focus on creating a safe, comforting environment where the user feels heard, respected, and cared for.

        Make sure the generated response does not exceed 3-4 sentences maximum.

        Try to diversify your answers and intro/opening responses and try to be as personal possible

        Patient Profile:
        - Age: ${assessmentData.age}
        - Pregnancy Status: ${assessmentData.isPregnant ? 'Pregnant (Week ' + assessmentData.pregnancyWeek + ')' : 'Not Pregnant'}
        - Conditions: ${assessmentData.conditions.join(', ') || 'None'}
        - Medications: ${assessmentData.medications.join(', ') || 'None'}
      ` : 'No patient assessment data available';
      
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: `Context: ${context}\n\nPatient Question: ${input}\n\nPlease provide a helpful response in English.`
          }]
        }],
      });
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: result.response.text(),
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to get AI response");
      console.error('Gemini error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateAndDownloadPDF = async () => {
    if (!assessmentData) {
      toast.error("Please complete the health assessment first");
      return;
    }
    
    setGeneratingReport(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      // Generate report content
      const prompt = `
        Generate a comprehensive pregnancy health report in English based on:
        
        1. Patient Assessment:
           - Age: ${assessmentData.age}
           - Pregnancy Week: ${assessmentData.pregnancyWeek}
           - Medical Conditions: ${assessmentData.conditions.join(', ') || 'None'}
           - Current Medications: ${assessmentData.medications.join(', ') || 'None'}
        
        2. Conversation History for context:
           ${messages.map(m => `${m.type}: ${m.content}`).join('\n')}
        
        Format:
        - Executive Brief Summary (2-3 sentences)
        - Key Health Considerations
        - Medication Safety Analysis
        - Recommended Next Steps
        - Important Warnings (if any)
        
        Return ONLY the report content in clear paragraphs, no JSON or special formatting.
      `;
      
      const result = await model.generateContent(prompt);
      const reportContent = result.response.text();
      
      // Create PDF
      const doc = new jsPDF();
      
      // Header with blue accent
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, 210, 20, 'F');
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text('Pregnancy Health Report', 105, 15, { align: 'center' });
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Patient Information
      autoTable(doc, {
        head: [['Patient Information']],
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: 'bold'
        },
        body: [
          [`Age: ${assessmentData.age || 'N/A'}`],
          [`Pregnancy Week: ${assessmentData.pregnancyWeek || 'N/A'}`],
          [`Conditions: ${assessmentData.conditions.join(', ') || 'None'}`],
          [`Medications: ${assessmentData.medications.join(', ') || 'None'}`]
        ],
        startY: 30,
        theme: 'grid',
        styles: { 
          cellPadding: 6,
          fontSize: 12,
          textColor: [31, 41, 55]
        }
      });
      
      // Medical Report Content
      const lines = doc.splitTextToSize(reportContent, 180);
      doc.setFontSize(11);
      doc.text(lines, 15, (doc as any).lastAutoTable.finalY + 20);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      // doc.text('Generated by Pregnancy Health Assistant - Confidential Medical Document', 105, 285, { align: 'center' });
      
      // Save PDF
      doc.save('pregnancy-health-report.pdf');
      
      toast.success("PDF report downloaded successfully");
    } catch (error) {
      toast.error("Failed to generate report");
      console.error('Report generation error:', error);
    } finally {
      setGeneratingReport(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  

  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const generateReport = () => {
    if (!assessmentData) {
      toast.error("Please complete the health assessment first");
      return;
    }
    
  };
  
  const hasCompletedAssessment = !!assessmentData;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const characterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-14rem)] flex flex-col mx-auto max-w-4xl w-full border border-gray-200">
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">AI Chatbot</h2>
            <p className="text-xs text-gray-600">Providing pregnancy guidance and support</p>
          </div>
        </div>
        
        <button
          onClick={generateAndDownloadPDF}
          className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
            hasCompletedAssessment 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!hasCompletedAssessment || generatingReport}
        >
          <FileText className="w-4 h-4 mr-1" />
          {generatingReport ? 'Generating PDF...' : 'Download Report'}
        </button>

        
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message p-2 rounded-lg ${
                  message.type === 'user'
                    ? 'chat-message-user bg-blue-500 text-white'
                    : 'chat-message-bot bg-blue-100 border border-gray-200 text-gray-900'
                }`}
              >
                {message.type === 'bot' ? (
                  <motion.div
                    className="text-sm whitespace-pre-wrap"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {message.content.split('').map((char, index) => (
                      <motion.span
                        key={`${message.id}-${index}`}
                        variants={characterVariants}
                        className={char === ' ' ? 'inline-block w-[0.25em]' : 'inline-block'}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-sm">{message.content}</div>
                )}
                <div
                  className={`text-xs mt-1 text-right ${
                    message.type === 'user' ? 'text-white' : 'text-black'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="chat-message">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {!hasCompletedAssessment && (
          <div className="mt-3 text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
            ⚠️ Complete the health assessment for personalized advice and to unlock report generation.
          </div>
        )}
      </div>
      
      


    </div>
  );
};

export default Chatbot;