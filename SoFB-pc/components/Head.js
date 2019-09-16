import React, { PureComponent } from 'react';
import Head from 'next/head';

export default class HeadContent extends PureComponent {
    render() {
        const { title = '', keywords = '', description = '' } = this.props;
        return (
            <Head>
                <title>{title}</title>
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                    key='viewport'
                />
                <meta name='keywords' content={keywords} />
                <meta name='description' content={description} />
                {this.props.children}
                <script src='/static/lib/history.js' />
                <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js' />
                <script src='/static/lib/flexibility.js' />
            </Head>
        );
    }
}
