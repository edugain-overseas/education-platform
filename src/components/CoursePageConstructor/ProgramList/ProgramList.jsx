import React from "react";

const programData = [
  {
    title: "Title1",
    items: [
      {
        text: "text1",
      },
      {
        text: "text2",
      },
      {
        text: "text3",
      },
      {
        text: "text4",
      },
    ],
  },
  {
    title: "Title2",
    items: [
      {
        text: "text1",
      },
      {
        text: "text2",
      },
      {
        text: "text3",
      },
    ],
  },
  {
    title: "ExamTitle",
  },
];

export default function ProgramList() {
  return (
    <ul>
      {programData &&
        programData.map((parentItem, index) => (
          <li key={index}>
            <div>
              <h4>{parentItem.title}</h4>
              {/* <input type="text" /> */}
            </div>
            {parentItem.items && (
              <ul>
                {parentItem.items.map((childItem, index) => (
                  <li key={index}>
                    <div>
                      <p>{childItem.text}</p>
                      {/* <input type="text" /> */}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  );
}
