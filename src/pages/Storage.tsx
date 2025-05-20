
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, Download, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StoragePage = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  
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

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm">{label || payload[0].name}</p>
          <p className="text-sm text-primary">
            {payload[0].name}: {payload[0].value} {payload[0].unit || 'GB'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to get platform badge style
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'Google Drive':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Dropbox':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Notion':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Slack':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <MainLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
                  <Progress 
                    value={storageData.percentUsed} 
                    className="h-2"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500"
                  />
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {storageData.platforms.map((platform) => (
                      <motion.div 
                        key={platform.name} 
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onMouseEnter={() => setHoveredSlice(platform.name)}
                        onMouseLeave={() => setHoveredSlice(null)}
                      >
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: platform.color }}
                        ></div>
                        <div className="text-sm">{platform.name}</div>
                        <div className="text-sm font-medium">{platform.used} GB</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={storageData.platforms}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={70}
                        innerRadius={40}
                        paddingAngle={2}
                        dataKey="used"
                        animationBegin={0}
                        animationDuration={1500}
                      >
                        {storageData.platforms.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke={hoveredSlice === entry.name ? "#fff" : "none"} 
                            strokeWidth={hoveredSlice === entry.name ? 2 : 0}
                            className="transition-all duration-300"
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* File Types */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle>File Types</CardTitle>
                <CardDescription>Distribution by file type</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-72 pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={storageData.fileTypes} margin={{ top: 0, right: 30, left: 10, bottom: 30 }}>
                      <defs>
                        {storageData.fileTypes.map((entry, index) => (
                          <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={entry.color} stopOpacity={0.4} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12 }}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="size" 
                        radius={[4, 4, 0, 0]} 
                        animationDuration={1500}
                      >
                        {storageData.fileTypes.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#colorGradient-${index})`} 
                            stroke={entry.color}
                            strokeWidth={1}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                <CardTitle>Activity Trend</CardTitle>
                <CardDescription>Files added in the past week</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-72 pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={storageData.recentActivity} margin={{ top: 0, right: 30, left: 10, bottom: 30 }}>
                      <defs>
                        <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#008080" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#008080" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="files" 
                        fill="url(#activityGradient)" 
                        stroke="#008080"
                        strokeWidth={1}
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Most Used Files */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
              <CardTitle>Frequently Accessed Files</CardTitle>
              <CardDescription>Files with highest access counts</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Last Accessed</TableHead>
                    <TableHead className="text-right">Access Count</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mostUsedFiles.map((file, index) => (
                    <TableRow key={file.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="bg-muted/60 p-2 rounded">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="font-medium">{file.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformBadge(file.platform)}`}>
                          {file.platform}
                        </span>
                      </TableCell>
                      <TableCell>{file.lastAccessed}</TableCell>
                      <TableCell className="text-right">
                        <div className="mr-4 bg-primary/10 px-2 py-1 rounded text-xs font-medium inline-block">
                          {file.accessCount} accesses
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default StoragePage;
