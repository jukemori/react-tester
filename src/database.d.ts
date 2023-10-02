interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  name: string;
}

interface ProjectItemProps {
  project: {
    id: number;
    name: string;
  };
  isEditing: boolean;
  projectNames: { [key: number]: string };
  onEdit: (projectId: number) => void;
  onUpdate: (projectId: number) => void;
  onDelete: (projectId: number) => void;
  onNameChange: (projectId: number, newName: string) => void;
}

interface Test {
  id: number;
  name: string;
  is_successful: boolean;
}

interface TestItemProps {
  test: { id: number; name: string; is_successful: boolean };
  isEditing: boolean;
  onEdit: (testId: number) => void;
  onUpdate: (testId: number, newName: string, newIsSuccessful: boolean) => void; // Include newIsSuccessful
  onDelete: (testId: number) => void;
  projectID: number;
  onNameChange: (testId: number, newName: string) => void;
  onIsSuccessfulChange: (testId: number, newIsSuccessful: boolean) => void; // Add this line
}

interface Code {
  id: number;
  code_body: string;
}

interface CodeItemProps {
  code: { code_body: string };
  isEditing: boolean;
  onUpdate: (updatedCodeBody: string) => void;
  onDelete: () => void;
  onEdit: () => void;
}
