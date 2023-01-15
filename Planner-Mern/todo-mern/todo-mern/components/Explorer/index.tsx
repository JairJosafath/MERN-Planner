import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDownSquare,
} from "react-icons/ai";
import styles from "../../styles/components/explorer/explorer.module.scss";
export default function Explorer() {
  const [isExpanded, setIsExpanded] = useState("fav");
  const [isExpandedProject, setIsExpandedProject] = useState("");
  const router = useRouter();
  return (
    <>
      <div className={styles["container-light"]}>
        <div
          className={styles["header-light"]}
          key={"Favorite"}
          onClick={() => setIsExpanded(isExpanded === "fav" ? "" : "fav")}
        >
          Favorites
          <AiFillCaretDown
            id={isExpanded === "fav" ? styles["active-arrow"] : undefined}
          />
        </div>
        {isExpanded == "fav"
          ? [1, 2, 3].map((item) => (
              <>
                <div
                  className={styles["item-light"]}
                  key={item}
                  onClick={() =>
                    setIsExpandedProject(
                      isExpandedProject === `fav${item}` ? "" : `fav${item}`
                    )
                  }
                >
                  Favorite Project {item}
                  <AiFillCaretDown
                    id={
                      isExpandedProject === "fav" + item
                        ? styles["active-arrow"]
                        : undefined
                    }
                  />
                </div>
                {/* // sublisst */}
                {isExpandedProject === `fav${item}` ? (
                  <div>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={`sub-item-${item}`}
                        className={styles["subitem-light"]}
                        onClick={() => router.push("/task/" + item)}
                      >
                        <p>Task {item}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ))
          : null}

        <div
          className={styles["header-light"]}
          key={"Projects"}
          onClick={() => setIsExpanded(isExpanded === "pro" ? "" : "pro")}
        >
          Projects
          <AiFillCaretDown
            id={isExpanded === "pro" ? styles["active-arrow"] : undefined}
          />
        </div>
        {isExpanded == "pro"
          ? [0, 1].map((item: any) => (
              <>
                <div
                  className={styles["item-light"]}
                  key={`project-item-${item}`}
                  onClick={() =>
                    setIsExpandedProject(
                      isExpandedProject === `pro${item}` ? "" : `pro${item}`
                    )
                  }
                >
                  Project {item}
                  <AiFillCaretDown
                    id={
                      isExpandedProject === "pro" + item
                        ? styles["active-arrow"]
                        : undefined
                    }
                  />
                </div>
                {/* // sublisst */}
                {isExpandedProject === `pro${item}` ? (
                  <div>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13].map((item) => (
                      <div
                        key={`project-sub-item-${item}`}
                        className={styles["subitem-light"]}
                        onClick={() => router.push("/task/" + item)}
                      >
                        <p>Task {item}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ))
          : null}
      </div>
    </>
  );
}
