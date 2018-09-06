// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../../app-reducer';
import Locale, {getLocalizedString} from '../../locale';
import type {LocaleType} from '../../locale/reducer';
import type {AuthType} from '../../auth/reducer';
import {badgeAssign, searchUser} from './api';
import type {FoundedUserListType, FoundedUserType} from './api';
import FoundedUser from './founded-user';
import Transition from 'react-transition-group/Transition';
import type {TransitionStatus} from 'react-transition-group';

type ReduxPropsType = {
    +locale: LocaleType,
    +auth: AuthType
};

type ReduxActionType = {
    // +setSmth: (smth: string) => string
};

type PassedPropsType = {|
    +badgeId: string
    // +passedProp: string
|};

type PropsType = $ReadOnly<$Exact<{
        ...$Exact<PassedPropsType>,
        ...$Exact<ReduxPropsType>,
        ...$Exact<ReduxActionType>,
        +children: Node
    }>>;

type StateType = {|
    +isAllComponentLoaded: boolean,
    +snackbar: {|
        +isOpen: boolean,
        +isSuccess: boolean
    |},
    +searchString: string,
    +descriptionText: string,
    +searchUserList: FoundedUserListType,
    +selectedUserList: FoundedUserListType,
    +hasSearchInputFocus: boolean
|};

type ComponentStoreType = {|
    Snackbar: null | Component
|};

const componentStore: ComponentStoreType = {
    Snackbar: null
};

const reduxAction: ReduxActionType = {
    // setSmth // imported from actions
};

const searchData = {
    transition: {
        duration: 1000
    },
    style: {
        initial: {
            transition: 'opacity 1000ms ease-in-out',
            opacity: 0
        },
        transition: {
            entering: {opacity: 0},
            entered: {opacity: 1},
            exiting: {opacity: 1},
            exited: {opacity: 0},
            unmounted: {display: 'none'}
        }
    }
};

// TODO: return MIN_SEARCH_STRING_LENGTH to 3
console.warn('TODO: return MIN_SEARCH_STRING_LENGTH to 3');
// eslint-disable-next-line id-match
const MIN_SEARCH_STRING_LENGTH = 1;

class BadgeForm extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isAllComponentLoaded: false,
            snackbar: {
                isOpen: false,
                isSuccess: false
            },
            searchString: '',
            descriptionText: '',
            hasSearchInputFocus: false,
            searchUserList: [],
            selectedUserList: []
        };
    }

    async loadAllComponent(): Promise<void> {
        const view = this;
        const {state} = view;

        if (state.isAllComponentLoaded) {
            return;
        }

        const SnackbarRequire = await import('@material-ui/core/Snackbar');

        componentStore.Snackbar = SnackbarRequire.default;

        view.setState({isAllComponentLoaded: true});
    }

    async updateSearch(inputSearchString: string): Promise<void> {
        const view = this;

        view.setState({searchString: inputSearchString});

        // eslint-disable-next-line id-match
        if (inputSearchString.length < MIN_SEARCH_STRING_LENGTH) {
            view.setState({searchUserList: []});
            return;
        }

        const searchUserList = await searchUser(inputSearchString);

        // get actual state here
        const {state} = view;
        const {searchString} = state;

        if (searchString !== inputSearchString) {
            console.log('---> search result is not actualized', searchString, inputSearchString);
            return;
        }

        if (searchUserList === null) {
            view.setState({searchUserList: []});
            console.error('can not find users by query:', inputSearchString);
            return;
        }

        view.setState({searchUserList});
    }

    updateDescription(descriptionText: string) {
        const view = this;

        view.setState({descriptionText});
    }

    async submitForm(): Promise<void> {
        const view = this;
        const {props, state} = view;
        const {selectedUserList, descriptionText} = state;
        const {badgeId, auth} = props;

        console.log('---> submit form');
        console.log(selectedUserList, descriptionText, badgeId);

        const resultBadgeAssign = await badgeAssign({
            assignerId: auth.user.id,
            badgeId: parseInt(badgeId, 10),
            comment: descriptionText,
            tags: [],
            usersIds: selectedUserList.map((foundedUser: FoundedUserType): number => foundedUser.id)
        });

        if (resultBadgeAssign === null) {
            console.error('error with resultBadgeAssign');
            view.setShowSnackbar(true, false);
            return;
        }

        console.log('badge assigned');
        console.log(resultBadgeAssign);
        view.setShowSnackbar(true, true);
    }

    setShowSnackbar(isOpen: boolean, isSuccess: boolean) {
        const view = this;
        const {state} = view;

        view.setState({snackbar: {...state.snackbar, isOpen, isSuccess}});
    }

    getFromSelectedUserById(userId: number): FoundedUserType | null {
        const view = this;
        const {props, state} = view;
        const {selectedUserList} = state;

        return selectedUserList.find((userInList: FoundedUserType): boolean => userInList.id === userId) || null;
    }

    isInSelectedUserList(userId: number): boolean {
        const view = this;

        return Boolean(view.getFromSelectedUserById(userId));
    }

    addToSelectedUserList(user: FoundedUserType) {
        const view = this;
        const {props, state} = view;
        const {selectedUserList} = state;

        if (view.isInSelectedUserList(user.id)) {
            console.error('can not add the same user twice');
            return;
        }

        selectedUserList.push(user);

        view.setState(state);
    }

    removeFromSelectedUserList(user: FoundedUserType) {
        const view = this;
        const {props, state} = view;
        const {selectedUserList} = state;

        const userInList = view.getFromSelectedUserById(user.id);

        if (userInList === null) {
            console.error('can not remove the same, user not exist is selectedUserList');
            return;
        }

        const userIndex = selectedUserList.indexOf(userInList);

        selectedUserList.splice(userIndex, 1);

        view.setState(state);
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity
    renderSearchUserList(): Node {
        const view = this;
        const {props, state} = view;
        const {searchUserList, searchString, hasSearchInputFocus} = state;
        const searchUserListLength = searchUserList.length;

        // eslint-disable-next-line id-match
        if (searchString.length < MIN_SEARCH_STRING_LENGTH) {
            return null;
        }

        if (searchUserListLength === 0 && hasSearchInputFocus) {
            return (
                <div>
                    <p>
                        <Locale stringKey="SEARCH_PEOPLE__NO_RESULT"/>
                    </p>
                    <p>{searchString}</p>
                </div>
            );
        }

        return (
            <Transition in={hasSearchInputFocus} timeout={searchData.transition.duration}>
                {(transitionState: TransitionStatus): Node => {
                    return (
                        <div style={{...searchData.style.initial, ...searchData.style.transition[transitionState]}}>
                            <div>founded people result, input has focus: {hasSearchInputFocus ? 'y' : 'n'}</div>
                            {searchUserList.map(
                                (foundedUser: FoundedUserType): Node => {
                                    const foundedUserId = foundedUser.id;
                                    const isInSelectedUserList = view.isInSelectedUserList(foundedUserId);

                                    return (
                                        <FoundedUser
                                            onClick={(): void => {
                                                return isInSelectedUserList ?
                                                    view.removeFromSelectedUserList(foundedUser) :
                                                    view.addToSelectedUserList(foundedUser);
                                            }}
                                            isActive={!isInSelectedUserList}
                                            foundedUser={foundedUser}
                                            key={foundedUserId}
                                        />
                                    );
                                }
                            )}
                        </div>
                    );
                }}
            </Transition>
        );
    }

    renderSelectedUserList(): Node {
        const view = this;
        const {props, state} = view;
        const {selectedUserList} = state;

        return (
            <div>
                <h1>selected user list</h1>
                <div>
                    {selectedUserList.map(
                        (foundedUser: FoundedUserType): Node => {
                            return (
                                <button
                                    type="button"
                                    onClick={(): void => view.removeFromSelectedUserList(foundedUser)}
                                    onKeyPress={(): void => view.removeFromSelectedUserList(foundedUser)}
                                    key={foundedUser.id}
                                >
                                    <img src={foundedUser.imageUrl} alt={foundedUser.name}/>
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }

    renderSnackBar(): Node {
        const view = this;
        const {props, state} = view;
        const {Snackbar} = componentStore;
        const snackbarIsOpen = state.snackbar.isOpen;

        if (snackbarIsOpen) {
            view.loadAllComponent()
                .then((): void => console.log('all component loaded'))
                .catch(
                    (error: Error): Error => {
                        console.error('error  with load component');
                        console.error(error);

                        return error;
                    }
                );
        }

        if (Snackbar === null) {
            return null;
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={snackbarIsOpen}
                autoHideDuration={6000}
                onClose={() => {
                    view.setState({snackbar: {...state.snackbar, isOpen: false}});
                }}
                message={state.snackbar.isSuccess ? 'Yes' : 'No'}
            />
        );
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div>
                <form
                    onSubmit={async (evt: SyntheticEvent<HTMLFormElement>): Promise<void> => {
                        evt.preventDefault();
                        await view.submitForm();
                    }}
                >
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
                    {view.renderSelectedUserList()}

                    <textarea
                        onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                            view.updateDescription(evt.currentTarget.value);
                        }}
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

                {view.renderSnackBar()}
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        locale: state.locale,
        auth: state.auth
        // reduxProp: true
    }),
    reduxAction
)(BadgeForm);
