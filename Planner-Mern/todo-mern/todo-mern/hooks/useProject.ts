import { useEffect, useReducer, useState } from "react";
import { Project } from "../types/types";
import { useFecth } from "./useFetch";

export function useProject(project: Project | undefined) {
  const [updateArgs, setUpdateArgs] = useState<{
    key:
      | "title"
      | "name"
      | "description"
      | "status"
      | "color"
      | "priority"
      | "startDate"
      | "dueDate";
    value: string | number;
    body: object;
  }>();

  const [name, setName] = useState(project?.name);
  const [description, setDescription] = useState(project?.description);
  const [addProject, setAddProject] = useState<Project>();
  const [deleteProject, setDeleteProject] = useState<string>();
  const { loading, error, setError, setReq, data, success } = useFecth();
  const temp = updateArgs && project ? project[updateArgs.key] : "";
  useEffect(() => {
    if (updateArgs?.key && temp !== updateArgs.value && project?._id) {
      setReq({
        url: `/api/updateproject/${project?._id}`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateArgs.body),
          method: "POST",
        },
      });
    }
    return () => {
      setUpdateArgs(undefined);
    };
  }, [
    updateArgs?.key,
    updateArgs?.value,
    updateArgs?.body,
    temp,
    project?._id,
    setReq,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name) setUpdateArgs({ key: "name", value: name, body: { name } });
    }, 1000);
    return () => {
      clearTimeout(timer);
      setUpdateArgs(undefined);
    };
  }, [name]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (description)
        setUpdateArgs({
          key: "description",
          value: description,
          body: { description },
        });
    }, 1000);
    return () => {
      clearTimeout(timer);
      setUpdateArgs(undefined);
    };
  }, [description]);

  useEffect(() => {
    if (addProject?.name) {
      setReq({
        url: `/api/addproject`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addProject),
          method: "POST",
        },
      });
    }

    return () => setAddProject(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProject?.name]);
  useEffect(() => {
    if (deleteProject && project?._id) {
      setReq({
        url: `/api/deleteproject/${deleteProject}`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        },
      });
    }

    return () => setDeleteProject("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProject]);

  return {
    loading,
    error,
    setError,
    setUpdateArgs,
    setAddProject,
    setDeleteProject,
    updateArgs,
    name,
    setName,
    description,
    setDescription,
    data,
    success,
  };
}
