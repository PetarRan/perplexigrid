import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ProjectCard from "./ProjectCard";
import { Project } from "../../../types/project";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { EmptyState } from "../../../shared/components/EmptyState";

interface ProjectsListProps {
  projects: Project[];
  isLoading: boolean;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  onClick: (projectId: string) => void;
  onAdd?: () => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  isLoading,
  onEdit,
  onDelete,
  onClick,
}) => {
  if (isLoading) {
    return <ProjectCardSkeleton count={3} />;
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        message="No projects yet. Create your first project to get started."
        icon={<AddIcon color="disabled" sx={{ fontSize: 40 }} />}
      />
    );
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.name}
          sources={project.sources_number}
          widgets={project.widgets_number}
          createdAt={project.created_at}
          onClick={onClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
