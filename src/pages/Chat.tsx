
import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, File, Search, Send, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  platform: string;
  lastModified: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Weezy, your enterprise AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample files
  const files: File[] = [
    { id: '1', name: 'Q1 Financial Report.xlsx', type: 'spreadsheet', size: '2.4 MB', platform: 'Google Drive', lastModified: '2 days ago' },
    { id: '2', name: 'Product Roadmap 2025.docx', type: 'document', size: '1.8 MB', platform: 'Notion', lastModified: '1 week ago' },
    { id: '3', name: 'Marketing Campaign Assets.zip', type: 'archive', size: '15.7 MB', platform: 'Dropbox', lastModified: '3 days ago' },
    { id: '4', name: 'Team Meeting Notes.md', type: 'document', size: '45 KB', platform: 'Slack', lastModified: 'Yesterday' },
    { id: '5', name: 'Customer Survey Results.pdf', type: 'pdf', size: '3.2 MB', platform: 'Google Drive', lastModified: '5 days ago' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response: Message;
      
      if (input.toLowerCase().includes('financial') || input.toLowerCase().includes('report')) {
        response = {
          id: (Date.now() + 1).toString(),
          text: 'I found several financial reports in your Google Drive. The most recent one is "Q1 Financial Report.xlsx" from 2 days ago. Would you like me to summarize its contents or answer specific questions about it?',
          sender: 'bot',
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes('marketing') || input.toLowerCase().includes('campaign')) {
        response = {
          id: (Date.now() + 1).toString(),
          text: 'I see you have marketing campaign assets in your Dropbox. These files were last modified 3 days ago. Is there something specific you\'d like to know about the campaign?',
          sender: 'bot',
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes('meeting') || input.toLowerCase().includes('notes')) {
        response = {
          id: (Date.now() + 1).toString(),
          text: 'I found team meeting notes from yesterday in your Slack workspace. The main topics discussed were Q2 goals, project timelines, and resource allocation. Would you like more details on any of these topics?',
          sender: 'bot',
          timestamp: new Date()
        };
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          text: 'I\'m analyzing your organization\'s files to find relevant information. How else can I assist you with your enterprise data?',
          sender: 'bot',
          timestamp: new Date()
        };
      }
      
      setMessages(prevMessages => [...prevMessages, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'spreadsheet':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'archive':
        return <FileText className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden">
        <div className="flex flex-col w-3/4 pr-6">
          <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
          <Card className="flex-1 overflow-hidden flex flex-col">
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="mr-2 mt-1 h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-weezy-blue text-white">W</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={
                        message.sender === 'user'
                          ? 'chat-message-user'
                          : 'chat-message-bot'
                      }
                    >
                      <p>{message.text}</p>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="ml-2 mt-1 h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <Avatar className="mr-2 mt-1 h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-weezy-blue text-white">W</AvatarFallback>
                    </Avatar>
                    <div className="chat-message-bot flex items-center">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Ask about your organization's files and conversations..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-4">Knowledge Base</h2>
          <Tabs defaultValue="files">
            <TabsList className="w-full">
              <TabsTrigger value="files" className="flex-1">Files</TabsTrigger>
              <TabsTrigger value="search" className="flex-1">Search</TabsTrigger>
            </TabsList>
            <TabsContent value="files" className="mt-4 h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="border rounded-lg p-3 hover:bg-muted cursor-pointer transition-colors">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{file.platform}</span>
                          <span>{file.lastModified}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="search" className="mt-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search files and messages..." className="pl-8" />
              </div>
              <div className="mt-4 text-center text-muted-foreground text-sm">
                <p>Enter a search term to find specific files or messages</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
