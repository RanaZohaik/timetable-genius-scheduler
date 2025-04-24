
import React, { useState, useEffect } from 'react';
import { ClassGroup } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit } from 'lucide-react';

interface ClassEditorProps {
  classes: ClassGroup[];
  onClassesChange: (updatedClasses: ClassGroup[]) => void;
}

const ClassEditor: React.FC<ClassEditorProps> = ({ classes, onClassesChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassGroup | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    numberOfStudents: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (currentClass) {
      setFormData({
        name: currentClass.name,
        grade: currentClass.grade || '',
        section: currentClass.section || '',
        numberOfStudents: currentClass.numberOfStudents || 0,
      });
    } else {
      setFormData({
        name: '',
        grade: '',
        section: '',
        numberOfStudents: 0,
      });
    }
  }, [currentClass]);

  const handleEditClass = (cls: ClassGroup) => {
    setCurrentClass(cls);
    setIsDialogOpen(true);
  };

  const handleAddNewClass = () => {
    setCurrentClass(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Class name is required",
        variant: "destructive"
      });
      return;
    }

    if (currentClass) {
      // Edit existing class
      const updatedClasses = classes.map(cls =>
        cls.id === currentClass.id
          ? {
              ...cls,
              name: formData.name,
              grade: formData.grade,
              section: formData.section,
              numberOfStudents: formData.numberOfStudents,
            }
          : cls
      );
      onClassesChange(updatedClasses);
      toast({
        title: "Class Updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      // Add new class
      const newId = `c${Date.now()}`;
      const newClass: ClassGroup = {
        id: newId,
        name: formData.name,
        grade: formData.grade,
        section: formData.section,
        numberOfStudents: formData.numberOfStudents,
      };
      onClassesChange([...classes, newClass]);
      toast({
        title: "Class Added",
        description: `${formData.name} has been added successfully.`
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Classes</h3>
        <Button onClick={handleAddNewClass} size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Class
        </Button>
      </div>

      <div className="space-y-2">
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className="p-3 border rounded-md hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{cls.name}</div>
              <div className="text-sm text-gray-500">
                {cls.grade && cls.section ? `Grade ${cls.grade}, Section ${cls.section}` : ''} 
                {cls.numberOfStudents ? ` · ${cls.numberOfStudents} students` : ''}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleEditClass(cls)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {classes.length === 0 && (
          <div className="p-8 text-center border border-dashed rounded-md">
            <p className="text-gray-500">No classes added yet.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={handleAddNewClass}>
              <Plus className="w-4 h-4 mr-2" /> Add Your First Class
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentClass ? 'Edit Class' : 'Add New Class'}
            </DialogTitle>
            <DialogDescription>
              Fill out the class details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Class 10B"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="e.g., 10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  placeholder="e.g., B"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="students">Number of Students</Label>
              <Input
                id="students"
                type="number"
                min="0"
                value={formData.numberOfStudents}
                onChange={(e) => setFormData({ ...formData, numberOfStudents: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClassEditor;
