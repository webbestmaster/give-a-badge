// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../../app-reducer';
import type {AuthType, UserType} from '../../reducer';
import {closeLoginPopup, setUser} from '../../action';
import type {SetPopupStateType, SetUserType} from '../../action';
import {authConst} from '../../const';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import * as api from '../../api';
import style from './style.scss';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Locale from '../../../locale';

// import style from './style.scss';

type ReduxPropsType = {|
    auth: AuthType
|};

type ReduxActionType = {|
    +closeLoginPopup: () => SetPopupStateType,
    +setUser: (userData: UserType) => SetUserType
|};

type PassedPropsType = {|
    // +passedProp: string
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxActionType, ...ReduxPropsType, +children?: Node}>;

type StateType = {|
    +snackbar: {|
        +isOpen: boolean,
        +isSuccess: boolean
    |}
|};

const reduxAction: ReduxActionType = {
    closeLoginPopup,
    setUser
};

type NodeType = {|
    login: HTMLInputElement | null,
    password: HTMLInputElement | null
|};

class LoginPopup extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;
    node: NodeType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            snackbar: {
                isOpen: false,
                isSuccess: false
            }
        };

        view.node = {
            login: null,
            password: null
        };
    }

    async onFormSubmit(evt: SyntheticEvent<EventTarget>): Promise<void> {
        evt.preventDefault();
        const view = this;
        const {node, props} = view;
        const {setUser: setUserAction, closeLoginPopup: closeLoginPopupAction} = props;

        const loginValue = node.login === null ? '' : node.login.value;
        const passwordValue = node.password === null ? '' : node.password.value;
        const meData = await api.login(loginValue, passwordValue);

        if (meData.hasError) {
            console.error(`can not login with login: ${loginValue} and password: ${passwordValue}`);
            view.setShowSnackbar(true, false);
            return;
        }

        view.setShowSnackbar(true, true);
        setUserAction(meData.userData);
        closeLoginPopupAction();
    }

    setShowSnackbar(isOpen: boolean, isSuccess: boolean) {
        const view = this;
        const {state} = view;

        view.setState({snackbar: {...state.snackbar, isOpen, isSuccess}});
    }

    renderSnackBar(): Node {
        const view = this;
        const {props, state} = view;
        const snackbarIsOpen = state.snackbar.isOpen;

        return (
            <Snackbar
                key="snackbar"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={snackbarIsOpen}
                autoHideDuration={6000}
                onClose={() => {
                    view.setShowSnackbar(false, false);
                }}
                message={state.snackbar.isSuccess ? '%Yes%' : '%No%'}
            />
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;
        const {auth} = props;
        const {isOpen} = auth.popup[authConst.popupName.login];

        return [
            <Dialog
                key="dialog"
                open={isOpen}
                // transition={Transition}
                keepMounted
                // onClose={() => {
                //     view.leaveGame();
                // }}
                // onClick={() => {
                //     view.leaveGame();
                // }}
                // aria-labelledby="alert-dialog-slide-title"
                // aria-describedby="alert-dialog-slide-description"
            >
                <form
                    className={style.form}
                    onSubmit={async (evt: SyntheticEvent<EventTarget>): Promise<void> => await view.onFormSubmit(evt)}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {/* <Locale stringKey="SPACE"/> */}
                        %Login%
                    </DialogTitle>
                    <TextField
                        placeholder="%Login%"
                        required
                        type="text"
                        autoComplete="current-password"
                        inputRef={(login: HTMLInputElement | null) => {
                            view.node.login = login;
                        }}
                    />
                    <TextField
                        placeholder="%Password%"
                        required
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        inputRef={(password: HTMLInputElement | null) => {
                            view.node.password = password;
                        }}
                    />
                    <br/>
                    <Button margin="normal" variant="contained" color="primary" type="submit">
                        {/* <Locale stringKey="SPACE"/> */}
                        %login%
                    </Button>
                </form>
            </Dialog>,
            view.renderSnackBar()
        ];
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth
    }),
    reduxAction
)(LoginPopup);
