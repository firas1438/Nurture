
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, FileText, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { FormData } from '../assessment/AssessmentForm';

type Message = {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

const mockMessages = [
  "I'll help you understand the changes in your body during pregnancy.",
  "Here's some information about managing morning sickness in the first trimester.",
  "Based on your medical history, I recommend consulting with your doctor about these symptoms.",
  "According to research, gentle exercise like walking can be beneficial throughout pregnancy.",
  "I've generated a personalized report based on your assessment data."
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<FormData | null>(null);
  const [showReport, setShowReport] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Load assessment data from localStorage
    const storedData = localStorage.getItem('assessmentData');
    if (storedData) {
      setAssessmentData(JSON.parse(storedData));
    }
    
    // Initial greeting message
    const initialMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: 'Hello! I\'m your Gentle Birth Assistant. How can I help you today?',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const generateReport = () => {
    if (!assessmentData) {
      toast.error("Please complete the health assessment first");
      return;
    }
    
    setShowReport(true);
  };
  
  const hasCompletedAssessment = !!assessmentData;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-14rem)] flex flex-col mx-auto max-w-4xl w-full border border-beige-100">
      <div className="bg-beige-50 p-4 border-b border-beige-100 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-beige-200 flex items-center justify-center mr-3">
            <MessageCircle className="w-5 h-5 text-beige-700" />
          </div>
          <div>
            <h2 className="font-semibold text-beige-800">AI Health Assistant</h2>
            <p className="text-xs text-beige-600">Providing pregnancy guidance and support</p>
          </div>
        </div>
        
        <button
          onClick={generateReport}
          className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
            hasCompletedAssessment 
              ? 'bg-beige-500 text-white hover:bg-beige-600' 
              : 'bg-beige-100 text-beige-400 cursor-not-allowed'
          }`}
          disabled={!hasCompletedAssessment}
        >
          <FileText className="w-4 h-4 mr-1" />
          <span>Generate Report</span>
        </button>
      </div>


      
      <div className="flex-1 overflow-y-auto p-4 bg-beige-50/30">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`chat-message ${message.type === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}
            >
              <div className="text-sm">
                {message.content}
              </div>
              <div className="text-xs text-beige-500 mt-1 text-right">
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="chat-message chat-message-bot">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-beige-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-beige-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-beige-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-beige-100 bg-white">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-beige-200 rounded-l-lg focus:ring-2 focus:ring-beige-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-beige-500 text-white rounded-r-lg hover:bg-beige-600 flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {!hasCompletedAssessment && (
          <div className="mt-3 text-sm text-beige-600 bg-beige-50 p-3 rounded-lg">
            ⚠️ Complete the health assessment for personalized advice and to unlock report generation.
          </div>
        )}
      </div>
      
      {showReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-center p-4 border-b border-beige-100">
              <h2 className="font-semibold text-xl text-beige-800">Your Personalized Health Report</h2>
              <button 
                onClick={() => setShowReport(false)}
                className="text-beige-500 hover:text-beige-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-beige-800 mb-2">Basic Information</h3>
                <div className="bg-beige-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <span className="text-beige-600">Age:</span>
                      <span className="text-beige-800 ml-2">{assessmentData?.age} years</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-beige-600">Pregnancy Status:</span>
                      <span className="text-beige-800 ml-2">{assessmentData?.isPregnant ? 'Pregnant' : 'Not Pregnant'}</span>
                    </div>
                    {assessmentData?.isPregnant && (
                      <div className="text-sm">
                        <span className="text-beige-600">Current Week:</span>
                        <span className="text-beige-800 ml-2">{assessmentData?.pregnancyWeek}</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-beige-600">Taking Medications:</span>
                      <span className="text-beige-800 ml-2">{assessmentData?.takingMedications ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {assessmentData?.hasPreExistingConditions && assessmentData.conditions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-beige-800 mb-2">Pre-existing Conditions</h3>
                  <div className="bg-beige-50 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {assessmentData.conditions.map((condition, index) => (
                        <span key={index} className="bg-beige-100 px-3 py-1 rounded-full text-sm text-beige-800">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {assessmentData?.takingMedications && assessmentData.medications.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-beige-800 mb-2">Current Medications</h3>
                  <div className="bg-beige-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {assessmentData.medications.map((med, index) => (
                        <li key={index} className="text-sm text-beige-800">• {med}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-semibold text-beige-800 mb-2">Recommendations</h3>
                <div className="bg-beige-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <p className="text-sm text-beige-800">
                      {assessmentData?.isPregnant 
                        ? `Based on your pregnancy status (Week ${assessmentData.pregnancyWeek}), we recommend regular check-ups with your healthcare provider.`
                        : "Based on your health profile, we recommend focusing on general wellness and preventive care."}
                    </p>
                    
                    {assessmentData?.isPregnant && (
                      <div className="text-sm text-beige-800">
                        <p className="font-medium mb-1">For your current stage:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Stay hydrated and maintain a balanced diet rich in essential nutrients</li>
                          <li>Engage in gentle exercise appropriate for your trimester</li>
                          <li>Monitor any unusual symptoms and report them to your doctor</li>
                          <li>Consider joining a prenatal support group</li>
                        </ul>
                      </div>
                    )}
                    
                    {assessmentData?.takingMedications && (
                      <p className="text-sm text-beige-800">
                        Please consult with your healthcare provider about the safety of your current medications{assessmentData.isPregnant ? ' during pregnancy' : ''}.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-beige-50 rounded-lg text-beige-600 text-sm">
                <p className="font-medium text-beige-700 mb-1">Important Disclaimer</p>
                <p>This report is generated for informational purposes only and is not a substitute for professional medical advice. Always consult with your healthcare provider for medical guidance.</p>
                <div className="flex justify-center mt-4">
                  <button
                    className="flex items-center px-10 py-1.5 rounded-lg text-sm bg-beige-500 text-white hover:bg-beige-600"
                  >
                    <span>Download PDF</span>
                  </button>  
                </div>           
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
