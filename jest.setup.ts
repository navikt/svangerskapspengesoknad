import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/* setup.js */

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');
const { window } = jsdom;

const globalAny: any = global;

globalAny.window = window;
globalAny.document = window.document;
globalAny.appSettings = {};
