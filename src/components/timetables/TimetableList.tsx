
import React from 'react';
import { Timetable } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Calendar, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TimetableListProps {
  timetables: Timetable[];
  onSelect: (timetable: Timetable) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}

const TimetableList: React.FC<TimetableListProps> = ({ 
  timetables, onSelect, onDelete, onPublish 
}) => {
  const getStatusColor = (status: 'draft' | 'published' | 'archived'): string => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-amber-100 text-amber-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Timetables</h2>
        <Link to="/generate">
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Generate New Timetable
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timetables.map((timetable) => (
          <Card key={timetable.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">{timetable.name}</CardTitle>
                <Badge className={getStatusColor(timetable.status)}>
                  {timetable.status.charAt(0).toUpperCase() + timetable.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>
                {timetable.schoolYear} {timetable.term ? `• ${timetable.term}` : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Start Date:</div>
                  <div>{formatDate(timetable.startDate)}</div>
                  <div className="text-muted-foreground">End Date:</div>
                  <div>{formatDate(timetable.endDate)}</div>
                  <div className="text-muted-foreground">Last Updated:</div>
                  <div>{formatDate(timetable.updatedAt)}</div>
                </div>

                <div className="flex justify-end space-x-2 pt-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => onSelect(timetable)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View timetable details</TooltipContent>
                  </Tooltip>
                  
                  {timetable.status !== 'published' && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8"
                          onClick={() => onPublish(timetable.id)}
                        >
                          <Check className="w-4 h-4 mr-1" /> Publish
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Publish this timetable</TooltipContent>
                    </Tooltip>
                  )}
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => console.log('Edit timetable', timetable.id)}
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit this timetable</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(timetable.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete this timetable</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimetableList;
