// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import Locale, {getLocalizedString} from '../../locale';
import type {LocaleType} from '../../locale/reducer';

type ReduxPropsType = {
    locale: LocaleType
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    // +passedProp: string
|};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        +children: Node
    }>>;

type StateType = {|
    +state: number
|};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

class BadgeForm extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0
        };
    }

    async updateSearch(searchString: string): Promise<void> {
        console.log('search', searchString);
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <form action="#">
                    <h1>search people panel</h1>

                    <input
                        onInput={(evt: SyntheticEvent<EventTarget>): Promise<void> =>
                            view.updateSearch(evt.currentTarget.value)
                        }
                        type="text"
                        placeholder={getLocalizedString('SEARCH_PEOPLE__INPUT_PLACEHOLDER', props.locale.name)}
                    />

                    <div>founded people result</div>

                    <textarea
                        id=""
                        cols="30"
                        rows="10"
                        placeholder={getLocalizedString('SEARCH_PEOPLE__TEXT_AREA_PLACEHOLDER', props.locale.name)}
                    />

                    <br/>
                    <br/>
                    <br/>

                    <button type="submit">
                        <Locale stringKey="SEARCH_PEOPLE__SUBMIT_BUTTON"/>
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        locale: state.locale
        // reduxProp: true
    }),
    reduxAction
)(BadgeForm);
