import React from "react";
import styles from "./ModulesList.module.scss";
import ModuleItem from "./ModuleItem/ModuleItem";

// const modules = [
//   {
//     module_id: 1,
//     module_name: "Основы Анатомии человека",
//     module_number: 1,
//     module_desc: "Введение в курс по анатомии",
//     module_lessons: [
//       {
//         lesson_id: 1,
//         lesson_type: "lecture",
//         lesson_number: 1,
//         lesson_title: "Введение. Системы органов. Виды тканей.",
//         lesson_desc: null,
//         lesson_date: "2023-07-28T10:20:00.752000",
//       },
//       {
//         lesson_id: 2,
//         lesson_type: "seminar",
//         lesson_number: 2,
//         lesson_title: "Нервная ткань. Нейрон. Синапс",
//         lesson_desc: "string",
//         lesson_date: "2023-07-31T10:20:00.752000",
//       },
//       {
//         lesson_id: 3,
//         lesson_type: "test",
//         lesson_number: 4,
//         lesson_title: "Мышечная ткань. Строение скелетных мышц и их функции",
//         lesson_desc: "string",
//         lesson_date: "2023-08-16T11:50:00.752000",
//       },
//       {
//         lesson_id: 4,
//         lesson_type: "online_lecture",
//         lesson_number: 4,
//         lesson_title: "Мышечная ткань. Строение скелетных мышц и их функции",
//         lesson_desc: "string",
//         lesson_date: "2023-08-16T11:50:00.752000",
//       },
//       {
//         lesson_id: 5,
//         lesson_type: "online_seminar",
//         lesson_number: 5,
//         lesson_title: "Модульная контрольная работа 1",
//         lesson_desc:
//           "Модульная контрольная работа по всем лекциям из этого модуля.",
//         lesson_date: "2023-08-08T11:30:00.752000",
//       },
//       {
//         lesson_id: 6,
//         lesson_type: "module_control",
//         lesson_number: 5,
//         lesson_title: "Модульная контрольная работа 1",
//         lesson_desc:
//           "Модульная контрольная работа по всем лекциям из этого модуля.",
//         lesson_date: "2023-08-08T11:30:00.752000",
//       },
//       {
//         lesson_id: 7,
//         lesson_type: "exam",
//         lesson_number: 5,
//         lesson_title: "Модульная контрольная работа 1",
//         lesson_desc:
//           "Модульная контрольная работа по всем лекциям из этого модуля.",
//         lesson_date: "2023-08-08T11:30:00.752000",
//       },
//     ],
//   },
//   {
//     module_id: 2,
//     module_name: "Системы органов",
//     module_number: 2,
//     module_desc:
//       "Знакомство с внутренними органами, их строением и функциями жизнедеятельности",
//     module_lessons: [
//       {
//         lesson_id: 8,
//         lesson_type: "lecture",
//         lesson_number: 1,
//         lesson_title: "Введение. Системы органов. Виды тканей.",
//         lesson_desc: null,
//         lesson_date: "2023-07-28T10:20:00.752000",
//       },
//       {
//         lesson_id: 9,
//         lesson_type: "seminar",
//         lesson_number: 2,
//         lesson_title: "Нервная ткань. Нейрон. Синапс",
//         lesson_desc: "string",
//         lesson_date: "2023-07-31T10:20:00.752000",
//       },
//       {
//         lesson_id: 10,
//         lesson_type: "test",
//         lesson_number: 4,
//         lesson_title: "Мышечная ткань. Строение скелетных мышц и их функции",
//         lesson_desc: "string",
//         lesson_date: "2023-08-16T11:50:00.752000",
//       },
//       {
//         lesson_id: 11,
//         lesson_type: "exam",
//         lesson_number: 5,
//         lesson_title: "Модульная контрольная работа 1",
//         lesson_desc:
//           "Модульная контрольная работа по всем лекциям из этого модуля.",
//         lesson_date: "2023-08-08T11:30:00.752000",
//       },
//     ],
//   },
// ];

export default function ModulesList({modules}) {
  return (
    <div className={styles.modulesListWrapper}>
      <ul className={styles.modulesList}>
        {modules.map((module) => (
          <ModuleItem key={module.module_id} module={module} />
        ))}
      </ul>
    </div>
  );
}
