// @flow

/* global window, setTimeout */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {defaultShowEventName} from './action';
import style from './notification.style.scss';
import {SnackBarWrapper} from './snack-bar-wrapper/c-snack-bar-wrapper';

const fadeTimeOut = 500;

const fadeClassNames = {
    enter: style.fade__enter,
    enterActive: style.fade__enter__active,
    exit: style.fade__exit,
};

export class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            refreshKey: 0,
        };
    }

    clean() {
        const {refreshKey} = this.state;

        // eslint-disable-next-line react/no-set-state
        this.setState({
            refreshKey: refreshKey + 1,
            list: [],
        });
    }

    handleEvent = ({detail}) => {
        if (detail.isHideAll === true) {
            return this.clean();
        }

        return detail.isShow ? this.addSnackBar(detail) : this.removeSnackBar(detail.id);
    };

    addSnackBar = detail => {
        const {state} = this;
        const {list} = state;

        const isAlreadyExists = Boolean(list.find(snackBarData => snackBarData.id === detail.id));

        if (isAlreadyExists) {
            console.log('Notification ---> Item already exists!');
            console.log(detail);
            return;
        }

        list.push(detail);

        // eslint-disable-next-line react/no-set-state
        this.setState({list});

        setTimeout(() => this.removeSnackBar(detail.id), detail.timer);
    };

    removeSnackBar = snackBarId => {
        const {state} = this;
        const {list} = state;

        const snackBar = list.find(snackBarData => snackBarData.id === snackBarId) || null;

        if (snackBar === null) {
            console.log('Notification ---> Item is NOT exists!');
            console.log(snackBarId);
            return;
        }

        list.splice(list.indexOf(snackBar), 1);

        // eslint-disable-next-line react/no-set-state
        this.setState({list});
    };

    bindEventListener() {
        const {props} = this;

        window.addEventListener(props.eventName || defaultShowEventName, this.handleEvent, false);
    }

    removeEventListener() {
        const {props} = this;

        window.removeEventListener(props.eventName || defaultShowEventName, this.handleEvent, false);
    }

    componentDidMount() {
        this.bindEventListener();
    }

    componentWillUnmount() {
        this.removeEventListener();
    }

    renderListItem = itemData => {
        return (
            <CSSTransition
                onExited={itemData.handleOnHide}
                key={itemData.id}
                timeout={fadeTimeOut}
                classNames={fadeClassNames}
            >
                <SnackBarWrapper>
                    <>
                        {itemData.content}
                        <IconButton
                            onClick={() => this.removeSnackBar(itemData.id)}
                            key="close"
                            color="inherit"
                            className={style.close_button}
                        >
                            <CloseIcon className={style.close_icon}/>
                        </IconButton>
                    </>
                </SnackBarWrapper>
            </CSSTransition>
        );
    };

    renderScreenDisable() {
        const {list} = this.state;

        const hasModelSnackBar = list.some(itemData => itemData.isModal);

        if (hasModelSnackBar === false) {
            return null;
        }

        return (
            <CSSTransition key="screen-disable" timeout={fadeTimeOut} classNames={fadeClassNames}>
                <div className={style.screen_disable}/>
            </CSSTransition>
        );
    }

    render() {
        const {list, refreshKey} = this.state;

        return (
            <Fragment key={refreshKey}>
                <TransitionGroup>{this.renderScreenDisable()}</TransitionGroup>
                <TransitionGroup className={style.list_wrapper}>{list.map(this.renderListItem)}</TransitionGroup>
            </Fragment>
        );
    }
}

/*
Notification.propTypes = {
    eventName: PropTypes.string
};
*/
