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
import { useProject } from "../../hooks/useProject";
import { ModalCTX } from "../../pages/_app";
import { Project as ProjectInterface } from "../../types/types";
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
  project?: ProjectInterface;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

export default function Project({ project, setReload }: Props) {
  const ctx = useContext(ModalCTX);
  const [temp, setTemp] = useState<ProjectInterface>({});
  const [showMore, setShowMore] = useState(false);

  const {
    setUpdateArgs,
    updateArgs,
    setAddProject,
    setDeleteProject,
    loading,
    setError,
    error,
    name,
    setName,
    description,
    setDescription,
    data,
    success,
  } = useProject(project);
  useEffect(() => {
    if (!project?._id)
      ctx?.setModal({
        ...ctx.modal,
        action() {
          setAddProject(temp);
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
    if (!project?._id && updateArgs?.body && setTemp) {
      setTemp({ ...temp, ...updateArgs?.body });
    }
  }, [project?._id, temp, updateArgs?.body]);

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
    <Card shadow={project ? true : false}>
      <Header>
        <Input
          value={name}
          placeholder={"add a name for this project"}
          onChange={(e) => {
            if (project) setName(e.target.value);
            else if (setTemp) {
              setTemp({ ...temp, name: e.target.value });
            }
          }}
        />
        <Colorpicker
          color={project?._id ? project?.color : temp?.color}
          setColor={setUpdateArgs}
        />
        <Prioritypicker
          priority={project?._id ? project?.priority : temp?.priority}
          setPriority={setUpdateArgs}
        />
        {project?._id ? (
          <>
            <AiFillCheckSquare
              style={{
                color: project?._id
                  ? project?.status === "completed"
                    ? "green"
                    : project?.status === "in progress"
                    ? "lightgray"
                    : "grey"
                  : temp?.status === "completed"
                  ? "green"
                  : temp?.status === "in progress"
                  ? "lightgray"
                  : "grey",
              }}
              onClick={() =>
                setUpdateArgs({
                  key: "status",
                  value:
                    project?.status === "in progress"
                      ? "completed"
                      : "in progress",
                  body: {
                    status: project?._id
                      ? project?.status === "in progress"
                        ? "completed"
                        : "in progress"
                      : temp?.status === "in progress"
                      ? "completed"
                      : "in progress",
                  },
                })
              }
            />
            <AiOutlineMore onClick={() => setShowMore(!showMore)} />
            <Menu
              variant="outline"
              show={showMore}
              items={[
                {
                  label: "delete project",
                  onClick: () => {
                    ctx?.setModal({
                      title: "Delete Project",
                      visible: true,
                      action() {
                        setDeleteProject(project?._id);
                        ctx?.setModal({
                          ...ctx.modal,
                          action: undefined,
                          visible: false,
                        });
                      },
                      children: (
                        <>
                          <p>Are you sure you want to delete </p>
                          <h3>{project?.name}</h3>
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
        placeholder={"add a description for this project"}
        onChange={(e) => {
          if (project) setDescription(e.target.value);
          else if (setTemp) {
            setTemp({ ...temp, description: e.target.value });
          }
        }}
      />

      <Datepicker
        label={"Start Date"}
        setDate={setUpdateArgs}
        date={formatDate(
          project?._id
            ? project?.startDate
              ? project?.startDate
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
          project?._id
            ? project?.dueDate
              ? project?.dueDate
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
