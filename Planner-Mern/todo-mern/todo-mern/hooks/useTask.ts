import { useEffect, useReducer, useState } from "react";
import { Task } from "../types/types";
import { useFecth } from "./useFetch";

export function useTask(task: Task | undefined) {
  const [updateArgs, setUpdateArgs] = useState<{
    key:
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

  const [name, setName] = useState(task?.name);
  const [description, setDescription] = useState(task?.description);
  const [addTask, setAddTask] = useState<Task>();
  const [deleteTask, setDeleteTask] = useState<string>();
  const { loading, error, setError, setReq, data, success } = useFecth();
  const temp = updateArgs && task ? task[updateArgs.key] : "";
  useEffect(() => {
    if (updateArgs?.key && temp !== updateArgs.value && task?._id) {
      setReq({
        url: `/api/updatetask/${task?._id}`,
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
    task?._id,
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
    if (addTask?.name) {
      setReq({
        url: `/api/addtask`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addTask),
          method: "POST",
        },
      });
    }

    return () => setAddTask(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTask?.name]);
  useEffect(() => {
    if (deleteTask && task?._id) {
      setReq({
        url: `/api/deletetask/${deleteTask}`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        },
      });
    }

    return () => setDeleteTask("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTask]);

  return {
    loading,
    error,
    setError,
    setUpdateArgs,
    setAddTask,
    setDeleteTask,
    updateArgs,
    name,
    setName,
    description,
    setDescription,
    data,
    success,
  };
}
