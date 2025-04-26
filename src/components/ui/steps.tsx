
import React from "react";
import { cn } from "@/lib/utils";

export interface StepsProps {
  steps: { title: string; description: string }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export function Steps({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepsProps) {
  return (
    <div className={cn("flex w-full justify-between", className)}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center space-y-2",
            index > 0 && "flex-1"
          )}
        >
          <div className="flex items-center space-x-2">
            {index > 0 && (
              <div
                className={cn(
                  "h-1 w-full flex-1",
                  index <= currentStep ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}

            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                index < currentStep
                  ? "border-primary bg-primary text-white"
                  : index === currentStep
                  ? "border-primary bg-white text-primary"
                  : "border-gray-300 bg-white text-gray-400"
              )}
              onClick={() => onStepClick && onStepClick(index)}
              role={onStepClick ? "button" : undefined}
            >
              {index < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 w-full flex-1",
                  index < currentStep ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </div>

          <div className="hidden md:flex flex-col items-center text-center">
            <span
              className={cn(
                "text-sm font-medium",
                index <= currentStep ? "text-primary" : "text-gray-500"
              )}
            >
              {step.title}
            </span>
            <span className="text-xs text-gray-500">{step.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
