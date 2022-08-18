import {
    createStore
} from "redux";

const intialState = {
    savatcha: [],
};
export const DEL2 = (id) => {
    return {
        type:"DEL2",
        pyload: id
    }
}

const reduceFunc = (state = intialState, action) => {

    
    switch (action.type) {
        case "ADD_PRO":
            let newSavatcha = state.savatcha;
            newSavatcha.push(action.payload);
            return {
                ...state, savatcha: newSavatcha
            };

        case "DEL":
            const resSavatcha = state.savatcha.filter((val) => {
                return val.id !== action.payload.id;
              });
              return { ...state, savatcha: resSavatcha };

              case "DEL2":
                const datafav = state.savatcha.filter((savatcha) => savatcha !== action.pyload);
                return {
                    ...state,
                    savatcha: datafav,
                };
            case  "CLEAR":

            return {...state, savatcha: []}
        default:
            break;
    }
};

const store = createStore(reduceFunc);

export default store;