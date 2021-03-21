'use strict';

require('./index.html');
require('../tailwind.config');
import "./style.css";
import * as rust from "../rust/pkg";

var Elm = require('./Main.elm').Elm;

var app = Elm.Main.init({
    node: document.getElementById('main')
});

const nine = rust.add(5, 5)
const hello = rust.hello();
console.log(nine, hello);
