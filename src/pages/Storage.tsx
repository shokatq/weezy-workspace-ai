
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, Download, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StoragePage = () => {
  // Mock data
  const storageData = {
    used: 7.5,
    total: 20,
    percentUsed: 37.5,
    platforms: [
      { name: 'Slack', used: 1.2, color: '#4A154B' },
      { name: 'Google Drive', used: 3.5, color: '#4285F4' },
      { name: 'Dropbox', used: 0.8, color: '#0061FF' },
      { name: 'Notion', used: 1.5, color: '#000000' },
      { name: 'Microsoft Teams', used: 0.3, color: '#6264A7' },
      { name: 'Google Chat', used: 0.2, color: '#4285F4' },
    ],
    fileTypes: [
      { name: 'Documents', count: 156, size: 2.3, color: '#3366CC' },
      { name: 'Spreadsheets', count: 89, size: 1.2, color: '#109618' },
      { name: 'Images', count: 342, size: 1.8, color: '#FF9900' },
      { name: 'Videos', count: 23, size: 1.5, color: '#DC3912' },
      { name: 'PDFs', count: 78, size: 0.7, color: '#990099' },
    ],
    recentActivity: [
      { date: 'Monday', files: 24 },
      { date: 'Tuesday', files: 18 },
      { date: 'Wednesday', files: 32 },
      { date: 'Thursday', files: 27 },
      { date: 'Friday', files: 21 },
      { date: 'Saturday', files: 8 },
      { date: 'Sunday', files: 5 },
    ]
  };

  const mostUsedFiles = [
    { id: 1, name: 'Q1 Financial Report.xlsx', platform: 'Google Drive', lastAccessed: '2 hours ago', accessCount: 42 },
    { id: 2, name: 'Marketing Campaign Assets.zip', platform: 'Dropbox', lastAccessed: '5 hours ago', accessCount: 38 },
    { id: 3, name: 'Product Roadmap 2025.docx', platform: 'Notion', lastAccessed: '1 day ago', accessCount: 35 },
    { id: 4, name: 'Team Meeting Notes.md', platform: 'Slack', lastAccessed: '2 days ago', accessCount: 29 },
    { id: 5, name: 'Customer Survey Results.pdf', platform: 'Google Drive', lastAccessed: '3 days ago', accessCount: 24 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Storage Management</h1>
          <div className="flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
                <SelectItem value="drive">Google Drive</SelectItem>
                <SelectItem value="dropbox">Dropbox</SelectItem>
                <SelectItem value="notion">Notion</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="gchat">Google Chat</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Storage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Overview</CardTitle>
            <CardDescription>Total storage usage across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{storageData.used} GB used of {storageData.total} GB</span>
                  <span className="text-sm font-medium">{storageData.percentUsed}%</span>
                </div>
                <Progress value={storageData.percentUsed} className="h-2" />
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {storageData.platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
                      <div className="text-sm">{platform.name}</div>
                      <div className="text-sm font-medium">{platform.used} GB</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageData.platforms}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="used"
                    >
                      {storageData.platforms.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} GB`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* File Types */}
          <Card>
            <CardHeader>
              <CardTitle>File Types</CardTitle>
              <CardDescription>Distribution by file type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storageData.fileTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} GB`} />
                    <Bar dataKey="size" fill="#0F52BA" radius={[4, 4, 0, 0]}>
                      {storageData.fileTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Trend</CardTitle>
              <CardDescription>Files added in the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storageData.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} files`} />
                    <Bar dataKey="files" fill="#008080" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Used Files */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Accessed Files</CardTitle>
            <CardDescription>Files with highest access counts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mostUsedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <div className="text-sm text-muted-foreground flex items-center space-x-2">
                        <span>{file.platform}</span>
                        <span>•</span>
                        <span>Last accessed {file.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="mr-4 bg-primary/10 px-2 py-1 rounded text-xs font-medium">
                      {file.accessCount} accesses
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StoragePage;
