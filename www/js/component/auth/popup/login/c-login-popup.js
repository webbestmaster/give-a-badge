// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../../app/reducer';
import type {AuthType, UserType} from '../../reducer';
import type {SetPopupStateType, SetUserType} from '../../action';
import {closeLoginPopup, setUser} from '../../action';
import {authConst} from '../../const';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import * as api from '../../api';
import style from './style.scss';
import {getLocalizedString, Locale} from '../../../locale/c-locale';
import type {LocaleType} from '../../../locale/reducer';

type ReduxPropsType = {|
    auth: AuthType,
    locale: LocaleType,
|};

type ReduxActionType = {|
    +closeLoginPopup: () => SetPopupStateType,
    +setUser: (userData: UserType) => SetUserType,
|};

type PassedPropsType = {|
    // +passedProp: string
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...PassedPropsType, ...ReduxActionType, ...ReduxPropsType, +children?: Node}>;

type StateType = {|
    +snackbar: {|
        +isOpen: boolean,
        +isSuccess: boolean,
    |},
|};

const reduxAction: ReduxActionType = {
    closeLoginPopup,
    setUser,
};

type NodeType = {|
    login: HTMLInputElement | null,
    password: HTMLInputElement | null,
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
                isSuccess: false,
            },
        };

        view.node = {
            login: null,
            password: null,
        };
    }

    async onFormSubmit(evt: SyntheticEvent<EventTarget>) {
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

    handleOnSnackBarClick = () => {
        const view = this;
        const {state} = view;
        const {snackbar} = state;
        const {isSuccess} = snackbar;

        view.setShowSnackbar(false, isSuccess);
    };

    renderSnackBar(): Node {
        const view = this;
        const {props, state} = view;
        const {locale} = props;
        const {snackbar} = state;
        const {isSuccess, isOpen} = snackbar;

        const message = isSuccess ?
            getLocalizedString('LOGIN_POPUP__LOGIN__SUCCESS', locale.name) :
            getLocalizedString('LOGIN_POPUP__LOGIN__ERROR', locale.name);

        return (
            <Snackbar
                key="snackbar"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={isOpen}
                autoHideDuration={2e3}
                onClose={view.handleOnSnackBarClick}
                message={message}
            />
        );
    }

    handleFormSubmit = async (evt: SyntheticEvent<EventTarget>) => {
        const view = this;

        await view.onFormSubmit(evt);
    };

    defineLoginInput = (login: HTMLInputElement | null) => {
        const view = this;

        view.node.login = login;
    };

    definePasswordInput = (password: HTMLInputElement | null) => {
        const view = this;

        view.node.password = password;
    };

    render(): Node {
        const view = this;
        const {props} = view;
        const {auth, locale} = props;
        const {isOpen} = auth.popup[authConst.popupName.login];

        return [
            <Dialog key="dialog" open={isOpen} keepMounted>
                <form className={style.form} onSubmit={view.handleFormSubmit}>
                    <DialogTitle id="alert-dialog-slide-title">
                        <Locale stringKey="LOGIN_POPUP__HEADER"/>
                    </DialogTitle>
                    <fieldset className={style.login_fieldset}>
                        <TextField
                            placeholder={getLocalizedString('LOGIN_POPUP__LOGIN_PLACEHOLDER', locale.name)}
                            required
                            type="text"
                            autoComplete="current-password"
                            inputRef={view.defineLoginInput}
                        />
                        <TextField
                            placeholder={getLocalizedString('LOGIN_POPUP__PASSWORD_PLACEHOLDER', locale.name)}
                            required
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            inputRef={view.definePasswordInput}
                        />
                    </fieldset>
                    <Button margin="normal" variant="contained" color="primary" type="submit">
                        <Locale stringKey="LOGIN_POPUP__LOGIN_BUTTON"/>
                    </Button>
                </form>
            </Dialog>,
            view.renderSnackBar(),
        ];
    }
}

const ConnectedComponent = connect<ComponentType<LoginPopup>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        auth: state.auth,
        locale: state.locale,
    }),
    reduxAction
)(LoginPopup);

export {ConnectedComponent as LoginPopup};
