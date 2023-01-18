import { useState } from "react";
export default function AddTodo({ taskId }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function addTodoHandler() {
    if (!title) {
      return;
    }
    async function postData(taskId: any) {
      const res = await fetch("/api/addtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, task: { id: taskId } }),
      });

      console.log(JSON.stringify({ title, description, task: { id: taskId } }));
      console.log(await res.json());
    }
    postData(taskId);
  }
  return (
    <>
      <div>
        <div>
          <div>Title</div>
          <input
            type={"text"}
            value={title}
            placeholder="title of the todo"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <div>Description</div>
          <textarea
            value={description}
            placeholder="description of the todo"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={() => addTodoHandler()}>add</button>
      </div>
    </>
  );
}
