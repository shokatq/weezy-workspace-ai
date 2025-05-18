
import React from 'react';
import { FileText, FileSpreadsheet, FileCode, FileImage, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  source: string;
}

interface WorkspaceFileListProps {
  files: FileItem[];
}

const WorkspaceFileList: React.FC<WorkspaceFileListProps> = ({ files }) => {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'code':
        return <FileCode className="h-4 w-4 text-purple-600" />;
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'image':
        return <FileImage className="h-4 w-4 text-amber-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Google Drive':
        return 'bg-blue-100 text-blue-800';
      case 'Dropbox':
        return 'bg-indigo-100 text-indigo-800';
      case 'OneDrive':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-muted rounded">
              {getFileIcon(file.type)}
            </div>
            <div>
              <p className="font-medium text-sm">{file.name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{file.size}</span>
                <span>•</span>
                <span>{file.lastModified}</span>
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-medium", getSourceColor(file.source))}>
                  {file.source}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Open
          </Button>
        </div>
      ))}
      {files.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          No files found
        </div>
      )}
    </div>
  );
};

export default WorkspaceFileList;
