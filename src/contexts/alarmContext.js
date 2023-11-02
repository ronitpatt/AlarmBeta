import { createContext, useState } from 'react'
export const AlarmContext = createContext(null);
export function AlarmProvider({children}) {
  const [ alarms, setAlarms] = useState([]);
  const [ loaded, setLoaded] = useState(false);
  return <AlarmContext.Provider value={{ alarms, setAlarms, loaded, setLoaded }}>{children}</AlarmContext.Provider>
}