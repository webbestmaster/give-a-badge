// @flow

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import type {GlobalStateType} from '../../../app/reducer';
import {getLocalizedString, Locale} from '../../locale/c-locale';
import type {LocaleType} from '../../locale/reducer';
import type {FoundedUserListType, FoundedUserType} from './api';
import {badgeAssign, searchUser} from './api';
import {FoundedUser} from './founded-user/c-founded-user';
import Transition from 'react-transition-group/Transition';
import type {TransitionStatus} from 'react-transition-group';
import style from './style.scss';
import foundedUserStyle from './founded-user/style.scss';
import serviceStyle from '../../../../css/service.scss';
import type {SystemType} from '../../system/reducer/root';
import withRouter from 'react-router-dom/withRouter';
import type {ContextRouterType} from '../../../../type/react-router-dom-v4';
import {routes} from '../../app/routes';
import type {GetNewsListType} from '../../title-card-list/api';
import * as api from '../../title-card-list/api';
import type {TitleNewsListType} from '../../title-card-list/reducer';
import {pageSize} from '../../title-card-list/c-title-card-list';
import type {ApplyGetNewListResponseType} from '../../title-card-list/action';
import {applyGetNewListResponse} from '../../title-card-list/action';

type ReduxPropsType = {
    +locale: LocaleType,
    +titleNewsList: TitleNewsListType,
    +system: SystemType,
};

type ReduxActionType = {|
    +applyGetNewListResponse: (getNewsListResponse: GetNewsListType, inBegin: boolean) => ApplyGetNewListResponseType,
|};

type PassedPropsType = {|
    +badgeId: string,
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
    +isAllComponentLoaded: boolean,
    +snackbar: {|
        +isOpen: boolean,
        +isSuccess: boolean,
    |},
    +searchString: string,
    +descriptionText: string,
    +searchUserList: FoundedUserListType,
    +selectedUserList: FoundedUserListType,
    +hasSearchInputFocus: boolean,
    +isSearchInProgressCounter: number,
|};

type ComponentStoreType = {|
    Snackbar: null | Component,
|};

type NodeType = {|
    search: {|
        input: {current: null | HTMLInputElement},
    |},
|};

const componentStore: ComponentStoreType = {
    Snackbar: null,
};

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
    // eslint-disable-next-line id-match
    props: PropsType;
    state: StateType;
    node: NodeType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            isAllComponentLoaded: false,
            snackbar: {
                isOpen: false,
                isSuccess: false,
            },
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

    async fetchNews(): Promise<void> {
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

    async loadAllComponent(): Promise<void> {
        const view = this;
        const {state} = view;

        if (state.isAllComponentLoaded) {
            return;
        }

        const SnackbarRequire = await import(/* webpackChunkName: 'snack-bar' */ '@material-ui/core/Snackbar');

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

    async submitForm(): Promise<void> {
        const view = this;
        const {props, state} = view;
        const {selectedUserList, descriptionText} = state;
        const {badgeId} = props;

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
            .catch(
                (error: Error): Error => {
                    console.error('Can NOT fetch news after badge assign');
                    console.error(error);
                    return error;
                }
            );

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

    clearSearchInput() {
        const view = this;
        const {props, state, node} = view;
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
                            {searchUserList.map(
                                (foundedUser: FoundedUserType): Node => {
                                    const foundedUserId = foundedUser.id;
                                    const isInSelectedUserList = view.isInSelectedUserList(foundedUserId);

                                    return (
                                        <FoundedUser
                                            className={isInSelectedUserList ? foundedUserStyle.already_selected : ''}
                                            onClick={view.createHandleOnClickUser(isInSelectedUserList, foundedUser)}
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
            return <div key="selected-user-list" className={style.selected_user_list__empty}/>;
        }

        return (
            <div key="selected-user-list" className={style.selected_user_list}>
                {selectedUserList.map(
                    (foundedUser: FoundedUserType): Node => {
                        return (
                            <button
                                className={style.selected_user_wrapper}
                                type="button"
                                onClick={view.createHandlerForRemoveFromSelectedUserList(foundedUser)}
                                onKeyPress={view.createHandlerForRemoveFromSelectedUserList(foundedUser)}
                                key={foundedUser.id}
                            >
                                <div
                                    className={style.selected_user_image}
                                    style={{backgroundImage: `url('${foundedUser.imageUrl}')`}}
                                    title={foundedUser.name}
                                />
                            </button>
                        );
                    }
                )}
            </div>
        );
    }

    createHandleOnCloseSnackBar(isSuccess: boolean): () => void {
        const view = this;
        const {props} = view;

        return () => {
            view.setShowSnackbar(false, false);

            if (isSuccess) {
                props.history.push(routes.index.index);
            }
        };
    }

    renderSnackBar(): Node {
        const view = this;
        const {props, state} = view;
        const {locale} = props;
        const {Snackbar} = componentStore;
        const {isOpen, isSuccess} = state.snackbar;

        if (isOpen) {
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
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={0.5e3}
                onClose={view.createHandleOnCloseSnackBar(isSuccess)}
                message={
                    isSuccess ?
                        getLocalizedString('SNACK_BAR__GIVE_BADGE__SUCCESS', locale.name) :
                        getLocalizedString('SNACK_BAR__GIVE_BADGE__ERROR', locale.name)
                }
            />
        );
    }

    handleSubmitForm = (evt: SyntheticEvent<HTMLFormElement>) => {
        evt.preventDefault();
        (async (): Promise<void> => {
            const view = this;

            await view.submitForm();
        })();
    };

    handleSearchInputOnFocus = () => {
        const view = this;

        view.setState({hasSearchInputFocus: true});
    };

    handleSearchInputOnBlur = () => {
        const view = this;

        view.setState({hasSearchInputFocus: false});
    };

    handleSearchInputOnInput = (evt: SyntheticEvent<HTMLInputElement>) => {
        (async (): Promise<void> => {
            const view = this;

            await view.updateSearch(evt.currentTarget.value);
        })();
    };

    handleTextAreaOnInput = (evt: SyntheticEvent<HTMLInputElement>) => {
        const view = this;

        view.updateDescription(evt.currentTarget.value);
    };

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div
                className={classNames(style.badge_form_wrapper, {
                    [style.badge_form_wrapper__mobile]: props.system.screen.isMobile,
                })}
            >
                <form
                    className={classNames(style.badge_form, {[serviceStyle.disabled]: state.snackbar.isSuccess})}
                    onSubmit={view.handleSubmitForm}
                >
                    <input
                        ref={view.node.search.input}
                        className={style.search_input}
                        onFocus={view.handleSearchInputOnFocus}
                        onBlur={view.handleSearchInputOnBlur}
                        onInput={view.handleSearchInputOnInput}
                        type="text"
                        placeholder={getLocalizedString('SEARCH_PEOPLE__INPUT_PLACEHOLDER', props.locale.name)}
                    />

                    {view.renderSearchUserList()}
                    {view.renderSelectedUserList()}

                    <textarea
                        className={style.badge_description}
                        onInput={view.handleTextAreaOnInput}
                        cols="30"
                        rows="10"
                        placeholder={getLocalizedString('SEARCH_PEOPLE__TEXT_AREA_PLACEHOLDER', props.locale.name)}
                    />

                    <button
                        className={classNames(style.submit_button, {[serviceStyle.disabled]: !view.isSubmitActive()})}
                        type="submit"
                    >
                        <Locale stringKey="SEARCH_PEOPLE__SUBMIT_BUTTON"/>
                    </button>
                </form>

                {view.renderSnackBar()}
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
