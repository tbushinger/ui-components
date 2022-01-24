const treeLeafTemplate = document.createElement('template');
treeLeafTemplate.innerHTML = `
  <style>
  li {
    margin: 5px;
    padding: 5px;
    background-color: #FFFFFF;
    border-radius: 3px;
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