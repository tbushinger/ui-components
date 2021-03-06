const treeNodeTemplate = document.createElement('template');
treeNodeTemplate.innerHTML = `
  <style>
  .caret {
    cursor: pointer;
    -webkit-user-select: none; /* Safari 3.1+ */
    -moz-user-select: none; /* Firefox 2+ */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
  }
  
  .caret::before {
    content: "\\25B6";
    color: black;
    display: inline-block;
    margin-right: 6px;
  }
  
  .caret-down::before {
    -ms-transform: rotate(90deg); /* IE 9 */
    -webkit-transform: rotate(90deg); /* Safari */'
    transform: rotate(90deg);  
  }

  li {
    background-color: #F0F0F0;
    border: solid 1px #DDDDDD;
    border-radius: 5px;
    padding-top: 5px;
    padding: 5px;
  }

  ul {
    list-style-type: none;
    margin-top: 5px;
    padding-top: 5px;
    padding-left: 20px;
  }  

  .nested {
    display: none;
  }
  
  .active {
    display: block;
    margin: 0;
  }  
  </style>

  <li><span class="caret"><slot name="text"></span>
   <ul class="nested">
    <slot name="node"/>
   </ul>
  </li>
`;

class UITreeNode extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(treeNodeTemplate.content.cloneNode(true));
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.shadowRoot.querySelector('.nested').classList.toggle('active');
        this.shadowRoot.querySelector('.caret').classList.toggle('caret-down');
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector('.caret')
            .addEventListener('click', this.toggle);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.caret').removeEventListener('click', this.toggle);
    }
}

window.customElements.define('ui-tree-node', UITreeNode);
