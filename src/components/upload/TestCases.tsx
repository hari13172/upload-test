import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import type { QuestionData } from '@/pages/QuestionUpload';
import { X, Eye, EyeOff } from 'lucide-react';

interface TestCasesProps {
    questionData: QuestionData;
    updateQuestionData: (field: keyof QuestionData, value: any) => void;
}

type TestCase = {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
};

const TestCases: React.FC<TestCasesProps> = ({ questionData, updateQuestionData }) => {
    const addTestCase = () => {
        updateQuestionData('testCases', [
            ...questionData.testCases,
            { input: '', expectedOutput: '', isHidden: false }
        ]);
    };

    const updateTestCase = (index: number, field: keyof TestCase, value: string | boolean) => {
        const newTestCases = [...questionData.testCases] as TestCase[];
        newTestCases[index] = { ...newTestCases[index], [field]: value };
        updateQuestionData('testCases', newTestCases);
    };

    const removeTestCase = (index: number) => {
        if (questionData.testCases.length > 1) {
            const newTestCases = questionData.testCases.filter((_, i) => i !== index);
            updateQuestionData('testCases', newTestCases);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Test Cases</h3>
                <Button onClick={addTestCase} variant="outline" size="sm">
                    Add Test Case
                </Button>
            </div>

            <div className="space-y-6">
                {questionData.testCases.map((testCase, index) => (
                    <Card key={index} className={`border-l-4 ${testCase.isHidden ? 'border-l-orange-500' : 'border-l-green-500'}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                {testCase.isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                Test Case {index + 1}
                                {testCase.isHidden && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Hidden</span>}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`hidden-${index}`}
                                        checked={testCase.isHidden}
                                        onCheckedChange={(checked) => updateTestCase(index, 'isHidden', checked)}
                                    />
                                    <Label htmlFor={`hidden-${index}`} className="text-sm">Hidden</Label>
                                </div>
                                {questionData.testCases.length > 1 && (
                                    <Button
                                        onClick={() => removeTestCase(index)}
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Input</Label>
                                    <Textarea
                                        placeholder="Enter test case input..."
                                        value={testCase.input}
                                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                        className="font-mono text-sm min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Expected Output</Label>
                                    <Textarea
                                        placeholder="Enter expected output..."
                                        value={testCase.expectedOutput}
                                        onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                                        className="font-mono text-sm min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Test Case Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Public test cases are visible to students and help them understand the problem</li>
                    <li>• Hidden test cases are used for final evaluation and should cover edge cases</li>
                    <li>• Include both simple and complex test cases to thoroughly validate solutions</li>
                </ul>
            </div>
        </div>
    );
};

export default TestCases;
