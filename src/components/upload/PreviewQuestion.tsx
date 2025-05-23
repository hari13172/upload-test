import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QuestionData } from '@/pages/QuestionUpload';
import { Clock, HardDrive } from 'lucide-react';

interface PreviewQuestionProps {
    questionData: QuestionData;
}

const PreviewQuestion: React.FC<PreviewQuestionProps> = ({ questionData }) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">{questionData.title || 'Untitled Question'}</CardTitle>
                            <div className="flex gap-2">
                                <Badge className={getDifficultyColor(questionData.difficulty)}>
                                    {questionData.difficulty}
                                </Badge>
                                {questionData.category && (
                                    <Badge variant="outline">{questionData.category}</Badge>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <p className="whitespace-pre-wrap">{questionData.description || 'No description provided'}</p>
                        </div>
                    </CardContent>
                </Card>

                {questionData.constraints.some(c => c.trim()) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Constraints</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1">
                                {questionData.constraints.filter(c => c.trim()).map((constraint, index) => (
                                    <li key={index} className="font-mono text-sm">• {constraint}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {questionData.cliExplanation && (
                    <Card>
                        <CardHeader>
                            <CardTitle>CLI Argument Explanation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{questionData.cliExplanation}</p>
                        </CardContent>
                    </Card>
                )}

                {questionData.stdoutExplanation && (
                    <Card>
                        <CardHeader>
                            <CardTitle>STDOUT Explanation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{questionData.stdoutExplanation}</p>
                        </CardContent>
                    </Card>
                )}

                {questionData.examples.some(e => e.input || e.output) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Examples</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {questionData.examples.filter(e => e.input || e.output).map((example, index) => (
                                <div key={index} className="space-y-3">
                                    <h4 className="font-semibold">Example {index + 1}:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium mb-1">Input:</p>
                                            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{example.input}</pre>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium mb-1">Output:</p>
                                            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{example.output}</pre>
                                        </div>
                                    </div>
                                    {example.explanation && (
                                        <div>
                                            <p className="text-sm font-medium mb-1">Explanation:</p>
                                            <p className="text-sm text-gray-600">{example.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Execution Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium">Time Limit</p>
                                <p className="text-sm text-gray-600">{questionData.timeLimit}ms</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <HardDrive className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium">Memory Limit</p>
                                <p className="text-sm text-gray-600">{questionData.memoryLimit}MB</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Test Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Total Test Cases:</span>
                                <span className="font-medium">{questionData.testCases.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Public Cases:</span>
                                <span className="font-medium text-green-600">
                                    {questionData.testCases.filter(tc => !tc.isHidden).length}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Hidden Cases:</span>
                                <span className="font-medium text-orange-600">
                                    {questionData.testCases.filter(tc => tc.isHidden).length}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PreviewQuestion;