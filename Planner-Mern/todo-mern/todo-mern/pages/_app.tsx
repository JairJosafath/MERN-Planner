import type { AppProps } from "next/app";
import Input from "../components/Input";
import { AiOutlineSearch } from "react-icons/ai";
import TextArea from "../components/TextArea";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(true);
  const [success, setsuccess] = useState(false);

  return (
    <>
      <Component {...pageProps} />
      {/* <Input uploaded={success} error={error} loading={loading} />
      <div>
        <TextArea uploaded={success} error={error} loading={loading} />
      </div> */}
      <Dropdown
        items={[
          { label: "item one", onClick: () => console.log("item one") },
          { label: "item two", onClick: () => console.log("item two") },
          { label: "item three", onClick: () => console.log("item three") },
        ]}
      >
        Choose Item
      </Dropdown>
    </>
  );
}
