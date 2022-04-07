import {actions} from './ActionTypes'

export const add_user = (useruid, name, email) => {
    return {
        type: actions.ADD_USER,
        useruid : useruid,
        name : name,
        email : email
    }
}

export const initialize = (users, userid) => {
    return {
        type: actions.INITIALIZE,
        value: users,
        userid: userid
    }
}

export const updateuser = (userid, precent, name) => {

    if ( name === "Intro"){
        return {
            type: actions.UPDATE_USER_INTRO,
            userid: userid,
            name : name,
            precent : precent
        }
    }else if ( name === "Overall_Basics"){
        return {
            type: actions.UPDATE_USER_OVERALL_BASICS,
            userid: userid,
            name : name,
            precent : precent
        }
    }
    else {
        return {
            type: actions.UPDATE_USER_OTHERS,
            userid: userid,
            name : name,
            precent : precent
        }
    }

        
}

export const createData = (userid) => {

    return{
        type: actions.CREATE_DATA,
        userid:userid
        
    }
}

