import React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import nb from 'react-intl/locale-data/nb';
import nn from 'react-intl/locale-data/nn';
import 'moment/locale/nb';
import 'moment/locale/nn';

import { Språkkode } from 'common/intl/types';
import { State } from 'app/redux/store';
import nbMessages from './nb_NO.json';
import nbMessagesCommon from '../../common/intl/nb_NO.json';
import nnMessages from './nn_NO.json';
import nnMessagesCommon from '../../common/intl/nn_NO.json';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    språkkode: Språkkode;
}

type Props = OwnProps & StateProps;

moment.locale('nb');

class IntlProvider extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        addLocaleData([...nb, ...nn]);
    }

    render() {
        const messages =
            this.props.språkkode === 'nb'
                ? {
                      ...nbMessages,
                      ...nbMessagesCommon,
                  }
                : {
                      ...nnMessages,
                      ...nnMessagesCommon,
                  };
        return (
            <Provider key={this.props.språkkode} locale={this.props.språkkode} messages={messages || {}}>
                {this.props.children}
            </Provider>
        );
    }
}

const mapStateToProps = (state: State): StateProps => ({
    språkkode: state.common.språkkode,
});

export default connect(mapStateToProps)(IntlProvider);
