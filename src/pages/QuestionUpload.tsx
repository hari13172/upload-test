
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import BasicInfo from '@/components/upload/BasicInfo';
import ProblemDescription from '@/components/upload/ProblemDescription';
import Constraints from '@/components/upload/Constraints';
import TestCases from '@/components/upload/TestCases';
import ExampleSection from '@/components/upload/ExampleSection';
import PreviewQuestion from '@/components/upload/PreviewQuestion';
import { FileText, Upload, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export interface QuestionData {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    description: string;
    constraints: string[];
    cliExplanation: string;
    stdoutExplanation: string;
    examples: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    testCases: Array<{
        input: string;
        expectedOutput: string;
        isHidden: boolean;
    }>;
    timeLimit: number;
    memoryLimit: number;
}

const QuestionUpload = () => {
    const [questionData, setQuestionData] = useState<QuestionData>({
        title: '',
        difficulty: 'Easy',
        category: '',
        description: '',
        constraints: [''],
        cliExplanation: '',
        stdoutExplanation: '',
        examples: [{ input: '', output: '', explanation: '' }],
        testCases: [{ input: '', expectedOutput: '', isHidden: false }],
        timeLimit: 1000,
        memoryLimit: 256
    });

    const [activeTab, setActiveTab] = useState('basic');
    const [isPreview, setIsPreview] = useState(false);

    const updateQuestionData = (field: keyof QuestionData, value: any) => {
        setQuestionData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // Validation
        if (!questionData.title || !questionData.description) {
            toast("Validation Error", {
                description: "Please fill in all required fields",
            });
            return;
        }

        // Here you would typically send the data to your backend
        console.log('Question Data:', questionData);
        toast("Question uploaded successfully", {
            description: "Question uploaded successfully",
        });
    };

    const tabs = ['basic', 'description', 'constraints', 'examples', 'testcases'];

    const handleNextTab = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        } else {
            // If we're on the last tab, trigger preview
            setIsPreview(true);
        }
    };

    const handlePreviousTab = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    if (isPreview) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Question Preview</h1>
                        <Button
                            onClick={() => setIsPreview(false)}
                            variant="outline"
                        >
                            Back to Editor
                        </Button>
                    </div>
                    <PreviewQuestion questionData={questionData} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-6">
            <div className="sticky top-0 z-10 bg-gray-50 p-6 pb-4 shadow-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <FileText className="h-8 w-8 text-blue-600" />
                                Upload Coding Question
                            </h1>
                            <p className="text-gray-600 mt-2">Create and configure your coding problem</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setIsPreview(true)}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                Preview
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Question
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6">
                <div className="max-w-6xl mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            <CardTitle className="text-xl">Question Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-5 bg-gray-100 rounded-none">
                                    <TabsTrigger value="basic" className="data-[state=active]:bg-white">Basic Info</TabsTrigger>
                                    <TabsTrigger value="description" className="data-[state=active]:bg-white">Description</TabsTrigger>
                                    <TabsTrigger value="constraints" className="data-[state=active]:bg-white">Constraints</TabsTrigger>
                                    <TabsTrigger value="examples" className="data-[state=active]:bg-white">Examples</TabsTrigger>
                                    <TabsTrigger value="testcases" className="data-[state=active]:bg-white">Test Cases</TabsTrigger>
                                </TabsList>

                                <div className="p-6">
                                    <TabsContent value="basic" className="mt-0">
                                        <BasicInfo
                                            questionData={questionData}
                                            updateQuestionData={updateQuestionData}
                                        />
                                    </TabsContent>

                                    <TabsContent value="description" className="mt-0">
                                        <ProblemDescription
                                            questionData={questionData}
                                            updateQuestionData={updateQuestionData}
                                        />
                                    </TabsContent>

                                    <TabsContent value="constraints" className="mt-0">
                                        <Constraints
                                            questionData={questionData}
                                            updateQuestionData={updateQuestionData}
                                        />
                                    </TabsContent>

                                    <TabsContent value="examples" className="mt-0">
                                        <ExampleSection
                                            questionData={questionData}
                                            updateQuestionData={updateQuestionData}
                                        />
                                    </TabsContent>

                                    <TabsContent value="testcases" className="mt-0">
                                        <TestCases
                                            questionData={questionData}
                                            updateQuestionData={updateQuestionData}
                                        />
                                    </TabsContent>

                                    <div className="flex justify-between mt-6">
                                        {activeTab !== 'basic' && (
                                            <Button
                                                onClick={handlePreviousTab}
                                                variant="outline"
                                                className="flex items-center gap-2"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Previous
                                            </Button>
                                        )}
                                        <div className={activeTab === 'basic' ? 'ml-auto' : ''}>
                                            <Button
                                                onClick={handleNextTab}
                                                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                                            >
                                                {activeTab === tabs[tabs.length - 1] ? 'Preview' : 'Next'}
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default QuestionUpload;