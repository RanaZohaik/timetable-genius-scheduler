
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

// Steps Component
interface StepsProps {
  activeStep: number;
  children: React.ReactNode;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({ activeStep, children, className }) => {
  // Convert children to array to manipulate
  const childrenArray = React.Children.toArray(children);

  // Clone each child and add props
  const steps = React.Children.map(childrenArray, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        isActive: activeStep === index,
        isCompleted: activeStep > index,
        stepNumber: index + 1,
      });
    }
    return child;
  });

  return (
    <div className={cn("flex flex-col space-y-8", className)}>
      {steps}
    </div>
  );
};

// Step Indicator Component
interface StepIndicatorProps {
  className?: string;
  children: React.ReactNode;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ className, children }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
};

// Step Status Component
interface StepStatusProps {
  complete: React.ReactNode;
  incomplete: React.ReactNode;
  active: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
  className?: string;
}

export const StepStatus: React.FC<StepStatusProps> = ({ 
  complete, incomplete, active, isCompleted, isActive, className 
}) => {
  let content = incomplete;
  
  if (isCompleted) {
    content = complete;
  } else if (isActive) {
    content = active;
  }
  
  return (
    <div className={cn("", className)}>
      {content}
    </div>
  );
};

// Step Icon Component
interface StepIconProps {
  className?: string;
}

export const StepIcon: React.FC<StepIconProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground", className)}>
      <CheckIcon className="w-4 h-4" />
    </div>
  );
};

// Step Number Component
interface StepNumberProps {
  className?: string;
  stepNumber?: number;
  isActive?: boolean;
}

export const StepNumber: React.FC<StepNumberProps> = ({ className, stepNumber, isActive }) => {
  return (
    <div className={cn(
      "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
      isActive 
        ? "border-primary bg-primary text-primary-foreground" 
        : "border-muted-foreground text-muted-foreground",
      className
    )}>
      {stepNumber}
    </div>
  );
};

// Step Title Component
interface StepTitleProps {
  className?: string;
  isActive?: boolean;
  isCompleted?: boolean;
  children: React.ReactNode;
}

export const StepTitle: React.FC<StepTitleProps> = ({ className, isActive, isCompleted, children }) => {
  return (
    <div className={cn(
      "text-sm font-medium",
      isCompleted ? "text-primary" : isActive ? "text-foreground" : "text-muted-foreground",
      className
    )}>
      {children}
    </div>
  );
};

// Step Description Component
interface StepDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const StepDescription: React.FC<StepDescriptionProps> = ({ className, children }) => {
  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </div>
  );
};

// Step Separator Component
interface StepSeparatorProps {
  className?: string;
  isCompleted?: boolean;
}

export const StepSeparator: React.FC<StepSeparatorProps> = ({ className, isCompleted }) => {
  return (
    <div className={cn(
      "flex-1 h-0.5 mx-4 my-auto",
      isCompleted ? "bg-primary" : "bg-border",
      className
    )} />
  );
};
