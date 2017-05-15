// DomApi
//  ---------

import Backbone from 'backbone';

// Performant method for returning the jQuery instance
function getEl(el) {
  return el instanceof Backbone.$ ? el : Backbone.$(el);
}

// Static setter
export function setDomApi(mixin) {
  this.prototype.Dom = _.extend({}, this.prototype.Dom, mixin);
}

export default {

  // Returns a new HTML DOM node instance
  createBuffer() {
    return document.createDocumentFragment();
  },

  // Lookup the `selector` string within the DOM node for `context`
  getEl(el, context) {
    if (context) {
      return Backbone.$(el, context);
    }

    return getEl(el);
  },

  // Detach `el` from the DOM without removing listeners
  detachEl(el, _$el = getEl(el)) {
    _$el.detach();
  },

  // Remove `el` from the DOM, removing listeners
  removeEl(el, _$el = getEl(el)) {
    _$el.remove();
  },

  // Remove `oldEl` from the DOM and put `newEl` in its place
  replaceEl(newEl, oldEl) {
    if (newEl === oldEl) {
      return;
    }

    const parent = oldEl.parentNode;

    if (!parent) {
      return;
    }

    parent.replaceChild(newEl, oldEl);
  },

  // Replace the contents of `el` with the HTML string of `html`
  setContents(el, html, _$el = getEl(el)) {
    _$el.html(html);
  },

  // Takes the DOM node `el` and appends the rendered `contents`
  // to the end of the element's contents.
  appendContents(el, contents, {_$el = getEl(el), _$contents = getEl(contents)}) {
    _$el.append(_$contents);
  },

  // Remove the inner contents of `el` from the DOM while leaving
  // `el` itself in the DOM.
  detachContents(el, _$el = getEl(el)) {
    _$el.contents().detach();
  }
};
