import { useContext } from "react";
import SettingsContext from "../contexts/SettingsContext";

export default () => {
  const context = useContext(SettingsContext);

  return context;
};