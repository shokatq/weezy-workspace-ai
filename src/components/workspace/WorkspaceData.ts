
// File for workspace mock data and utilities

export interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  source: string;
}

export const getWorkspaceData = () => {
  // Mock data for workspace files
  const localFiles: FileItem[] = [
    { id: 1, name: 'Project Roadmap.docx', type: 'document', size: '245 KB', lastModified: '2 hours ago', source: 'Local' },
    { id: 2, name: 'Budget Forecast 2025.xlsx', type: 'spreadsheet', size: '1.2 MB', lastModified: '1 day ago', source: 'Local' },
    { id: 3, name: 'Team Meeting Notes.md', type: 'document', size: '32 KB', lastModified: '3 days ago', source: 'Local' },
  ];
  
  const cloudFiles: FileItem[] = [
    { id: 4, name: 'Marketing Strategy.pdf', type: 'pdf', size: '3.7 MB', lastModified: '5 hours ago', source: 'Google Drive' },
    { id: 5, name: 'Sales Presentation.pptx', type: 'presentation', size: '5.1 MB', lastModified: '1 week ago', source: 'Dropbox' },
    { id: 6, name: 'Customer Survey Results.csv', type: 'data', size: '852 KB', lastModified: '2 days ago', source: 'OneDrive' },
  ];

  const getRecentFiles = () => {
    return [...localFiles, ...cloudFiles].sort((a, b) => {
      // Simple sorting by "hours" vs "days" vs "weeks"
      const getTimeValue = (str: string) => {
        if (str.includes('hour')) return 0;
        if (str.includes('day')) return 1;
        if (str.includes('week')) return 2;
        return 3;
      };
      return getTimeValue(a.lastModified) - getTimeValue(b.lastModified);
    }).slice(0, 3);
  };

  return {
    localFiles,
    cloudFiles,
    recentFiles: getRecentFiles()
  };
};
