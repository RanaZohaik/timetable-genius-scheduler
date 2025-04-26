
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, Check, Ban, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Conflict } from '@/types';
import { Separator } from '@/components/ui/separator';

interface ConflictResolverProps {
  conflicts: Conflict[];
  onResolveAll: () => void;
  onIgnore: (conflictId: string) => void;
  onViewDetails: (conflictId: string) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ 
  conflicts, onResolveAll, onIgnore, onViewDetails 
}) => {
  if (conflicts.length === 0) {
    return (
      <Card className="border border-green-200 bg-green-50 shadow-sm">
        <CardContent className="py-4 px-6">
          <div className="flex items-start space-x-4">
            <Check className="h-6 w-6 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-700">No Conflicts Detected</h3>
              <p className="text-sm mt-1 text-green-600">
                Your timetable data looks good! No conflicts or issues were detected.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-amber-200 bg-amber-50';
      default:
        return 'border-yellow-200 bg-yellow-50';
    }
  };
  
  const getSeverityIconColor = (severity: string) => {
    switch(severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      default:
        return 'text-yellow-500';
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Detected Conflicts ({conflicts.length})</h2>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={onResolveAll}>
          <Check className="w-4 h-4 mr-2" />
          Resolve All Conflicts
        </Button>
      </div>
      
      {conflicts.map((conflict) => (
        <Card key={conflict.id} className={`border shadow-sm transition-all hover:shadow-md ${getSeverityColor(conflict.severity)}`}>
          <CardContent className="py-4 px-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className={`h-5 w-5 mt-0.5 ${getSeverityIconColor(conflict.severity)}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">
                    {conflict.type.charAt(0).toUpperCase() + conflict.type.slice(1)} Conflict
                  </h3>
                  <Badge variant={conflict.severity === 'high' ? 'destructive' : 'outline'}>
                    {conflict.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm mt-1 text-gray-600">
                  {conflict.description}
                </p>
                
                {conflict.solution && (
                  <>
                    <Separator className="my-3" />
                    <div className="bg-white rounded-md p-3 mt-2 border border-gray-100">
                      <p className="text-sm font-medium text-purple-700 flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Suggested Solution
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{conflict.solution}</p>
                    </div>
                  </>
                )}
                
                <div className="mt-3 flex justify-between items-center">
                  <Button variant="secondary" size="sm" onClick={() => onViewDetails(conflict.id)}>
                    <List className="h-3 w-3 mr-1" /> View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onIgnore(conflict.id)}>
                    <Ban className="h-3 w-3 mr-1" /> Ignore
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConflictResolver;
