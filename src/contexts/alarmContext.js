import { createContext, useState } from 'react'
export const AlarmContext = createContext(null);
export function AlarmProvider({children}) {
  const [ alarms, setAlarms] = useState([]);
  return <AlarmContext.Provider value={{ alarms, setAlarms }}>{children}</AlarmContext.Provider>
}