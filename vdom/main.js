var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');
var Delegator = require('dom-delegator');

var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');

var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});

var html = '<div id="foobar"><div id="fizz">Foobar</div></div>';

var vtree = convertHTML(html);
var createElement = require('virtual-dom/create-element');
var el = createElement(vtree);
document.getElementById('ct').appendChild(el);

document.getElementById("foobar").addEventListener("click", () => {
  console.log("test");
});

document.getElementById("fizz").addEventListener("click", () => {
  var html2 = '<div id="foobar"><div id="fizz">Fizz</div></div>';
  var vtree2 = convertHTML(html2);
  var patches = diff(vtree, vtree2);
  patch(document.getElementById('ct'), patches);
});
