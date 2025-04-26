
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

export interface StepItem {
  title: string;
  description: string;
}

export interface StepsProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="flex flex-col gap-8">
      <ol className="space-y-4 md:space-y-0 md:space-x-8 md:flex">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          
          return (
            <li 
              key={step.title}
              className={cn(
                "relative flex flex-1 flex-col gap-1 md:gap-2 cursor-pointer",
                {
                  "opacity-60": !isActive && !isCompleted
                }
              )}
              onClick={() => onStepClick?.(index)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "size-10 rounded-full border-2 inline-flex items-center justify-center shrink-0 text-sm font-medium",
                    {
                      "border-primary bg-primary text-primary-foreground": isActive,
                      "border-green-500 bg-green-500 text-white": isCompleted,
                      "border-gray-200 bg-gray-50": !isActive && !isCompleted,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className={cn(
                    "text-sm font-medium",
                    {
                      "text-primary": isActive,
                      "text-green-600": isCompleted,
                    }
                  )}>
                    {step.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {step.description}
                  </span>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-5 -ml-px mt-0.5 h-[calc(100%-20px)] w-0.5 md:h-0.5 md:w-[calc(100%-40px)] md:left-auto md:top-5 md:ml-0 md:mt-0 bg-gray-200" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
