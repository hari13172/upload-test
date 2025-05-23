import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { QuestionData } from '@/pages/QuestionUpload';

interface ProblemDescriptionProps {
    questionData: QuestionData;
    updateQuestionData: (field: keyof QuestionData, value: any) => void;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ questionData, updateQuestionData }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Problem Description</h3>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Problem Statement *</Label>
                <Textarea
                    id="description"
                    placeholder="Write a detailed description of the problem. Include what the function should do, input format, output format, etc."
                    value={questionData.description}
                    onChange={(e) => updateQuestionData('description', e.target.value)}
                    className="min-h-[200px] resize-none"
                />
                <p className="text-xs text-gray-500">You can use markdown formatting for better presentation</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="cliExplanation" className="text-sm font-medium">CLI Argument Explanation</Label>
                <Textarea
                    id="cliExplanation"
                    placeholder="Explain how command line arguments should be handled (if applicable)"
                    value={questionData.cliExplanation}
                    onChange={(e) => updateQuestionData('cliExplanation', e.target.value)}
                    className="min-h-[100px] resize-none"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="stdoutExplanation" className="text-sm font-medium">STDOUT Explanation</Label>
                <Textarea
                    id="stdoutExplanation"
                    placeholder="Explain the expected output format and what should be printed to stdout"
                    value={questionData.stdoutExplanation}
                    onChange={(e) => updateQuestionData('stdoutExplanation', e.target.value)}
                    className="min-h-[100px] resize-none"
                />
            </div>
        </div>
    );
};

export default ProblemDescription;