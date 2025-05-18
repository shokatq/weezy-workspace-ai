import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Send } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachedFiles?: {
    name: string;
    type: string;
  }[];
}

const WorkspaceChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your workspace assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessageId = Date.now();
    const userMessage: Message = {
      id: userMessageId,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      
      if (inputMessage.toLowerCase().includes('marketing strategy') || 
          inputMessage.toLowerCase().includes('pdf')) {
        aiResponse = {
          id: userMessageId + 1,
          content: "I found the Marketing Strategy document you're looking for. Here's a summary: This document outlines our marketing goals for 2025, including increasing social media presence by 30% and launching two new product lines.",
          sender: 'assistant',
          timestamp: new Date(),
          attachedFiles: [
            { name: 'Marketing Strategy.pdf', type: 'pdf' }
          ]
        };
      } else if (inputMessage.toLowerCase().includes('budget') || 
                inputMessage.toLowerCase().includes('forecast')) {
        aiResponse = {
          id: userMessageId + 1,
          content: "Here's the Budget Forecast for 2025 you requested. The document shows a projected 15% increase in revenue and plans for expansion into two new markets.",
          sender: 'assistant',
          timestamp: new Date(),
          attachedFiles: [
            { name: 'Budget Forecast 2025.xlsx', type: 'spreadsheet' }
          ]
        };
      } else {
        aiResponse = {
          id: userMessageId + 1,
          content: "I'll help you with that. Would you like me to search for specific files or information in your workspace?",
          sender: 'assistant',
          timestamp: new Date(),
        };
      }
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'assistant' && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
              
              {message.attachedFiles && message.attachedFiles.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border/30 space-y-1">
                  <div className="text-xs font-medium mb-1">Attached Files:</div>
                  {message.attachedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-background/20 rounded p-1.5 text-xs">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your files or workspace..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceChat;
