
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Settings, Upload, Download, Plus, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'document':
        return <div className="bg-blue-100 p-2 rounded-md"><FileText className="h-3.5 w-3.5 text-blue-600" /></div>;
      case 'spreadsheet':
        return <div className="bg-green-100 p-2 rounded-md"><FileText className="h-3.5 w-3.5 text-green-600" /></div>;
      case 'presentation':
        return <div className="bg-amber-100 p-2 rounded-md"><FileText className="h-3.5 w-3.5 text-amber-600" /></div>;
      case 'pdf':
        return <div className="bg-red-100 p-2 rounded-md"><FileText className="h-3.5 w-3.5 text-red-600" /></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-md"><FileText className="h-3.5 w-3.5 text-gray-600" /></div>;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Google Drive':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Dropbox':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'OneDrive':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Local':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Recent files with improved visuals */}
      <Card className="overflow-hidden shadow-sm border-muted/60">
        <CardHeader className="py-3 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-border/50">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              Recent Files
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/80 rounded-full">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {recentFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 hover:bg-accent/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium truncate">{file.name}</h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Badge 
                        variant="outline" 
                        className={`px-1.5 py-0 text-[10px] font-medium border ${getSourceColor(file.source)}`}
                      >
                        {file.source}
                      </Badge>
                      <span className="ml-2 truncate">{file.lastModified}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {recentFiles.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No recent files
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Workspace tools with better styling */}
      <Card className="overflow-hidden shadow-sm border-muted/60">
        <CardHeader className="py-3 px-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b border-border/50">
          <CardTitle className="text-base flex items-center">
            <Settings className="h-4 w-4 mr-2 text-purple-600" />
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
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "35%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkspaceSidebar;
