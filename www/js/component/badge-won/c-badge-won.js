// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app/reducer';
import type {ContextRouterType} from '../../../type/react-router-dom-v4';
import HalfPopup from '../ui/half-popup/c-half-popup';
import HalfPopupHeader from '../ui/half-popup/header/c-header';

type ReduxPropsType = {
    // +reduxProp: boolean
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        ...$Exact<ContextRouterType>,
        +children: Node
    }>>;

type StateType = {|
    +isShowMore: boolean
    // +state: number
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeWon extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isShowMore: false
        };
    }

    toggleIsShowMore() {
        const view = this;
        const {props, state} = view;

        view.setState({isShowMore: !state.isShowMore});
    }

    renderAuthor(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <h1>see the same playout in card</h1>
                <img src="http://via.placeholder.com/34x34" alt=""/>
                <h3>author name</h3>
                <p>badge date</p>
            </div>
        );
    }

    renderDescription(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <h3>description</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, magnam, nobis. Consequuntur
                    dolores enim harum laborum molestiae quae temporibus! Eum facilis quas similique? Aspernatur dolore
                    expedita nemo, optio quasi temporibus.
                </p>
            </div>
        );
    }

    renderPeopleList(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <h1>people list</h1>
                {[1, 2, 3].map(
                    (index: number): Node => {
                        return <div key={index}>{index}</div>;
                    }
                )}

                <button
                    type="button"
                    onClick={(): void => view.toggleIsShowMore()}
                    onKeyPress={(): void => view.toggleIsShowMore()}
                >
                    show more/less
                </button>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <HalfPopup>
                <HalfPopupHeader>
                    <img src="http://via.placeholder.com/34x34" alt=""/>
                    <span>badge name and badge image here</span>
                </HalfPopupHeader>
                {view.renderPeopleList()}
                {view.renderDescription()}
                {view.renderAuthor()}
            </HalfPopup>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        // reduxProp: true
    }),
    reduxAction
)(BadgeWon);
