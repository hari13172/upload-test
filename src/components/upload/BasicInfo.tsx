import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { QuestionData } from "@/pages/QuestionUpload";

interface BasicInfoProps {
    questionData: QuestionData;
    updateQuestionData: (field: keyof QuestionData, value: any) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ questionData, updateQuestionData }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Question Title *</Label>
                    <Input
                        id="title"
                        placeholder="e.g., Two Sum, Binary Tree Traversal"
                        value={questionData.title}
                        onChange={(e) => updateQuestionData('title', e.target.value)}
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                    <Input
                        id="category"
                        placeholder="e.g., Arrays, Dynamic Programming"
                        value={questionData.category}
                        onChange={(e) => updateQuestionData('category', e.target.value)}
                        className="h-12"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty Level</Label>
                <Select
                    value={questionData.difficulty}
                    onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => updateQuestionData('difficulty', value)}
                >
                    <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Easy">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                Easy
                            </span>
                        </SelectItem>
                        <SelectItem value="Medium">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                Medium
                            </span>
                        </SelectItem>
                        <SelectItem value="Hard">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                Hard
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default BasicInfo;