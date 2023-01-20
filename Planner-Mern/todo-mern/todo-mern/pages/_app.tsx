import type { AppProps } from "next/app";
import Input from "../components/Input";
import { AiOutlineMore, AiOutlineSearch } from "react-icons/ai";
import TextArea from "../components/TextArea";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import Menu from "../components/Menu";
import Card from "../components/Card";
import styles from "../styles/layout.module.scss";
import Button from "../components/Button";
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(true);
  const [success, setsuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <div className={darkMode ? styles.dark : styles.light}>
        <Component {...pageProps} />
        <div>
          {" "}
          <Button onClick={() => setDarkMode(!darkMode)}>Toggle mode</Button>
        </div>
        <Dropdown
          items={[
            { label: "item one", onClick: () => console.log("item one") },
            { label: "item two", onClick: () => console.log("item two") },
            { label: "item three", onClick: () => console.log("item three") },
          ]}
        >
          Choose Item
        </Dropdown>

        <Input uploaded={success} error={error} loading={loading} />
        <div>
          <TextArea uploaded={success} error={error} loading={loading} />
        </div>
        <AiOutlineMore
          onClick={() => setShow(!show)}
          style={{ marginLeft: "300px" }}
        />
        <Menu
          variant="outline"
          items={[
            { label: "item one", onClick: () => console.log("menu item one") },
            { label: "item two", onClick: () => console.log("menu item two") },
            {
              label: "item three",
              onClick: () => console.log("menu item three"),
            },
          ]}
          show={show}
        />
        <Card />
      </div>
    </>
  );
}
