import getNoun from "@/scripts/getNoun";
import * as dayjs from "dayjs";

interface ITimeLangs {
  eng: dayjs.QUnitType | dayjs.OpUnitType;
  ru: [one: string, two: string, five: string];
}

const timeArray: ITimeLangs[] = [
  { eng: "years", ru: ["год", "года", "лет"] },
  { eng: "months", ru: ["месяц", "месяца", "месяцев"] },
  { eng: "weeks", ru: ["неделю", "недели", "недель"] },
  { eng: "days", ru: ["день", "дня", "дней"] },
  { eng: "hours", ru: ["час", "часа", "часов"] },
  { eng: "minutes", ru: ["минуту", "минуты", "минут"] },
  { eng: "seconds", ru: ["секунду", "секунды", "секунд"] },
];

const getTimeAgo = (time?: string): string => {
  for (const value of timeArray) {
    const difference = -dayjs(time).diff(dayjs(), value.eng);

    if (difference !== 0) {
      return `${difference} ${getNoun(difference, value.ru[0], value.ru[1], value.ru[2])}`
    }
  }

  return "";
}

export default getTimeAgo;