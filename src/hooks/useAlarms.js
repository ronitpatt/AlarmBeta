import { useContext } from "react";
import { AlarmContext } from "../contexts/alarmContext";
export default function useAlarms() {
  const alarmContext = useContext(AlarmContext);
  if (alarmContext === null) {
    throw new Error("useAlarm must be used within a AlarmProvider");
  }
  return alarmContext;
}