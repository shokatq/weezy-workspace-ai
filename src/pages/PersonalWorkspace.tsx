
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import WorkspaceFileList from '@/components/workspace/WorkspaceFileList';
import WorkspaceChat from '@/components/workspace/WorkspaceChat';
import { FileText, MessageSquare, Search, Upload, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PersonalWorkspace = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceName, setWorkspaceName] = useState('Acme Corporation');
  
  // Mock data for workspace files
  const localFiles = [
    { id: 1, name: 'Project Roadmap.docx', type: 'document', size: '245 KB', lastModified: '2 hours ago', source: 'Local' },
    { id: 2, name: 'Budget Forecast 2025.xlsx', type: 'spreadsheet', size: '1.2 MB', lastModified: '1 day ago', source: 'Local' },
    { id: 3, name: 'Team Meeting Notes.md', type: 'document', size: '32 KB', lastModified: '3 days ago', source: 'Local' },
  ];
  
  const cloudFiles = [
    { id: 4, name: 'Marketing Strategy.pdf', type: 'pdf', size: '3.7 MB', lastModified: '5 hours ago', source: 'Google Drive' },
    { id: 5, name: 'Sales Presentation.pptx', type: 'presentation', size: '5.1 MB', lastModified: '1 week ago', source: 'Dropbox' },
    { id: 6, name: 'Customer Survey Results.csv', type: 'data', size: '852 KB', lastModified: '2 days ago', source: 'OneDrive' },
  ];

  const handleFileUpload = () => {
    toast({
      title: "Upload Feature",
      description: "File upload functionality would be integrated here",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Feature",
      description: "File download functionality would be integrated here",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Weezy – {workspaceName} Workspace</h1>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar with file navigation and tools */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Tools</CardTitle>
                <CardDescription>Manage your files and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files and content..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={handleFileUpload}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Files
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Storage: 3.5GB / 10GB used
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Main workspace area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="files">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="files">
                  <FileText className="mr-2 h-4 w-4" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="assistant">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>
              <TabsContent value="files" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Local Files</CardTitle>
                    <CardDescription>Files stored on your device</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkspaceFileList files={localFiles} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cloud Files</CardTitle>
                    <CardDescription>Files from connected services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkspaceFileList files={cloudFiles} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="assistant">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle>Workspace AI Assistant</CardTitle>
                    <CardDescription>Ask questions about your files and data</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden">
                    <WorkspaceChat />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalWorkspace;
