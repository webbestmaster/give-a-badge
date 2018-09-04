// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import Locale, {getLocalizedString} from '../../locale';
import type {LocaleType} from '../../locale/reducer';
import {searchUser} from './api';
import type {FoundedUserListType, FoundedUserType} from './api';

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
    +searchUserList: FoundedUserListType,
    +hasSearchInputFocus: boolean
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
            hasSearchInputFocus: false,
            searchUserList: []
        };
    }

    async updateSearch(searchString: string): Promise<void> {
        const view = this;
        // TODO: return minSearchStringLength to 3

        console.warn('TODO: return minSearchStringLength to 3');
        const minSearchStringLength = 1;

        if (searchString.length < minSearchStringLength) {
            view.setState({searchUserList: []});
            return;
        }

        const searchUserList = await searchUser(searchString);

        if (searchUserList === null) {
            view.setState({searchUserList: []});
            console.error('can not find users by query:', searchString);
            return;
        }

        view.setState({searchUserList});
    }

    renderSearchUserList(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <div>founded people result, input has focus: {state.hasSearchInputFocus ? 'y' : 'n'}</div>
                <div>{JSON.stringify(state.searchUserList)}</div>
            </div>
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <form action="#">
                    <h1>search people panel</h1>

                    <input
                        onFocus={() => {
                            view.setState({hasSearchInputFocus: true});
                        }}
                        onBlur={() => {
                            view.setState({hasSearchInputFocus: false});
                        }}
                        onInput={async (evt: SyntheticEvent<HTMLInputElement>): Promise<void> => {
                            await view.updateSearch(evt.currentTarget.value);
                        }}
                        type="text"
                        placeholder={getLocalizedString('SEARCH_PEOPLE__INPUT_PLACEHOLDER', props.locale.name)}
                    />

                    {view.renderSearchUserList()}

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
