import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';
const Error500 = dynamic(import('../../layouts/error/500'), {
    ssr: false
});

export default class CommunityListingDetail extends PureComponent {
    render() {
        return (
            <div>
                <Error500 />
            </div>
        );
    }
}
