
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { QuestionData } from '@/pages/QuestionUpload';
import { X } from 'lucide-react';

interface ConstraintsProps {
    questionData: QuestionData;
    updateQuestionData: (field: keyof QuestionData, value: any) => void;
}

const Constraints: React.FC<ConstraintsProps> = ({ questionData, updateQuestionData }) => {
    const addConstraint = () => {
        const newConstraints = [...questionData.constraints, ''];
        updateQuestionData('constraints', newConstraints);
    };

    const updateConstraint = (index: number, value: string) => {
        const newConstraints = [...questionData.constraints];
        newConstraints[index] = value;
        updateQuestionData('constraints', newConstraints);
    };

    const removeConstraint = (index: number) => {
        if (questionData.constraints.length > 1) {
            const newConstraints = questionData.constraints.filter((_, i) => i !== index);
            updateQuestionData('constraints', newConstraints);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Constraints</h3>
                <Button onClick={addConstraint} variant="outline" size="sm">
                    Add Constraint
                </Button>
            </div>

            <div className="space-y-4">
                <Label className="text-sm font-medium">Problem Constraints</Label>
                {questionData.constraints.map((constraint, index) => (
                    <div key={index} className="flex gap-3 items-center">
                        <div className="flex-1">
                            <Input
                                placeholder={`e.g., 1 <= n <= 10^5`}
                                value={constraint}
                                onChange={(e) => updateConstraint(index, e.target.value)}
                            />
                        </div>
                        {questionData.constraints.length > 1 && (
                            <Button
                                onClick={() => removeConstraint(index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
                <p className="text-xs text-gray-500">
                    Add constraints that define the limits and bounds of the input parameters
                </p>
            </div>
        </div>
    );
};

export default Constraints;