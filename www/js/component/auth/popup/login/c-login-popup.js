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
// import Snackbar from '@material-ui/core/Snackbar';
import * as api from '../../api';
import style from './style.scss';
import {getLocalizedString, Locale} from '../../../locale/c-locale';
import type {LocaleType} from '../../../locale/reducer';
import {defaultShowEventName, shackBarErrorHandler, showSnackBar} from '../../../ui/notification/action';

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
    login: {current: null | HTMLInputElement},
    password: {current: null | HTMLInputElement},
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
            login: React.createRef(),
            password: React.createRef(),
        };
    }

    async onFormSubmit(evt: SyntheticEvent<EventTarget>) {
        evt.preventDefault();
        const view = this;
        const {node, props} = view;
        const {setUser: setUserAction, closeLoginPopup: closeLoginPopupAction, locale} = props;

        const loginValue = node.login.current === null ? '' : node.login.current.value;
        const passwordValue = node.password.current === null ? '' : node.password.current.value;
        const meData = await api.login(loginValue, passwordValue);

        if (meData.hasError) {
            console.error(`can not login with login: ${loginValue} and password: ${passwordValue}`);
            showSnackBar(<Locale stringKey="LOGIN_POPUP__LOGIN__ERROR"/>, {}, defaultShowEventName).catch(
                shackBarErrorHandler
            );
            return;
        }

        showSnackBar(<Locale stringKey="LOGIN_POPUP__LOGIN__SUCCESS"/>, {}, defaultShowEventName).catch(
            shackBarErrorHandler
        );

        setUserAction(meData.userData);
        closeLoginPopupAction();
    }

    handleFormSubmit = async (evt: SyntheticEvent<EventTarget>) => {
        const view = this;

        await view.onFormSubmit(evt);
    };

    render(): Node {
        const view = this;
        const {props} = view;
        const {auth, locale} = props;
        const {isOpen} = auth.popup[authConst.popupName.login];

        return (
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
                            inputRef={view.node.login}
                        />
                        <TextField
                            placeholder={getLocalizedString('LOGIN_POPUP__PASSWORD_PLACEHOLDER', locale.name)}
                            required
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            inputRef={view.node.password}
                        />
                    </fieldset>
                    <Button margin="normal" variant="contained" color="primary" type="submit">
                        <Locale stringKey="LOGIN_POPUP__LOGIN_BUTTON"/>
                    </Button>
                </form>
            </Dialog>
        );
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
