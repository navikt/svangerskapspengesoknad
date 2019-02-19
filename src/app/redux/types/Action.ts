import ApiAction from './ApiAction';
import SøknadAction from './SøknadAction';
import CommonAction from './CommonAction';

type Action = CommonAction | ApiAction | SøknadAction;

export default Action;
