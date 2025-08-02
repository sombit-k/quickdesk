"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Upload, X, FileText, Image as ImageIcon, Paperclip, Send, Sparkles } from "lucide-react";

const AskQuestionPage = () => {
  const params = useParams();
  const userId = params.id;
  
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: '',
    tags: '',
    attachments: []
  });
  
  const [dragOver, setDragOver] = useState(false);

  const categories = [
    { value: 'technical', label: 'Technical', color: 'bg-blue-500' },
    { value: 'billing', label: 'Billing', color: 'bg-purple-500' },
    { value: 'general', label: 'General', color: 'bg-green-500' },
    { value: 'account', label: 'Account', color: 'bg-orange-500' },
    { value: 'support', label: 'Support', color: 'bg-red-500' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newFiles]
    }));
  };

  const removeAttachment = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(file => file.id !== id)
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { ...formData, userId });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-sky-200 p-6">
      <div className="max-w-4xl mx-auto mt-18">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Ask Your Question
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get help from our community by asking a detailed question
          </p>
          <Badge variant="outline" className="mt-2 border-blue-200 text-blue-700">
            User ID: {userId}
          </Badge>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 border-blue-200 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200">
              <CardTitle className="text-blue-800 text-xl font-semibold">
                Create New Ticket
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Question Field */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-3"
                >
                  <Label htmlFor="question" className="text-blue-800 font-semibold text-lg">
                    Question
                  </Label>
                  <Input
                    id="question"
                    type="text"
                    placeholder="Enter your question title here..."
                    value={formData.question}
                    onChange={(e) => handleInputChange('question', e.target.value)}
                    className="w-full bg-white/70 backdrop-blur-sm border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-lg py-4 shadow-sm hover:shadow-md transition-all duration-300"
                    required
                  />
                </motion.div>

                {/* Description Field */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-3"
                >
                  <Label htmlFor="description" className="text-blue-800 font-semibold text-lg">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your question or issue..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-white/70 backdrop-blur-sm border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl min-h-[120px] resize-none shadow-sm hover:shadow-md transition-all duration-300"
                    required
                  />
                </motion.div>

                {/* Category and Tags Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Field */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <Label htmlFor="category" className="text-blue-800 font-semibold text-lg">
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="w-full bg-white/70 backdrop-blur-sm border-blue-300 focus:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl shadow-xl">
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                              {category.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Tags Field */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <Label htmlFor="tags" className="text-blue-800 font-semibold text-lg">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      type="text"
                      placeholder="Add tags separated by commas..."
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      className="w-full bg-white/70 backdrop-blur-sm border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    />
                  </motion.div>
                </div>

                {/* File Attachment Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="space-y-4"
                >
                  <Label className="text-blue-800 font-semibold text-lg">
                    Attachments (Optional)
                  </Label>
                  
                  {/* Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragOver 
                        ? 'border-blue-500 bg-blue-100/50' 
                        : 'border-blue-300 bg-white/30 hover:bg-white/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="h-12 w-12 text-blue-500" />
                        <div>
                          <p className="text-blue-800 font-medium text-lg">
                            Drop files here or click to upload
                          </p>
                          <p className="text-blue-600 text-sm mt-1">
                            Support for images, documents, and other files
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Uploaded Files List */}
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-blue-800 font-medium">Uploaded Files:</p>
                      <div className="space-y-2">
                        {formData.attachments.map((file) => (
                          <motion.div
                            key={file.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200"
                          >
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <div>
                                <p className="text-blue-800 font-medium text-sm">{file.name}</p>
                                <p className="text-blue-600 text-xs">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(file.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex justify-center pt-4"
                >
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Post Question
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="bg-white/50 backdrop-blur-sm border-blue-200">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                <strong>Tips for asking great questions:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>• Be specific and clear in your question title</div>
                <div>• Provide detailed context in the description</div>
                <div>• Choose the most relevant category</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AskQuestionPage;
