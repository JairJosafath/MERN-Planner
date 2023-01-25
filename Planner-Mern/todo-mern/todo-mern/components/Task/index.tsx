import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AiFillCheckCircle,
  AiFillCheckSquare,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
  AiOutlineLoading,
  AiOutlineMore,
} from "react-icons/ai";
import { useTask } from "../../hooks/useTask";
import { ModalCTX } from "../../pages/_app";
import { Task as TaskInterface } from "../../types/types";
import { formatDate, onChangeDelay } from "../../util";
import Card from "../Card";
import Header from "../Card.Header";
import Status from "../Card.Status";
import Colorpicker from "../Colorpicker";
import Datepicker from "../Datepicker";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Menu from "../Menu";
import Prioritypicker from "../Prioritypicker";
import TextArea from "../TextArea";

interface Props {
  task?: TaskInterface;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

export default function Task({ task, setReload }: Props) {
  const ctx = useContext(ModalCTX);
  const [temp, setTemp] = useState<TaskInterface>({});
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const {
    setUpdateArgs,
    updateArgs,
    setAddTask,
    setDeleteTask,
    loading,
    setError,
    error,
    name,
    setName,
    description,
    setDescription,
    data,
    success,
  } = useTask(task);
  useEffect(() => {
    if (!task?._id)
      ctx?.setModal({
        ...ctx.modal,
        action() {
          setAddTask({
            ...temp,
            project: { id: router.query.id?.toString() },
          });
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    temp.color,
    temp.description,
    temp.dueDate,
    temp.name,
    temp.priority,
    temp.startDate,
    temp.status,
  ]);
  useEffect(() => {
    if (!task?._id && updateArgs?.body && setTemp) {
      setTemp({ ...temp, ...updateArgs?.body });
    }
  }, [task?._id, temp, updateArgs?.body]);

  useEffect(() => {
    if (data && setReload) {
      setReload(true);
    }
  }, [data, setReload]);

  useEffect(() => {
    if (temp.name && success) {
      setTemp({});
      ctx?.setModal({ ...ctx.modal, action: undefined, visible: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp.name, success]);

  return (
    <Card
      shadow={task ? true : false}
      onClick={() => {
        if (task?._id) router.push(`/task/${task?._id}`);
      }}
    >
      <Header>
        <Input
          value={name}
          placeholder={"add a name for this task"}
          onChange={(e) => {
            if (task) setName(e.target.value);
            else if (setTemp) {
              setTemp({ ...temp, name: e.target.value });
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <Colorpicker
          color={task?._id ? task?.color : temp?.color}
          setColor={setUpdateArgs}
        />
        <Prioritypicker
          priority={task?._id ? task?.priority : temp?.priority}
          setPriority={setUpdateArgs}
        />
        {task?._id ? (
          <>
            <AiFillCheckSquare
              style={{
                color: task?._id
                  ? task?.status === "completed"
                    ? "green"
                    : task?.status === "in progress"
                    ? "lightgray"
                    : "grey"
                  : temp?.status === "completed"
                  ? "green"
                  : temp?.status === "in progress"
                  ? "lightgray"
                  : "grey",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setUpdateArgs({
                  key: "status",
                  value:
                    task?.status === "in progress"
                      ? "completed"
                      : "in progress",
                  body: {
                    status: task?._id
                      ? task?.status === "in progress"
                        ? "completed"
                        : "in progress"
                      : temp?.status === "in progress"
                      ? "completed"
                      : "in progress",
                  },
                });
              }}
            />
            <AiOutlineMore
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
            />
            <Menu
              variant="outline"
              show={showMore}
              items={[
                {
                  label: "open task",
                  onClick() {
                    router.push(`/task/${task?._id}`);
                  },
                },
                {
                  label: "delete task",
                  onClick: () => {
                    ctx?.setModal({
                      title: "Delete Task",
                      visible: true,
                      action() {
                        setDeleteTask(task?._id);
                        ctx?.setModal({
                          ...ctx.modal,
                          action: undefined,
                          visible: false,
                        });
                      },
                      children: (
                        <>
                          <p>Are you sure you want to delete </p>
                          <h3>{task?.name}</h3>
                        </>
                      ),
                    });
                    setShowMore(false);
                  },
                },
              ]}
            />
          </>
        ) : null}
      </Header>
      <TextArea
        value={description}
        placeholder={"add a description for this task"}
        onChange={(e) => {
          if (task) setDescription(e.target.value);
          else if (setTemp) {
            setTemp({ ...temp, description: e.target.value });
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />

      <Datepicker
        label={"Start Date"}
        setDate={setUpdateArgs}
        date={formatDate(
          task?._id
            ? task?.startDate
              ? task?.startDate
              : ""
            : temp?.startDate
            ? temp?.startDate
            : ""
        )}
      />
      <Datepicker
        label={"End Date"}
        setDate={setUpdateArgs}
        date={formatDate(
          task?._id
            ? task?.dueDate
              ? task?.dueDate
              : ""
            : temp?.dueDate
            ? temp?.dueDate
            : ""
        )}
      />
      <Status success={success} loading={loading} error={error} />
    </Card>
  );
}
