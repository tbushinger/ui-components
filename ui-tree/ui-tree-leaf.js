const treeLeafTemplate = document.createElement('template');
treeLeafTemplate.innerHTML = `
  <style>
  li {
    padding-left: 20px;
  }  
  </style>

  <li>
    <slot name="text" />
  </li>
`;

class UITreeLeaf extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(treeLeafTemplate.content.cloneNode(true));
  }
}

window.customElements.define('ui-tree-leaf', UITreeLeaf);