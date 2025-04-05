import { createContext, useReducer, ReactNode } from 'react';


type State = {
    currentUser: any;
    isSideNavClosed: boolean;
};

type Action = {
    type: string;
    payload: any;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
    currentUser: null,
    isSideNavClosed: false
};

export const GlobalContext = createContext<{ state: State; dispatch: Dispatch }>({
    state: initialState,
    dispatch: () => {}
});

export const updateContextReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };

        case 'TOGGLE_SIDE_NAV':
            return {
                ...state,
                isSideNavClosed: action.payload
            };

        default:
            return state;
    }
};

type Props = {
    children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(updateContextReducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
