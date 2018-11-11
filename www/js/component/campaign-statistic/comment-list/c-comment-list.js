// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component, Fragment} from 'react';
// import type {ContextRouterType} from '../../type/react-router-dom-v4';
import style from './style.scss';
import {Scroll} from '../../ui/scroll/c-scroll';
import {Locale} from '../../locale/c-locale';
import type {CampaignStatisticDataListType} from '../api';

type PassedPropsType = {|
    +campaignStatisticDataList: CampaignStatisticDataListType,
|};

type PropsType = $Exact<{
    ...$Exact<PassedPropsType>,
    // ...$Exact<ContextRouterType>
    +children: Node,
}>;

type StateType = {|
    +state: number,
|};

export class CommentList extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            state: 0,
        };
    }

    render(): Node {
        return (
            <div className={style.comment_list}>
                <h3 className={style.comment_list__header}>
                    <Locale stringKey="CAMPAIGN__STATISTIC__COMMENT"/>
                </h3>
                <div className={style.comment_list_scroll}>
                    <Scroll slideWidth={1000} direction="horizontal">
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda dolorum eligendi
                            molestiae possimus quia quod veniam veritatis voluptatem? A autem ea itaque molestiae
                            pariatur porro possimus reprehenderit tenetur voluptatem? Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Ad assumenda dolorum eligendi molestiae possimus quia quod
                            veniam veritatis voluptatem? A autem ea itaque molestiae pariatur porro possimus
                            reprehenderit tenetur voluptatem? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Ad assumenda dolorum eligendi molestiae possimus quia quod veniam veritatis voluptatem? A
                            autem ea itaque molestiae pariatur porro possimus reprehenderit tenetur voluptatem? Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda dolorum eligendi molestiae
                            possimus quia quod veniam veritatis voluptatem? A autem ea itaque molestiae pariatur porro
                            possimus reprehenderit tenetur voluptatem? Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Ad assumenda dolorum eligendi molestiae possimus quia quod veniam
                            veritatis voluptatem? A autem ea itaque molestiae pariatur porro possimus reprehenderit
                            tenetur voluptatem?
                        </div>
                    </Scroll>
                </div>
            </div>
        );
    }
}
