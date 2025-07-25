import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props)=>{ 

    const currency = '$';

    const calculteAge = (dob)=>{
        const today = new Date();
        const birthday = new Date(dob);

        let age = today.getFullYear() - birthday.getFullYear();

        return age;
    }

    const months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
    const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_');
    return dateArray[0]+" "+months[Number(dateArray[1])] +" "+ dateArray[2];
  }

    const value = {
        calculteAge,currency,
        slotDateFormat
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContextProvider