(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ZenEditor = require("../dist/index");

ZenEditor.init();

},{"../dist/index":2}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

function init() {
  customElements.define("zen-editor", ZenEditor);
}

exports.init = init;

let ZenEditor = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ZenEditor, _HTMLElement);

  var _super = _createSuper(ZenEditor);

  function ZenEditor() {
    var _this;

    _classCallCheck(this, ZenEditor);

    _this = _super.call(this); // Define dependant custom elements

    customElements.define("zen-toolbar", ZenToolbar);

    const shadow = _this.attachShadow({
      mode: "open"
    });

    const container = document.createElement("div");
    container.classList.add("zen-container"); // Initialize editor element

    const editor = _this.createEditor();

    container.appendChild(editor); // Initialize toolbar element

    container.appendChild(_this.toolbar = document.createElement("zen-toolbar"));
    shadow.appendChild(container);
    return _this;
  }

  _createClass(ZenEditor, [{
    key: "createEditor",
    value: function createEditor() {
      const editor = document.createElement("div");
      editor.classList.add("zen-editor");
      editor.setAttribute("contentEditable", "true");
      document.onselectionchange = this.selectionHandler;
      return editor;
    }
  }, {
    key: "boldSelection",
    value: function boldSelection() {
      document.execCommand("bold");
    }
  }, {
    key: "selectionHandler",
    value: function selectionHandler() {
      var _a;

      Object.entries(this.toolbar.common).forEach(([k, v]) => v.removeAttribute("activated"));
      const selection = document.getSelection();

      if (selection) {
        let shouldToggleBold = true;
        Array.from(Array(selection.rangeCount).keys()).forEach(i => {
          const range = selection.getRangeAt(i);
          const descendants = this.getDescendants(range.commonAncestorContainer);

          if (!descendants.some(node => ["STRONG", "B"].some(k => node.nodeName === k))) {
            shouldToggleBold = false;
          }
        });

        if (shouldToggleBold) {
          (_a = document.getElementById("bold-btn")) === null || _a === void 0 ? void 0 : _a.setAttribute("activated", "true");
        }
      }
    }
  }, {
    key: "getDescendants",
    value: function getDescendants(node, acc = []) {
      if (node instanceof Node) {
        return this.getDescendants(Array.from(node.childNodes), acc);
      }

      if (node.length < 1) return acc;
      const currentNode = node.pop();

      if (currentNode) {
        acc.push(currentNode);
        node.concat(Array.from(currentNode.childNodes));
      }

      return this.getDescendants(node, acc);
    }
  }]);

  return ZenEditor;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

let ZenToolbar = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(ZenToolbar, _HTMLElement2);

  var _super2 = _createSuper(ZenToolbar);

  function ZenToolbar() {
    var _this2;

    _classCallCheck(this, ZenToolbar);

    _this2 = _super2.call(this);
    _this2.isBoldToggled = false; // Create shadow root

    const shadow = _this2.attachShadow({
      mode: "open"
    });

    const wrapper = document.createElement("div");
    wrapper.classList.add("zen-toolbar"); // Initialize common buttons

    const boldButton = _this2.createIconButton("bold-btn", "format_bold", _this2.boldToggled);

    const italicButton = _this2.createIconButton("italic-btn", "format_italic");

    const underlineButton = _this2.createIconButton("underline-btn", "format_underline");

    const strikethroughButton = _this2.createIconButton("strikethrough-btn", "strikethrough_s"); // Assign reference


    _this2.common = {
      boldButton,
      italicButton,
      underlineButton,
      strikethroughButton
    };
    wrapper.appendChild(boldButton);
    wrapper.appendChild(italicButton);
    wrapper.appendChild(underlineButton);
    wrapper.appendChild(strikethroughButton);
    shadow.appendChild(wrapper);
    return _this2;
  }

  _createClass(ZenToolbar, [{
    key: "createIconButton",
    value: function createIconButton(id, iconName, onClick = () => {}) {
      const btn = document.createElement("button");
      btn.id = id;
      btn.classList.add("toolbar-btn", "material-icons");
      btn.textContent = iconName;
      btn.onclick = onClick;
      return btn;
    }
  }, {
    key: "boldToggled",
    value: function boldToggled() {
      this.isBoldToggled = !!this.isBoldToggled;
    }
  }]);

  return ZenToolbar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

},{}]},{},[1]);
