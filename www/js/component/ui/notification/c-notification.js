// @flow

/* eslint consistent-this: ["error", "view"] */

/* global window, setTimeout */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import style from './notification.style.scss';
import {SnackBarWrapper} from './snack-bar-wrapper/c-snack-bar-wrapper';
import type {ShowSnackBarDetailType, SnackBarDetailType} from './action';

type PassedPropsType = {|
    +eventName: string,
|};

type PropsType = {|
    ...PassedPropsType,
|};

type StateType = {|
    +list: Array<ShowSnackBarDetailType>,
    +refreshKey: number,
|};

const fadeTimeOut = 500;

const fadeClassNames = {
    enter: style.fade__enter,
    enterActive: style.fade__enter__active,
    exit: style.fade__exit,
};

export class Notification extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            list: [],
            refreshKey: 0,
        };
    }

    clean() {
        const view = this;
        const {state} = view;
        const {refreshKey} = state;

        // eslint-disable-next-line react/no-set-state
        view.setState({
            refreshKey: refreshKey + 1,
            list: [],
        });
    }

    handleEvent = (evt: {detail: SnackBarDetailType}) => {
        const view = this;

        const {detail} = evt;

        if (detail.isHideAll === true) {
            view.clean();
            return;
        }

        if (detail.isShow === true) {
            view.addSnackBar(detail);
        } else {
            view.removeSnackBar(detail.id);
        }
    };

    addSnackBar = (detail: ShowSnackBarDetailType) => {
        const view = this;
        const {state} = view;
        const {list} = state;

        const isAlreadyExists = Boolean(
            list.find((snackBarData: ShowSnackBarDetailType): boolean => snackBarData.id === detail.id)
        );

        if (isAlreadyExists) {
            console.log('Notification ---> Item already exists!');
            console.log(detail);
            return;
        }

        list.push(detail);

        // eslint-disable-next-line react/no-set-state
        view.setState({list});

        setTimeout((): void => view.removeSnackBar(detail.id), detail.timer);
    };

    removeSnackBar = (snackBarId: string | number) => {
        const view = this;
        const {state} = view;
        const {list} = state;

        const snackBar =
            list.find((snackBarData: ShowSnackBarDetailType): boolean => snackBarData.id === snackBarId) || null;

        if (snackBar === null) {
            console.log('Notification ---> Item is NOT exists!');
            console.log(snackBarId);
            return;
        }

        list.splice(list.indexOf(snackBar), 1);

        // eslint-disable-next-line react/no-set-state
        view.setState({list});
    };

    bindEventListener() {
        const view = this;
        const {props} = view;

        window.addEventListener(props.eventName, view.handleEvent, false);
    }

    removeEventListener() {
        const view = this;
        const {props} = view;

        window.removeEventListener(props.eventName, view.handleEvent, false);
    }

    componentDidMount() {
        const view = this;

        view.bindEventListener();
    }

    componentWillUnmount() {
        const view = this;

        view.removeEventListener();
    }

    createRemoveShackBarHandler(itemData: ShowSnackBarDetailType): () => void {
        const view = this;

        return (): void => view.removeSnackBar(itemData.id);
    }

    renderListItemContent(itemData: ShowSnackBarDetailType): Node {
        const view = this;

        return (
            <>
                {itemData.content}
                <IconButton
                    onClick={view.createRemoveShackBarHandler(itemData)}
                    key="close"
                    color="inherit"
                    className={style.close_button}
                >
                    <CloseIcon className={style.close_icon}/>
                </IconButton>
            </>
        );
    }

    renderListItem = (itemData: ShowSnackBarDetailType): Node => {
        const view = this;

        return (
            <CSSTransition
                onExited={itemData.handleOnHide}
                key={itemData.id}
                timeout={fadeTimeOut}
                classNames={fadeClassNames}
            >
                <SnackBarWrapper>{view.renderListItemContent(itemData)}</SnackBarWrapper>
            </CSSTransition>
        );
    };

    renderScreenDisable(): Node {
        const view = this;
        const {state} = view;
        const {list} = state;

        const hasModelSnackBar = list.some((itemData: ShowSnackBarDetailType): boolean => itemData.isModal);

        if (hasModelSnackBar === false) {
            return null;
        }

        return (
            <CSSTransition key="screen-disable" timeout={fadeTimeOut} classNames={fadeClassNames}>
                <div className={style.screen_disable}/>
            </CSSTransition>
        );
    }

    render(): Node {
        const view = this;
        const {state} = view;
        const {list, refreshKey} = state;

        return (
            <Fragment key={refreshKey}>
                <TransitionGroup>{view.renderScreenDisable()}</TransitionGroup>
                <TransitionGroup className={style.list_wrapper}>{list.map(view.renderListItem)}</TransitionGroup>
            </Fragment>
        );
    }
}

/*
Notification.propTypes = {
    eventName: PropTypes.string
};
*/
