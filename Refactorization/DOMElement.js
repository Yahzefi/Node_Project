export class DOMElement {
    constructor(type, id, className) {
        this.id = id;
        this.type = type;
        this.className = className;
    }
    generateElement(attrInfo) {
        let newElement = document.createElement(this.type);
        if(attrInfo) newElement.setAttribute(attrInfo.type, attrInfo.payload);
        if(attrInfo.payload.addString) newElement.textContent = attrInfo.payload.addString;
        return newElement;
    }
}