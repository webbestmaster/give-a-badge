// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import serviceStyle from '../../../css/service.scss';
import classnames from 'classnames';

type ReduxPropsType = {};

type PassedPropsType = {|
    // +passedProp: string
|};

type StateType = {|
    +state: number
|};

// eslint-disable-next-line id-match
type PropsType = $Exact<{...ReduxPropsType, ...PassedPropsType}>;

class TitleCard extends Component<ReduxPropsType, PassedPropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0
        };
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        return (
            <div className={style.card}>
                <img className={style.badge_icon} src="http://via.placeholder.com/100x100" alt=""/>
                <div className={classnames(serviceStyle.clear_self, style.people_list)}>
                    <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>
                    <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>
                    <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                </div>
                <p className={style.review}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam corporis dolor eaque ex expedita
                    fugit hic in ipsum libero obcaecati perferendis placeat, rerum sequi similique sint soluta sunt,
                    unde voluptatibus!
                </p>
                <img className={style.bottom_face} src="http://via.placeholder.com/47x47" alt=""/>
                <p className={style.date}>10.21.2018</p>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    {}
)(TitleCard);
