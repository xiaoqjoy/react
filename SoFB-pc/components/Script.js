import React from 'react';
export default ({ children }) => (
    <script
        dangerouslySetInnerHTML={{ __html: `(${children.toString()})();` }}
    />
);
