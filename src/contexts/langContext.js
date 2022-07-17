import { createContext, useState, useContext } from "react";
const langContext = createContext("EN");
export const useLang = () => {
  return useContext(langContext);
};
const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("EN");
  return (
    <langContext.Provider value={[lang, setLang]}>
      {children}
    </langContext.Provider>
  );
};

export const languages = {
  EN: {
    signoutConfirmMsg: "Are you sure you want to signout?",
    signOut: "Signout",
    cancel: "Cancel",
    welcome: "Welcome",
  },
  AR: {
    signoutConfirmMsg: "هل انت متأكد من تسجيل الخروج؟",
    signOut: "تسجيل الخروج",
    cancel: "الغاء",
    welcome: "اهلا",
  },
};

export default LangProvider;
