import React, {createContext, useState} from 'react';

export const Datas = createContext();

export const DataProvider = (props) =>{
    const [emailerror, setemailerror] = useState("");
    const [passerror, setpasserror] = useState("");
    const [login, setLogin] = useState(true);
    const [trigger , setTrigger ] = useState(true)
    const [number, setnumber] = useState();
    const [userid, setUserid] = useState();
    const [allusers, setAllusers] = useState();

    return(
         <>
            <Datas.Provider value={{allusers, setAllusers, userid, setUserid, emailerror, setemailerror, passerror, setpasserror, login, setLogin, number, setnumber, trigger , setTrigger  }} >
                {props.children}
            </Datas.Provider>
         </>
     );
}