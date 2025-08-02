"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Upload, X, FileText, Image as ImageIcon, Paperclip, Send, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { createTicket, getCategories, testDatabaseConnection } from '@/actions/user';
import { toast } from 'sonner';

const AskQuestionPage = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: '',
    tags: '',
    attachments: []
  });
  
  const [categories, setCategories] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        
        // Test database connection first
        const connectionTest = await testDatabaseConnection();
        if (!connectionTest.success) {
          setDbConnected(false);
          toast.error('Database Connection Issue', {
            description: 'Unable to connect to the database. Some features may not work properly.',
            duration: 5000,
          });
          return;
        }
        
        const categoryList = await getCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setDbConnected(false);
        toast.error('Failed to load categories', {
          description: 'Database connection error. Please refresh the page and try again.',
          duration: 5000,
        });
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate required fields
      if (!formData.question.trim()) {
        throw new Error('Question title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.category) {
        throw new Error('Category is required');
      }

      // Prepare data for submission
      const ticketData = {
        question: formData.question,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        attachments: formData.attachments,
        priority: 'MEDIUM', // Default priority
      };

      // Create the ticket
      const ticket = await createTicket(ticketData);
      
      // Show success message
      setSuccess(true);
      toast.success('Question posted successfully!', {
        description: 'Your ticket has been created and is now visible to the community.',
      });

      // Redirect to the ticket page after a short delay
      setTimeout(() => {
        router.push(`/ticket/${ticket.id}`);
      }, 2000);

    } catch (error) {
      console.error('Failed to create ticket:', error);
      
      // Check if it's a database connection error
      if (error.message.includes("Can't reach database server")) {
        toast.error('Database Connection Error', {
          description: 'Unable to connect to the database. Please try again later or contact support.',
          duration: 5000,
        });
      } else if (error.message.includes("User not found")) {
        toast.error('Authentication Error', {
          description: 'Your user account was not found. Please sign out and sign in again.',
          duration: 5000,
        });
      } else {
        toast.error('Failed to post question', {
          description: error.message || 'Something went wrong. Please try again.',
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
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
          {!dbConnected && (
            <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-red-700 text-sm font-medium">
                  Database connection issue detected. Form submission may not work properly.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 border-blue-200 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200 flex items-center justify-center py-6">
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
                        {categoriesLoading ? (
                          <SelectItem value="loading" disabled>
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                              Loading categories...
                            </div>
                          </SelectItem>
                        ) : categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: category.color || '#3B82F6' }}></div>
                                {category.name}
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="empty" disabled>No categories available</SelectItem>
                        )}
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
                    disabled={loading || success || !formData.question.trim() || !formData.description.trim() || !formData.category}
                    className={`px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      success 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : (!formData.question.trim() || !formData.description.trim() || !formData.category)
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Posting...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Posted Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Post Question
                      </>
                    )}
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
