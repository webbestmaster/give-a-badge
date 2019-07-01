// @flow

/* eslint consistent-this: ["error", "view"] */

import Transition from 'react-transition-group/Transition';

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import type {TransitionStatus} from 'react-transition-group';
import withRouter from 'react-router-dom/withRouter';

import serviceStyle from '../../../../css/service.scss';
import type {SystemType} from '../../system/reducer/root';
import type {LocaleType} from '../../locale/reducer';
import {getLocalizedString, Locale} from '../../locale/c-locale';
import type {GlobalStateType} from '../../../app/reducer';
import type {ContextRouterType} from '../../../../type/react-router-dom-v4';
import {routes} from '../../app/routes';
import type {GetNewsListType} from '../../title-card-list/api';
import * as api from '../../title-card-list/api';
import type {TitleNewsListType} from '../../title-card-list/reducer';
import {pageSize} from '../../title-card-list/c-title-card-list';
import type {ApplyGetNewListResponseType} from '../../title-card-list/action';
import {applyGetNewListResponse} from '../../title-card-list/action';
import {defaultShowEventName, hideAllSnackBars, shackBarErrorHandler, showSnackBar} from '../../ui/notification/action';
import type {BadgeType} from '../../badge-category-list/api';
import {isNumber} from '../../../lib/is';

import foundedUserStyle from './founded-user/style.scss';
import style from './style.scss';
import {FoundedUser} from './founded-user/c-founded-user';
import type {FoundedUserListType, FoundedUserType} from './api';
import {badgeAssign, searchUser} from './api';

type ReduxPropsType = {
    +locale: LocaleType,
    +titleNewsList: TitleNewsListType,
    +system: SystemType,
};

type ReduxActionType = {|
    +applyGetNewListResponse: (getNewsListResponse: GetNewsListType, inBegin: boolean) => ApplyGetNewListResponseType,
|};

type PassedPropsType = {|
    +badgeInfo: BadgeType,
    // +passedProp: string
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    ...$Exact<ReduxPropsType>,
    ...$Exact<ReduxActionType>,
    ...$Exact<ContextRouterType>,
    +children: Node,
}>;

type StateType = {|
    // +snackbar: {|
    //     +isOpen: boolean,
    //     +isSuccess: boolean,
    // |},
    +searchString: string,
    +descriptionText: string,
    +searchUserList: FoundedUserListType,
    +selectedUserList: FoundedUserListType,
    +hasSearchInputFocus: boolean,
    +isSearchInProgressCounter: number,
|};

type NodeType = {|
    search: {|
        input: {current: null | HTMLInputElement},
    |},
|};

const reduxAction: ReduxActionType = {
    applyGetNewListResponse,
};

const transitionDuration = 150;

const searchData = {
    transition: {
        duration: transitionDuration,
    },
    style: {
        initial: {
            transition: `opacity ${transitionDuration}ms ease-in-out`,
            opacity: 0,
        },
        transition: {
            entering: {opacity: 0, display: 'block'},
            entered: {opacity: 1, display: 'block'},
            exiting: {opacity: 1, display: 'block'},
            exited: {opacity: 0, display: 'none'},
            unmounted: {display: 'none'},
        },
    },
};

// TODO: return MIN_SEARCH_STRING_LENGTH to 3
console.warn('TODO: return MIN_SEARCH_STRING_LENGTH to 3');
// eslint-disable-next-line id-match
const MIN_SEARCH_STRING_LENGTH = 1;

class BadgeForm extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            // snackbar: {
            //     isOpen: false,
            //     isSuccess: false
            // },
            searchString: '',
            descriptionText: '',
            hasSearchInputFocus: false,
            searchUserList: [],
            selectedUserList: [],
            isSearchInProgressCounter: 0,
        };

        view.node = {
            search: {
                input: React.createRef(),
            },
        };
    }

    state: StateType;

    props: PropsType;
    node: NodeType;

    async fetchNews() {
        const view = this;
        const {props} = view;
        const {applyGetNewListResponse: applyGetNewListResponseAction} = props;

        const getNewsListResponse = await api.getNewsList(0, pageSize);

        if (getNewsListResponse === null) {
            console.error('can not get news list');
            return;
        }

        applyGetNewListResponseAction(getNewsListResponse, true);
    }

    isSubmitActive(): boolean {
        const view = this;
        const {state} = view;
        const {descriptionText, selectedUserList} = state;
        const minDescriptionSize = 2;

        return Boolean(descriptionText.trim().length >= minDescriptionSize && selectedUserList.length > 0);
    }

    async updateSearch(inputSearchString: string) {
        const view = this;

        view.setState({searchString: inputSearchString});

        // eslint-disable-next-line id-match
        if (inputSearchString.length < MIN_SEARCH_STRING_LENGTH) {
            view.setState({searchUserList: []});
            return;
        }

        view.setState({isSearchInProgressCounter: view.state.isSearchInProgressCounter + 1});

        const searchUserList = await searchUser(inputSearchString);

        view.setState({isSearchInProgressCounter: view.state.isSearchInProgressCounter - 1});

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

    async submitForm() {
        const view = this;
        const {props, state} = view;
        const {selectedUserList, descriptionText} = state;
        const {badgeInfo} = props;
        const badgeId = badgeInfo.id;

        console.log('---> submit form');
        console.log(selectedUserList, descriptionText, badgeId);

        const resultBadgeAssign = await badgeAssign({
            badgeId: parseInt(badgeId, 10),
            comment: descriptionText,
            tags: [],
            usersIds: selectedUserList.map((foundedUser: FoundedUserType): number => foundedUser.id),
        });

        if (resultBadgeAssign === null) {
            console.error('error with resultBadgeAssign');
            view.setShowSnackbar(true, false);
            return;
        }

        view.fetchNews()
            .then((): void => console.log('success fetch news after badge assign'))
            .catch((error: Error): Error => {
                console.error('Can NOT fetch news after badge assign');
                console.error(error);
                return error;
            });

        console.log('badge assigned');
        console.log(resultBadgeAssign);
        view.setShowSnackbar(true, true);
    }

    setShowSnackbar(isOpen: boolean, isSuccess: boolean) {
        const view = this;
        const {props} = view;

        hideAllSnackBars(defaultShowEventName);

        if (isOpen === false) {
            return;
        }

        if (isSuccess === false) {
            showSnackBar(
                <Locale stringKey="SNACK_BAR__GIVE_BADGE__ERROR"/>,
                {isModal: true},
                defaultShowEventName
            ).catch(shackBarErrorHandler);
            return;
        }

        showSnackBar(<Locale stringKey="SNACK_BAR__GIVE_BADGE__SUCCESS"/>, {isModal: true}, defaultShowEventName)
            .then((): mixed => props.history.push(routes.index.index))
            .catch(shackBarErrorHandler);
    }

    getFromSelectedUserById(userId: number): FoundedUserType | null {
        const view = this;
        const {state} = view;
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

    clearSearchInput() {
        const view = this;
        const {node} = view;
        const searchInput = node.search.input.current;

        view.setState({searchString: ''});

        if (searchInput === null) {
            console.log('searchInput is null');
            return;
        }

        searchInput.value = '';
    }

    removeFromSelectedUserList(user: FoundedUserType) {
        const view = this;
        const {state} = view;
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

    createHandleOnClickUser(isInSelectedUserList: boolean, foundedUser: FoundedUserType): () => void {
        const view = this;

        return () => {
            if (isInSelectedUserList) {
                view.removeFromSelectedUserList(foundedUser);
                return;
            }

            view.addToSelectedUserList(foundedUser);
            view.clearSearchInput();
        };
    }

    // eslint-disable-next-line sonarjs/cognitive-complexity, complexity
    renderSearchUserList(): Node {
        const view = this;
        const {props, state} = view;
        const {searchUserList, searchString, hasSearchInputFocus, isSearchInProgressCounter} = state;
        const searchUserListLength = searchUserList.length;

        if (searchUserList.length === 0 && isSearchInProgressCounter !== 0) {
            return null;
        }

        // eslint-disable-next-line id-match
        if (searchString.length < MIN_SEARCH_STRING_LENGTH) {
            return null;
        }

        if (searchUserListLength === 0 && hasSearchInputFocus) {
            return (
                <div className={style.no_found_people}>
                    <Locale stringKey="SEARCH_PEOPLE__NO_RESULT"/>
                </div>
            );
        }

        return (
            <Transition in={hasSearchInputFocus} timeout={searchData.transition.duration}>
                {(transitionState: TransitionStatus): Node => {
                    return (
                        <div
                            className={classNames(style.founded_user_list)}
                            style={{...searchData.style.initial, ...searchData.style.transition[transitionState]}}
                        >
                            {searchUserList.map((foundedUser: FoundedUserType): Node => {
                                const foundedUserId = foundedUser.id;
                                const isInSelectedUserList = view.isInSelectedUserList(foundedUserId);

                                return (
                                    <FoundedUser
                                        className={isInSelectedUserList ? foundedUserStyle.already_selected : ''}
                                        foundedUser={foundedUser}
                                        isActive={!isInSelectedUserList}
                                        key={foundedUserId}
                                        onClick={view.createHandleOnClickUser(isInSelectedUserList, foundedUser)}
                                    />
                                );
                            })}
                        </div>
                    );
                }}
            </Transition>
        );
    }

    createHandlerForRemoveFromSelectedUserList = (foundedUser: FoundedUserType): (() => void) => {
        return () => {
            const view = this;

            view.removeFromSelectedUserList(foundedUser);
        };
    };

    renderSelectedUserList(): Node {
        const view = this;
        const {props, state} = view;
        const {selectedUserList} = state;

        if (selectedUserList.length === 0) {
            return <div className={style.selected_user_list__empty} key="selected-user-list"/>;
        }

        return (
            <div className={style.selected_user_list} key="selected-user-list">
                {selectedUserList.map((foundedUser: FoundedUserType): Node => {
                    return (
                        <button
                            className={style.selected_user_wrapper}
                            key={foundedUser.id}
                            onClick={view.createHandlerForRemoveFromSelectedUserList(foundedUser)}
                            onKeyPress={view.createHandlerForRemoveFromSelectedUserList(foundedUser)}
                            type="button"
                        >
                            <div className={style.remove_face_icon}/>
                            <div
                                className={style.selected_user_image}
                                style={{backgroundImage: `url('${foundedUser.imageUrl}')`}}
                                title={foundedUser.name}
                            />
                        </button>
                    );
                })}
            </div>
        );
    }

    handleSubmitForm = async (evt: SyntheticEvent<HTMLFormElement>) => {
        const view = this;

        evt.preventDefault();

        if (view.isSubmitActive()) {
            await view.submitForm();
        }
    };

    handleSearchInputOnFocus = () => {
        const view = this;

        view.setState({hasSearchInputFocus: true});
    };

    handleSearchInputOnBlur = () => {
        const view = this;

        view.setState({hasSearchInputFocus: false});
    };

    handleSearchInputOnInput = async (evt: SyntheticEvent<HTMLInputElement>) => {
        const view = this;

        await view.updateSearch(evt.currentTarget.value);
    };

    handleTextAreaOnInput = (evt: SyntheticEvent<HTMLInputElement>) => {
        const view = this;

        view.updateDescription(evt.currentTarget.value);
    };

    isSelectedUserReachLimit(): boolean {
        const view = this;
        const {state, props} = view;
        const {selectedUserList} = state;
        const {badgeInfo} = props;
        const {settings} = badgeInfo;

        if (!settings) {
            return false;
        }

        const {countLeft} = settings;

        const badgeLeft = isNumber(countLeft) ? countLeft : Infinity;

        return selectedUserList.length >= badgeLeft;
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return (
            <div
                className={classNames(style.badge_form_wrapper, {
                    [style.badge_form_wrapper__mobile]: props.system.screen.isMobile,
                })}
            >
                <form className={style.badge_form} onSubmit={view.handleSubmitForm}>
                    <input
                        className={classNames(style.search_input, {
                            [style.search_input__disabled]: view.isSelectedUserReachLimit(),
                        })}
                        onBlur={view.handleSearchInputOnBlur}
                        onFocus={view.handleSearchInputOnFocus}
                        onInput={view.handleSearchInputOnInput}
                        placeholder={getLocalizedString('SEARCH_PEOPLE__INPUT_PLACEHOLDER', props.locale.name)}
                        ref={view.node.search.input}
                        type="text"
                    />

                    {view.renderSearchUserList()}
                    {view.renderSelectedUserList()}

                    <textarea
                        className={style.badge_description}
                        cols="30"
                        onInput={view.handleTextAreaOnInput}
                        placeholder={getLocalizedString('SEARCH_PEOPLE__TEXT_AREA_PLACEHOLDER', props.locale.name)}
                        rows="10"
                    />

                    <button
                        className={classNames(style.submit_button, {[serviceStyle.disabled]: !view.isSubmitActive()})}
                        type="submit"
                    >
                        <Locale stringKey="SEARCH_PEOPLE__SUBMIT_BUTTON"/>
                    </button>
                </form>
            </div>
        );
    }
}

const ConnectedComponent = connect<ComponentType<BadgeForm>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({
        locale: state.locale,
        titleNewsList: state.titleNewsList,
        system: state.system,
    }),
    reduxAction
)(withRouter(BadgeForm));

export {ConnectedComponent as BadgeForm};
