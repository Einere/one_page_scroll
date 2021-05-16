import React, { useEffect } from "react";

function isHTMLElement(target: any): target is HTMLElement {
  return target instanceof HTMLElement;
}

function isNodeList(target: any): target is NodeList {
  return target instanceof NodeList;
}

export function Body() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [observable] = entries.filter(
          (observable) => observable.isIntersecting
        );

        if (observable && isHTMLElement(observable.target)) {
          const offsetTop = observable.target.offsetTop;

          window.scroll({
            left: 0,
            top: offsetTop,
            behavior: "smooth",
          });
        }
      },
      {
        threshold: 0.1,
      }
    );
    const targets = document.querySelectorAll(".screen");
    if (isNodeList(targets)) {
      const nodeArray = Array.from(targets);
      const isAllDiv = nodeArray.every((node) => node.tagName === "DIV");

      if (isAllDiv) {
        nodeArray.forEach((node) => observer.observe(node));
      }
    }

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div>
      <div className={"screen lightpink"}>first screen</div>
      <div className={"screen lightblue"}>second screen</div>
      <div className={"screen lightgreen"}>third screen</div>
      <div className={"screen lightcoral"}>fourth screen</div>
      <div className={"screen lightsteelblue"}>fifth screen</div>
    </div>
  );
}
