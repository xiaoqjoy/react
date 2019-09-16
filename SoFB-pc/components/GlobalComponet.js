import React from 'react';
import ReactDOM from 'react-dom';

export default function GlobalComponent(component, properties) {
    let props = properties || {};
    let div = document.createElement('div');
    document.body.appendChild(div);
    props.destroy = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    };

    ReactDOM.render(React.createElement(component, props), div);
}
