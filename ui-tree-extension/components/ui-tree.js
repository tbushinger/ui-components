const treeTemplate = document.createElement('template');
treeTemplate.innerHTML = `
  <style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }  
  </style>

   <ul>
    <slot name="node" />
    </ul>
`;

class UITree extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(treeTemplate.content.cloneNode(true));
  }
}

window.customElements.define('ui-tree', UITree);