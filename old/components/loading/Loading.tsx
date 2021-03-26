import React, { FunctionComponent } from 'react';
import Spinner from 'nav-frontend-spinner';

import BEMHelper from 'common/util/bem';
import './loading.less';

const cls = BEMHelper('loading');

const Loading: FunctionComponent = () => {
    return (
        <div className={cls.block}>
            <Spinner type="XXL" />
        </div>
    );
};

export default Loading;
