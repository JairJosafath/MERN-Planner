import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCheckSquare,
  AiOutlineExclamation,
  AiOutlineMore,
} from "react-icons/ai";
import { useProject } from "../../hooks/useProject";
import { Project as ProjectInterface } from "../../types/types";
import { onChangeDelay } from "../../util";
import Card from "../Card";
import Header from "../Card.Header";
import Colorpicker from "../Colorpicker";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Menu from "../Menu";
import Prioritypicker from "../Prioritypicker";
import TextArea from "../TextArea";

interface Props {
  project: ProjectInterface;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export default function Project({ project, setReload }: Props) {
  const [showMore, setShowMore] = useState(false);
  const {
    setUpdateArgs,
    loading,
    setError,
    error,
    name,
    setName,
    description,
    setDescription,
    data,
  } = useProject(project);

  useEffect(() => {
    if (data) {
      setReload(true);
    }
  }, [data, setReload]);

  return (
    <Card key={project._id}>
      <Header>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Colorpicker color={project?.color} setColor={setUpdateArgs} />
        <Prioritypicker
          priority={project?.priority}
          setPriority={setUpdateArgs}
        />
        <AiFillCheckSquare
          style={{ color: project?.status === "completed" ? "green" : "grey" }}
          onClick={() =>
            setUpdateArgs({
              key: "status",
              value:
                project?.status === "in progress" ? "completed" : "in progress",
              body: {
                status:
                  project?.status === "in progress"
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
                console.log("delete project");
                setShowMore(false);
              },
            },
          ]}
        />
      </Header>
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type={"date"} />
      <input type={"date"} />
    </Card>
  );
}
