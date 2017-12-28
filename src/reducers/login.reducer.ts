import { LoginActionTypes, LoginActions } from '../actions/login.action';

export interface IState {
    displayName: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: any;
}

const initialState: IState = {
    displayName: '',
    error: null,
    isAuthenticated: false,
    isAuthenticating: false,
};

export function reducer(
    state = initialState,
    action: LoginActions,
): IState {
    switch (action.type) {
        case LoginActionTypes.ClearError: {
            return {
                ...state,
                error: null,
            };
        }

        case LoginActionTypes.GoogleAuthentication: {
            return {
                ...state,
                isAuthenticating: true,
            };
        }

        case LoginActionTypes.RestoreAuthentication: {
            return {
                ...state,
                displayName: makeDisplayName(action.payload),
                isAuthenticated: true,
                isAuthenticating: false,
            };
        }

        case LoginActionTypes.Logout: {
            return {
                ...state,
                displayName: '',
                isAuthenticated: false,
                isAuthenticating: false,
            };
        }

        case LoginActionTypes.AnonymousAuthentication:
        case LoginActionTypes.BeginAuthentication:
        case LoginActionTypes.CreateUser:
        case LoginActionTypes.EmailAuthentication: {
            return {
                ...state,
                error: null,
                isAuthenticating: true,
            };
        }

        case LoginActionTypes.AnonymousAuthenticationFailure:
        case LoginActionTypes.CreateUserFailure:
        case LoginActionTypes.EmailAuthenticationFailure: {
            return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
                isAuthenticating: false,
            };
        }

        default: {
            return state;
        }
    }
}

function makeDisplayName(user: {
    isAnonymous: boolean;
    displayName: string | null,
    email: string | null,
}) {
    if (user.isAnonymous) { return 'Anonymous'; }

    if (user.displayName) { return user.displayName; }

    if (user.email) { return user.email; }
    return '';
}

// =========
// Selectors
// =========
export const getDisplayName = (state: IState) => state.displayName;
export const getError = (state: IState) => state.error;
export const getIsAuthenticated = (state: IState) => state.isAuthenticated;
export const getIsAuthenticating = (state: IState) => state.isAuthenticating;

/*
let lastState: IState;
export const getError = (state: IState) => {
    console.log('getError>', state);
    console.log('counterB:Projector called, parameter changed: ', !(lastState === state));
    lastState = state;
    return state.error;
};
*/
