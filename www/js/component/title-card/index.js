// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {GlobalStateType} from '../../app-reducer';
import style from './style.scss';
import serviceStyle from '../../../css/service.scss';
import helperStyle from '../../../css/helper.scss';
import classnames from 'classnames';
import Locale from '../locale';

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
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    {/* <img className={style.people_face} src="http://via.placeholder.com/47x47" alt=""/>*/}
                    <p className={style.people_face_counter}>
                        and 252 people
                        {/* <Locale stringKey="SPACE"/>*/}
                    </p>
                </div>
                <div className={style.review}>
                    <p className={helperStyle.line_cap_3}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam corporis dolor eaque ex
                        expedita fugit hic in ipsum libero obcaecati perferendis placeat, rerum sequi similique sint
                        soluta sunt, unde voluptatibus!
                    </p>
                </div>
                <div className={classnames(serviceStyle.clear_self, style.bottom_data_wrapper)}>
                    <img className={style.bottom_face} src="http://via.placeholder.com/32x32" alt=""/>
                    <p className={style.bottom_date}>10.07.2018</p>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: GlobalStateType, props: PassedPropsType): ReduxPropsType => ({}),
    {}
)(TitleCard);
