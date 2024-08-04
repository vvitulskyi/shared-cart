import { createContext } from "react";
import { IAppContext } from "@interfaces/index";

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;
