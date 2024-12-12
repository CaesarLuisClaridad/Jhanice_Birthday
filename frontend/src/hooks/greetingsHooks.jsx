import { useContext } from "react";
import { greetingsContext } from "../context/greetingsContext";

export const UseGreetingsContext = () => {
    const context = useContext(greetingsContext);

    if(!context){
        throw Error("UseGreetingsContext must use inside a GreetingsContext")
    }

    return context;
}