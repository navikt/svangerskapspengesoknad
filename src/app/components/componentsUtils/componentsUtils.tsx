import React from 'react';

export const generateLink = (msg: any, url: string) => (
    <a className="lenke" rel="noopener noreferrer" href={url} target="_blank">
        {msg}
    </a>
);
