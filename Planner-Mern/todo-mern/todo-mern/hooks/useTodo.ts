import { useEffect, useReducer, useState } from "react";
import { Todo } from "../types/types";
import { useFecth } from "./useFetch";

export function useTodo(todo: Todo | undefined) {
  const [updateArgs, setUpdateArgs] = useState<{
    key:
      | "title"
      | "description"
      | "status"
      | "color"
      | "priority"
      | "startDate"
      | "name"
      | "dueDate";
    value: string | number;
    body: object;
  }>();

  const [title, setName] = useState(todo?.title);
  const [description, setDescription] = useState(todo?.description);
  const [addTodo, setAddTodo] = useState<Todo>();
  const [deleteTodo, setDeleteTodo] = useState<string>();
  const { loading, error, setError, setReq, data, success } = useFecth();
  const temp = updateArgs && todo ? todo[updateArgs.key] : "";
  useEffect(() => {
    if (updateArgs?.key && temp !== updateArgs.value && todo?._id) {
      setReq({
        url: `/api/updatetodo/${todo?._id}`,
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
    todo?._id,
    setReq,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title) setUpdateArgs({ key: "title", value: title, body: { title } });
    }, 1000);
    return () => {
      clearTimeout(timer);
      setUpdateArgs(undefined);
    };
  }, [title]);
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
    if (addTodo?.title) {
      setReq({
        url: `/api/addtodo`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addTodo),
          method: "POST",
        },
      });
    }

    return () => setAddTodo(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTodo?.title]);
  useEffect(() => {
    if (deleteTodo && todo?._id) {
      setReq({
        url: `/api/deletetodo/${deleteTodo}`,
        body: {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        },
      });
    }

    return () => setDeleteTodo("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTodo]);

  return {
    loading,
    error,
    setError,
    setUpdateArgs,
    setAddTodo,
    setDeleteTodo,
    updateArgs,
    title,
    setName,
    description,
    setDescription,
    data,
    success,
  };
}
