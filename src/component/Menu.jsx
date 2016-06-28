import React, {Component} from 'react';
import {Link} from 'react-router';

import Tool from '../lib/Tool/Tool';
import {Header, Footer, Loading} from './common/index';

export default class Menu extends Component {
    constructor(props) {
        super(props);

    }
    render() {

        return (
            <div>
                <Header title="分类" />
                <h1>abc</h1>
                <Footer index="1"/>
            </div>
        );
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
};

