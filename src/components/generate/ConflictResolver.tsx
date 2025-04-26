
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Check } from 'lucide-react';
import { Conflict } from '@/types';

export interface ConflictResolverProps {
  conflicts: Conflict[];
  onResolveAll: () => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ conflicts, onResolveAll }) => {
  const [expandedConflict, setExpandedConflict] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedConflict(expandedConflict === id ? null : id);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {conflicts.filter(c => !c.resolved).length} conflicts to resolve
        </h3>
        <Button variant="outline" size="sm" onClick={onResolveAll}>
          <Check className="mr-2 h-4 w-4" />
          Mark All as Resolved
        </Button>
      </div>
      
      {conflicts.map((conflict) => (
        <Card 
          key={conflict.id} 
          className={`${conflict.resolved ? 'bg-gray-50 border-gray-200' : 'border-red-200'}`}
        >
          <CardHeader className="py-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base flex items-center">
                <span 
                  className={`mr-2 w-3 h-3 rounded-full inline-block ${
                    conflict.resolved ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                {conflict.type === 'teacher' ? 'Teacher Conflict' : 'Room Conflict'}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleExpand(conflict.id)}
              >
                {expandedConflict === conflict.id ? 'Hide details' : 'View details'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className={conflict.resolved ? 'text-gray-500' : ''}>
              {conflict.description}
            </p>
            
            {expandedConflict === conflict.id && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Conflict Details</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-2">
                    <p><strong>Day:</strong> {conflict.details.day}</p>
                    <p><strong>Time:</strong> {conflict.details.time}</p>
                    <div className="mt-2">
                      <p className="font-medium">Conflicting Items:</p>
                      <ul className="list-disc pl-5 mt-1">
                        {conflict.details.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConflictResolver;
