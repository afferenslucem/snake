import React from 'react';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Score from "./Score";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

configure({adapter: new Adapter()});

describe('Score', () => {
    const mockStore = configureStore([thunk]);
    let store: any;

    beforeEach(() => {
        store = mockStore({
            score: {
                score: 100
            },
            game: {
                speed: 1
            },
            field: {
                area: {
                    snake: {
                        body: [null, null, null]
                    }
                }
            }
        });
    });

    test("renders with or without a name", () => {
        const wrapper = mount(
            <Provider store={store}>
                <Score/>
            </Provider>
        )
        expect(wrapper.find('.app-score .score-info > .score-info__value').first().text()).toBe('100');
        expect(wrapper.find('.app-score .snake-length-info > .snake-length-info__value').first().text()).toBe('3');
        expect(wrapper.find('.app-score .snake-speed-info > .snake-speed-info__value').first().text()).toBe('1');
    });

})
