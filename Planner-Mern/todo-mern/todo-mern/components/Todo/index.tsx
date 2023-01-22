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
import { useTodo } from "../../hooks/useTodo";
import { ModalCTX } from "../../pages/_app";
import { Todo as TodoInterface } from "../../types/types";
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
  todo?: TodoInterface;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

export default function Todo({ todo, setReload }: Props) {
  const ctx = useContext(ModalCTX);
  const [temp, setTemp] = useState<TodoInterface>({});
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const {
    setUpdateArgs,
    updateArgs,
    setAddTodo,
    setDeleteTodo,
    loading,
    setError,
    error,
    title,
    setName,
    description,
    setDescription,
    data,
    success,
  } = useTodo(todo);
  useEffect(() => {
    if (!todo?._id)
      ctx?.setModal({
        ...ctx.modal,
        action() {
          setAddTodo({
            ...temp,
            task: { id: router.query.id?.toString() },
          });
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    temp.color,
    temp.description,
    temp.dueDate,
    temp.title,
    temp.priority,
    temp.startDate,
    temp.status,
  ]);
  useEffect(() => {
    if (!todo?._id && updateArgs?.body && setTemp) {
      setTemp({ ...temp, ...updateArgs?.body });
    }
  }, [todo?._id, temp, updateArgs?.body]);

  useEffect(() => {
    if (data && setReload) {
      setReload(true);
    }
  }, [data, setReload]);

  useEffect(() => {
    if (temp.title && success) {
      setTemp({});
      ctx?.setModal({ ...ctx.modal, action: undefined, visible: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp.title, success]);

  return (
    <Card
      shadow={todo ? true : false}
      onClick={() => {
        if (todo?._id) router.push(`/todo/${todo?._id}`);
      }}
    >
      <Header>
        <Input
          value={title}
          placeholder={"add a title for this todo"}
          onChange={(e) => {
            if (todo) setName(e.target.value);
            else if (setTemp) {
              setTemp({ ...temp, title: e.target.value });
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <Colorpicker
          color={todo?._id ? todo?.color : temp?.color}
          setColor={setUpdateArgs}
        />
        <Prioritypicker
          priority={todo?._id ? todo?.priority : temp?.priority}
          setPriority={setUpdateArgs}
        />
        {todo?._id ? (
          <>
            <AiFillCheckSquare
              style={{
                color: todo?._id
                  ? todo?.status === "completed"
                    ? "green"
                    : todo?.status === "in progress"
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
                    todo?.status === "in progress"
                      ? "completed"
                      : "in progress",
                  body: {
                    status: todo?._id
                      ? todo?.status === "in progress"
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
                  label: "open todo",
                  onClick() {
                    router.push(`/todo/${todo?._id}`);
                  },
                },
                {
                  label: "delete todo",
                  onClick: () => {
                    ctx?.setModal({
                      title: "Delete Todo",
                      visible: true,
                      action() {
                        setDeleteTodo(todo?._id);
                        ctx?.setModal({
                          ...ctx.modal,
                          action: undefined,
                          visible: false,
                        });
                      },
                      children: (
                        <>
                          <p>Are you sure you want to delete </p>
                          <h3>{todo?.title}</h3>
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
        placeholder={"add a description for this todo"}
        onChange={(e) => {
          if (todo) setDescription(e.target.value);
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
          todo?._id
            ? todo?.startDate
              ? todo?.startDate
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
          todo?._id
            ? todo?.dueDate
              ? todo?.dueDate
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
