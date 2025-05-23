
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Code, List } from 'lucide-react';

const Index = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Coding Platform
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Admin</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Create, manage, and deploy coding questions with our comprehensive question management system
                    </p>
                </div>

                {/* Main Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
                        onClick={() => navigate('/upload')}>
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl">Upload Question</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-6">
                                Create new coding questions with test cases, constraints, and examples
                            </p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Start Creating
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-200">
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <List className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl">Manage Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 mb-6">
                                View, edit, and organize your existing coding questions and test cases
                            </p>
                            <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                                Coming Soon
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Features */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="pt-8">
                                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Rich Question Editor</h3>
                                <p className="text-gray-600">
                                    Create detailed problem statements with markdown support, constraints, and explanations
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="pt-8">
                                <Code className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Test Case Management</h3>
                                <p className="text-gray-600">
                                    Add multiple test cases with public examples and hidden validation cases
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="pt-8">
                                <Upload className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Easy Upload</h3>
                                <p className="text-gray-600">
                                    Intuitive interface for uploading questions with real-time preview functionality
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;