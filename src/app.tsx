import React from 'react';
import ReactDOM from 'react-dom';
import './app.less'
import { Month } from './components/calendar/month'
import { Week } from './components/calendar/week'
import {DropdownInput} from "./components/calendar/dropdown-input";
import {TaskModal} from "./components/calendar/task-modal";
const title = 'My Simple Express React Webpack Babel Setup Environment';

import { TestInput } from "./components/test-components/test-input";
import {addTaskArrayToLocalStorage, GlobalStorage} from "../domain/globalStorage/globalStorage";
import {DateInput} from "./components/test-components/date-input";
import {Calendar} from "./components/pages/Calendar";
import {TaskCart} from "./components/calendar/task-cart";

import { Switch, Route} from "react-router";


const testTask = {
    id: '1',
    title: 'test1',
    description: 'testing test1asdfasdf asdlkfksa djksdja kfjksadfjkjsa f;;sdjksadfj  k sjdkfj klasfd jklsdf jklsajdkl  fjks   ;lkjsadlk fjadsf' +
        'asfkj hsdljf hkj asdhf lkjash flkjash dkfjhas lkdjfhk lajshdflas' +
        'sajdfb sad hfsakd jhfkjs adhfkj sadf' +
        'sdfh;ad jshfksda hfjksha dfk jhsakdj fhlska  djfhkljsahdf' +
        'sdh; fjls a d hgjkhv i u hcx;zvw jehHZ' +
        'ds afa sdgj asdh gkjs ahdg hs; dag',
    startTime: new Date(),
    endTime: new Date()
}

ReactDOM.render(
    <React.StrictMode>

        <Calendar/>
        <Switch>
            <Route path='/month/:day/:month/:year' component={PracticePage} />
            <Route path='/study/:levelID' component={LessonsPage} />
            <Route path='/study' component={LessonsLevelSelectPage} />
            <Route path='/'>
                <h1>home</h1>
            </Route>
        </Switch>
    </React.StrictMode>,
    document.getElementById('app')
);

