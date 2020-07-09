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
var isBoldToggled = false;

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
  return editor;
}

function createToolbar() {
  var toolbar = document.createElement("div");
  toolbar.classList.add("zen-toolbar");
  toolbar.appendChild(createIconButton("bold-btn", "format_bold", boldSelection));
  toolbar.appendChild(createIconButton("italic-btn", "format_italic"));
  toolbar.appendChild(createIconButton("underline-btn", "format_underline"));
  toolbar.appendChild(createIconButton("strikethrough-btn", "strikethrough_s"));
  return toolbar;
}

function createIconButton(id, iconName, onClick) {
  if (onClick === void 0) {
    onClick = function () {};
  }

  var btn = document.createElement("button");
  btn.id = id;
  btn.classList.add("toolbar-btn", "material-icons");
  btn.textContent = iconName;
  btn.onclick = onClick;
  return btn;
}

function boldSelection() {
  var _a, _b, _c, _d, _e;

  var selection = document.getSelection();
  var preservedRange = [];

  if (selection && !selection.isCollapsed) {
    // If range is selected
    for (var i = 0; i < selection.rangeCount; i++) {
      var range = selection.getRangeAt(i); // Handle bolding operation

      console.log(range);

      if (range.startContainer.isSameNode(range.endContainer)) {
        // Simplest case, the selected range belongs to the same container
        if (((_a = range.startContainer.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) === "STRONG") {
          // Unbold text if parent belongs to <strong>
          if (range.startContainer.textContent) {
            var textNode = document.createTextNode(range.startContainer.textContent);
            var nextNode = range.startContainer.parentNode.nextSibling;

            if (nextNode) {
              range.commonAncestorContainer.insertBefore(textNode, nextNode);
            } else {
              range.commonAncestorContainer.appendChild(textNode);
            } // Remove bolded node


            range.commonAncestorContainer.removeChild(range.startContainer.parentNode);
            var newRange = document.createRange();
            newRange.selectNodeContents(textNode);
            preservedRange.push(newRange);
          }
        }

        range.surroundContents(document.createElement("strong"));
      } else {
        // Traverse through the siblings until the endContainer node
        var currentNode = range.startContainer;

        while (currentNode) {
          if (((_b = currentNode.parentNode) === null || _b === void 0 ? void 0 : _b.nodeName) !== "STRONG") {
            // Create a new range for this node
            var currRange = document.createRange();

            if (currentNode.isSameNode(range.startContainer)) {
              currRange.setStart(currentNode, range.startOffset);
            } else {
              currRange.setStartBefore(currentNode);
            }

            if (currentNode.isSameNode(range.endContainer)) {
              currRange.setEnd(currentNode, range.endOffset);
            } else {
              currRange.setEndAfter(currentNode);
            }

            currRange.surroundContents(document.createElement("strong"));
            currRange.detach();
          } else {}

          if (currentNode.isSameNode(range.endContainer)) {
            break;
          }

          currentNode = (_c = currentNode.parentNode) === null || _c === void 0 ? void 0 : _c.nextSibling;
        }
      }
    }
  } else {
    if (isBoldToggled) {
      isBoldToggled = false;
      (_d = document.getElementById("bold-btn")) === null || _d === void 0 ? void 0 : _d.classList.remove("toggled");
    } else {
      isBoldToggled = true;
      (_e = document.getElementById("bold-btn")) === null || _e === void 0 ? void 0 : _e.classList.add("toggled");
    }
  }
}

},{}]},{},[1]);
