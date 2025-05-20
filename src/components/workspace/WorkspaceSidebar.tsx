
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Settings, Upload, Download, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import WorkspaceFileList from './WorkspaceFileList';

interface WorkspaceSidebarProps {
  recentFiles: {
    id: number;
    name: string;
    type: string;
    size: string;
    lastModified: string;
    source: string;
  }[];
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ recentFiles }) => {
  const { toast } = useToast();
  
  const handleFileUpload = () => {
    toast({
      title: "Upload initiated",
      description: "Select files to upload to your workspace",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your file is being downloaded",
    });
  };

  return (
    <div className="space-y-6">
      {/* Recent files with improved visuals */}
      <Card className="overflow-hidden shadow-sm border-muted/60">
        <CardHeader className="py-3 px-4 bg-accent/20 border-b border-border/50">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary/70" />
              Recent Files
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background/80">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 py-1">
          <WorkspaceFileList files={recentFiles} />
        </CardContent>
      </Card>
      
      {/* Workspace tools with better styling */}
      <Card className="overflow-hidden shadow-sm border-muted/60">
        <CardHeader className="py-3 px-4 bg-accent/20 border-b border-border/50">
          <CardTitle className="text-base flex items-center">
            <Settings className="h-4 w-4 mr-2 text-primary/70" />
            Workspace Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3 space-y-2.5">
          <Button variant="outline" className="w-full justify-start text-sm h-9 bg-background/50 hover:bg-accent/60" onClick={handleFileUpload}>
            <Upload className="mr-2 h-4 w-4 text-primary/70" />
            Import Files
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm h-9 bg-background/50 hover:bg-accent/60" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4 text-primary/70" />
            Export Files
          </Button>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t">
          <div className="text-xs text-muted-foreground w-full">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-medium">Storage</span>
              <span>3.5GB / 10GB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/80 to-primary h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkspaceSidebar;
