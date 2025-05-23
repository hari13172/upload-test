import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { QuestionData } from '@/pages/QuestionUpload';
import { X } from 'lucide-react';

interface ExampleSectionProps {
    questionData: QuestionData;
    updateQuestionData: (field: keyof QuestionData, value: any) => void;
}

const ExampleSection: React.FC<ExampleSectionProps> = ({ questionData, updateQuestionData }) => {
    const addExample = () => {
        updateQuestionData('examples', [
            ...questionData.examples,
            { input: '', output: '', explanation: '' }
        ]);
    };

    const updateExample = (index: number, field: 'input' | 'output' | 'explanation', value: string) => {
        const newExamples = [...questionData.examples];
        newExamples[index][field] = value;
        updateQuestionData('examples', newExamples);
    };

    const removeExample = (index: number) => {
        if (questionData.examples.length > 1) {
            const newExamples = questionData.examples.filter((_, i) => i !== index);
            updateQuestionData('examples', newExamples);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Examples</h3>
                <Button onClick={addExample} variant="outline" size="sm">
                    Add Example
                </Button>
            </div>

            <div className="space-y-6">
                {questionData.examples.map((example, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base">Example {index + 1}</CardTitle>
                            {questionData.examples.length > 1 && (
                                <Button
                                    onClick={() => removeExample(index)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Input</Label>
                                    <Textarea
                                        placeholder="Enter example input..."
                                        value={example.input}
                                        onChange={(e) => updateExample(index, 'input', e.target.value)}
                                        className="font-mono text-sm min-h-[80px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Output</Label>
                                    <Textarea
                                        placeholder="Enter expected output..."
                                        value={example.output}
                                        onChange={(e) => updateExample(index, 'output', e.target.value)}
                                        className="font-mono text-sm min-h-[80px]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Explanation (Optional)</Label>
                                <Textarea
                                    placeholder="Explain how the input leads to the output..."
                                    value={example.explanation}
                                    onChange={(e) => updateExample(index, 'explanation', e.target.value)}
                                    className="min-h-[60px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ExampleSection;