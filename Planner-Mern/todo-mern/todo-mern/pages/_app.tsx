import type { AppProps } from "next/app";
import Button from "../components/Button";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <div>
        <Button
          onClick={() => console.log("clicked")}
          variant="primary"
          size="xs"
        >
          Primary
        </Button>
        <Button
          onClick={() => console.log("clicked")}
          variant="outline"
          size="xs"
        >
          Outline
        </Button>
        <Button onClick={() => console.log("clicked")} variant="text" size="xs">
          Text
        </Button>
      </div>
      <div>
        <Button
          onClick={() => console.log("clicked")}
          variant="primary"
          size="sm"
        >
          Primary
        </Button>
        <Button
          onClick={() => console.log("clicked")}
          variant="outline"
          size="sm"
        >
          Outline
        </Button>
        <Button onClick={() => console.log("clicked")} variant="text" size="sm">
          Text
        </Button>
      </div>
      <div>
        <Button
          onClick={() => console.log("clicked")}
          variant="primary"
          size="md"
        >
          Primary
        </Button>
        <Button
          onClick={() => console.log("clicked")}
          variant="outline"
          size="md"
        >
          Outline
        </Button>
        <Button onClick={() => console.log("clicked")} variant="text" size="md">
          Text
        </Button>
      </div>
      <div>
        <Button
          onClick={() => console.log("clicked")}
          variant="primary"
          size="lg"
        >
          Primary
        </Button>
        <Button
          onClick={() => console.log("clicked")}
          variant="outline"
          size="lg"
        >
          Outline
        </Button>
        <Button onClick={() => console.log("clicked")} variant="text" size="lg">
          Text
        </Button>
      </div>
      <div>
        <Button
          onClick={() => console.log("clicked")}
          variant="primary"
          size="xl"
        >
          Primary
        </Button>
        <Button
          onClick={() => console.log("clicked")}
          variant="outline"
          size="xl"
        >
          Outline
        </Button>
        <Button onClick={() => console.log("clicked")} variant="text" size="xl">
          Text
        </Button>
      </div>
    </>
  );
}
