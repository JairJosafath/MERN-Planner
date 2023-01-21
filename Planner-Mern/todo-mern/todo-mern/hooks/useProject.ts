import { useEffect, useReducer, useState } from "react";
import { Project } from "../types/types";
import { useFecth } from "./useFetch";

export function useProject(project: Project) {
  const [updateArgs, setUpdateArgs] = useState<{
    key: "name" | "description" | "status" | "color" | "priority";
    value: string | number;
    body: object;
  }>();

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const { loading, error, setError, setReq, data } = useFecth();
  const temp = updateArgs ? project[updateArgs.key] : "";
  useEffect(() => {
    if (updateArgs?.key && temp !== updateArgs.value) {
      setReq({
        url: `/api/updateproject/${project._id}`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateArgs.body),
          method: "POST",
        },
      });
    }
  }, [updateArgs, temp, project._id, setReq]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name) setUpdateArgs({ key: "name", value: name, body: { name } });
    }, 1000);
    return () => clearTimeout(timer);
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
    return () => clearTimeout(timer);
  }, [description]);

  return {
    loading,
    error,
    setError,
    setUpdateArgs,
    name,
    setName,
    description,
    setDescription,
    data,
  };
}
