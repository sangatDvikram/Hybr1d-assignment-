import { createContext } from "react";
interface AppContextInterface {
  items: any[];
  onSearch: (e: any) => void;
}
export const AppContext = createContext<AppContextInterface>({
  items: [],
  onSearch: (e: any) => {},
});
