import { useRouter } from "next/router";

export default function Task({ data }: any) {
  const router = useRouter();
  const { id } = router.query;
  console.log(data);
  return (
    <>
      <h1> Task {id}</h1>
      <ul>
        {data.body.task?.todos?.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.params.id;
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/api/gettask/${id}`);
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}
