// Settings Context - src/context/Settings
import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getPlanList } from "../services/appConfigServ";

export const SettingsContext = createContext();

const defaultSettings = {
  planList: [],
};

export const SettingsProvider = ({ children }) => {
  const [currentSettings, setCurrentSettings] = useLocalStorage('settings',
    defaultSettings
  );

  useEffect(() => {
    initSettings()
  },[])

  const initSettings = async () => {
    const resultPlanList = await getPlanList()
    setCurrentSettings({ planList: resultPlanList.data})
}
  
  return (
    <SettingsContext.Provider
      value={{ currentSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext)