
import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, File, Search, Send, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachedFiles?: FileItem[];
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  platform: string;
  lastModified: string;
  sharedBy?: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FileItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [contextFiles, setContextFiles] = useState<FileItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample files database
  const allFiles: FileItem[] = [
    { id: '1', name: 'Q1 Financial Report.xlsx', type: 'spreadsheet', size: '2.4 MB', platform: 'Google Drive', lastModified: '2 days ago', sharedBy: 'Alex' },
    { id: '2', name: 'Product Roadmap 2025.docx', type: 'document', size: '1.8 MB', platform: 'Notion', lastModified: '1 week ago', sharedBy: 'Sarah' },
    { id: '3', name: 'Marketing Campaign Assets.zip', type: 'archive', size: '15.7 MB', platform: 'Dropbox', lastModified: '3 days ago', sharedBy: 'Mike' },
    { id: '4', name: 'Team Meeting Notes.md', type: 'document', size: '45 KB', platform: 'Slack', lastModified: 'Yesterday', sharedBy: 'Emma' },
    { id: '5', name: 'Customer Survey Results.pdf', type: 'pdf', size: '3.2 MB', platform: 'Google Drive', lastModified: '5 days ago', sharedBy: 'John' },
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
    
    // Check if message is a search query
    const searchTerms = input.toLowerCase();
    if (searchTerms.includes('search') || searchTerms.includes('find') || searchTerms.includes('look for')) {
      handleFileSearch(searchTerms);
    }
    // Check for file summarization request
    else if (searchTerms.includes('summarize') && contextFiles.length > 0) {
      handleSummarizeFile(searchTerms);
    }
    // Standard response
    else {
      generateStandardResponse(searchTerms);
    }
  };

  const handleFileSearch = (searchTerms: string) => {
    setTimeout(() => {
      // Simple search algorithm
      const results = allFiles.filter(file => {
        const searchText = [file.name, file.type, file.platform, file.sharedBy].join(' ').toLowerCase();
        return searchText.includes(searchTerms.replace('search', '').replace('find', '').replace('look for', '').trim());
      });
      
      if (results.length > 0) {
        const response: Message = {
          id: Date.now().toString(),
          text: `I found ${results.length} file${results.length > 1 ? 's' : ''} matching your search:`,
          sender: 'bot',
          timestamp: new Date(),
          attachedFiles: results
        };
        setMessages(prevMessages => [...prevMessages, response]);
      } else {
        const response: Message = {
          id: Date.now().toString(),
          text: `I couldn't find any files matching your search. Please try different keywords.`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, response]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleSummarizeFile = (searchTerms: string) => {
    setTimeout(() => {
      const fileToSummarize = contextFiles[0]; // Assume first file in context for simplicity
      
      const response: Message = {
        id: Date.now().toString(),
        text: generateFileSummary(fileToSummarize),
        sender: 'bot',
        timestamp: new Date(),
        attachedFiles: [fileToSummarize]
      };
      
      setMessages(prevMessages => [...prevMessages, response]);
      setIsTyping(false);
    }, 2000);
  };

  const generateFileSummary = (file: FileItem): string => {
    // Mock summaries based on file type and name
    if (file.name.includes('Financial Report')) {
      return `Here's a summary of "${file.name}": This report shows Q1 revenue growth of 12%, with expenses increasing 5% YoY. The EBITDA margin improved to 34% from 31% in the previous quarter. Cash reserves stand at $4.2M as of end of quarter.`;
    } else if (file.name.includes('Product Roadmap')) {
      return `Here's a summary of "${file.name}": The roadmap outlines 3 major releases planned for 2025, focusing on AI integration, enterprise security features, and mobile-first experience. Key milestones include beta release in April and full launch in September.`;
    } else if (file.name.includes('Marketing Campaign')) {
      return `Here's a summary of "${file.name}": The campaign assets include designs for social media, email templates, and landing pages. The campaign is scheduled to launch next month targeting enterprise customers in finance and healthcare sectors.`;
    } else if (file.name.includes('Meeting Notes')) {
      return `Here's a summary of "${file.name}": The team discussed project timelines, resource allocation, and client feedback. Action items include updating the progress dashboard, scheduling client demo for next week, and finalizing Q2 roadmap.`;
    } else if (file.name.includes('Customer Survey')) {
      return `Here's a summary of "${file.name}": The survey results from 500+ respondents show 87% satisfaction rate, with user interface and customer support receiving highest ratings. Areas for improvement include documentation clarity and onboarding process.`;
    } else {
      return `Here's a summary of "${file.name}": This ${file.type} file was shared by ${file.sharedBy} on ${file.platform} ${file.lastModified}. It contains important information relevant to your organization.`;
    }
  };

  const generateStandardResponse = (searchTerms: string) => {
    setTimeout(() => {
      let response: Message;
      
      if (searchTerms.includes('financial') || searchTerms.includes('report')) {
        const relevantFile = allFiles.find(file => file.name.toLowerCase().includes('financial'));
        response = {
          id: (Date.now() + 1).toString(),
          text: `I found a financial report in your Google Drive. The most recent one is "${relevantFile?.name}" from ${relevantFile?.lastModified}. Would you like me to summarize its contents or answer specific questions about it?`,
          sender: 'bot',
          timestamp: new Date(),
          attachedFiles: relevantFile ? [relevantFile] : undefined
        };
        
        if (relevantFile && !contextFiles.some(file => file.id === relevantFile.id)) {
          setContextFiles([...contextFiles, relevantFile]);
        }
      } else if (searchTerms.includes('marketing') || searchTerms.includes('campaign')) {
        const relevantFile = allFiles.find(file => file.name.toLowerCase().includes('marketing'));
        response = {
          id: (Date.now() + 1).toString(),
          text: `I see you have marketing campaign assets in your Dropbox. These files were last modified ${relevantFile?.lastModified}. Is there something specific you'd like to know about the campaign?`,
          sender: 'bot',
          timestamp: new Date(),
          attachedFiles: relevantFile ? [relevantFile] : undefined
        };
        
        if (relevantFile && !contextFiles.some(file => file.id === relevantFile.id)) {
          setContextFiles([...contextFiles, relevantFile]);
        }
      } else if (searchTerms.includes('meeting') || searchTerms.includes('notes')) {
        const relevantFile = allFiles.find(file => file.name.toLowerCase().includes('meeting'));
        response = {
          id: (Date.now() + 1).toString(),
          text: `I found team meeting notes from yesterday in your Slack workspace. The main topics discussed were Q2 goals, project timelines, and resource allocation. Would you like more details on any of these topics?`,
          sender: 'bot',
          timestamp: new Date(),
          attachedFiles: relevantFile ? [relevantFile] : undefined
        };
        
        if (relevantFile && !contextFiles.some(file => file.id === relevantFile.id)) {
          setContextFiles([...contextFiles, relevantFile]);
        }
      } else if (searchTerms.includes('customer') || searchTerms.includes('survey')) {
        const relevantFile = allFiles.find(file => file.name.toLowerCase().includes('customer'));
        response = {
          id: (Date.now() + 1).toString(),
          text: `I found the Customer Survey Results PDF shared by John 5 days ago. It contains feedback from over 500 customers. Would you like me to summarize the key findings?`,
          sender: 'bot',
          timestamp: new Date(),
          attachedFiles: relevantFile ? [relevantFile] : undefined
        };
        
        if (relevantFile && !contextFiles.some(file => file.id === relevantFile.id)) {
          setContextFiles([...contextFiles, relevantFile]);
        }
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          text: `I'm analyzing your organization's files to find relevant information. How else can I assist you with your enterprise data?`,
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

  const handleAddToContext = (file: FileItem) => {
    if (!contextFiles.some(f => f.id === file.id)) {
      setContextFiles([...contextFiles, file]);
      toast({
        title: "File added to context",
        description: `"${file.name}" has been added to the current conversation context.`,
      });
    }
  };

  const handleRemoveFromContext = (fileId: string) => {
    setContextFiles(contextFiles.filter(file => file.id !== fileId));
    toast({
      title: "File removed from context",
      description: "File has been removed from the current conversation context.",
    });
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
                  <div key={message.id}>
                    <div
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
                    
                    {message.attachedFiles && message.attachedFiles.length > 0 && (
                      <div className="ml-10 mt-2 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Attached files:</p>
                        {message.attachedFiles.map((file) => (
                          <div key={file.id} className="flex items-center gap-2 border rounded-md p-2 bg-background w-fit">
                            {getFileIcon(file.type)}
                            <div className="text-sm">
                              <p className="font-medium">{file.name}</p>
                              <div className="flex text-xs text-muted-foreground gap-2">
                                <span>{file.platform}</span>
                                <span>•</span>
                                <span>{file.sharedBy ? `Shared by ${file.sharedBy}` : ''}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
                  placeholder="Ask about files or try 'search financial report' or 'find customer survey'..."
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
          <Tabs defaultValue="context">
            <TabsList className="w-full">
              <TabsTrigger value="context" className="flex-1">Current Context</TabsTrigger>
              <TabsTrigger value="files" className="flex-1">Files</TabsTrigger>
              <TabsTrigger value="search" className="flex-1">Search</TabsTrigger>
            </TabsList>
            
            <TabsContent value="context" className="mt-4">
              {contextFiles.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-3 pr-4">
                    {contextFiles.map((file) => (
                      <div key={file.id} className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex items-center justify-between">
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveFromContext(file.id)}
                            className="h-6 w-6 rounded-full p-0"
                          >
                            <FileText className="h-3 w-3 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-4">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No files in current context</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Search for files or mention them in your conversation to add them here
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="files" className="mt-4 h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="space-y-3">
                {allFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="border rounded-lg p-3 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleAddToContext(file)}
                  >
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
                <Input 
                  placeholder="Search files and messages..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length > 2) {
                      setIsSearching(true);
                      // Simple search algorithm
                      const results = allFiles.filter(file => {
                        const searchText = [file.name, file.type, file.platform, file.sharedBy].join(' ').toLowerCase();
                        return searchText.includes(e.target.value.toLowerCase());
                      });
                      setSearchResults(results);
                      setIsSearching(false);
                    } else {
                      setSearchResults([]);
                    }
                  }}
                />
              </div>
              
              {searchQuery.length > 2 ? (
                <div className="mt-4 space-y-3">
                  {isSearching ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((file) => (
                      <div 
                        key={file.id} 
                        className="border rounded-lg p-3 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => {
                          handleAddToContext(file);
                          setInput(`Tell me about the ${file.name} file`);
                        }}
                      >
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
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No results found</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 text-center text-muted-foreground text-sm">
                  <p>Enter at least 3 characters to search</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
