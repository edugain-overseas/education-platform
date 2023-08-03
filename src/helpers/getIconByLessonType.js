import { ReactComponent as LectureIcon } from "../images/icons/lessonIcons/lecture.svg";
import { ReactComponent as TestIcon } from "../images/icons/lessonIcons/test.svg";
import { ReactComponent as VideoLectureIcon } from "../images/icons/lessonIcons/videoLecture.svg";
import { ReactComponent as SeminarIcon } from "../images/icons/lessonIcons/seminar.svg";
import { ReactComponent as VideoSeminarIcon } from "../images/icons/lessonIcons/videoSeminar.svg";
import { ReactComponent as ModulIcon } from "../images/icons/lessonIcons/modul.svg";
import { ReactComponent as ExamIcon } from "../images/icons/lessonIcons/exam.svg";

export const getIconByLessonType = (type) => {
  switch (type) {
    case "lecture":
      return <LectureIcon />;
    case "test":
      return <TestIcon />;
    case "online_lecture":
      return <VideoLectureIcon />;
    case "seminar":
      return <SeminarIcon />;
    case "online_seminar":
      return <VideoSeminarIcon />;
    case "module_control":
      return <ModulIcon />;
    case "exam":
      return <ExamIcon />;

    default:
      break;
  }
};
