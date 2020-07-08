(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ZenEditor = require("../dist/index");

const el = document.getElementById("editor");
ZenEditor.init(el);

},{"../dist/index":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

function init(el) {
  el.classList.add("zen-container"); // Initialize editor element

  var editor = createEditor(); // Initialize toolbar element

  var toolbar = createToolbar();
  el.appendChild(editor);
  el.appendChild(toolbar);
}

exports.init = init;

function createEditor() {
  var editor = document.createElement("div");
  editor.classList.add("zen-editor");
  editor.setAttribute("contentEditable", "true");
  document.execCommand("defaultParagraphSeparator", false, "p");
  return editor;
}

function createToolbar() {
  var toolbar = document.createElement("div");
  toolbar.classList.add("zen-toolbar");
  toolbar.appendChild(createIconButton("format_bold"));
  toolbar.appendChild(createIconButton("format_italic"));
  toolbar.appendChild(createIconButton("format_underline"));
  toolbar.appendChild(createIconButton("strikethrough_s"));
  return toolbar;
}

function createIconButton(iconName, onClick) {
  if (onClick === void 0) {
    onClick = function () {};
  }

  var btn = document.createElement("div");
  btn.classList.add("toolbar-btn");
  var icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.textContent = iconName;
  icon.onclick = onClick;
  btn.appendChild(icon);
  return btn;
}

},{}]},{},[1]);
