export class DOMElement {
    constructor(type, id, className) {
        this.id = id;
        this.type = type;
        this.className = className;
    }
    generateElement(attrInfo) {
        let newElement = document.createElement(this.type);
        this.id == null ? '' : newElement.id = this.id;
        this.className == null ? '' : newElement.className = this.className;
        if(attrInfo) {
            attrInfo.forEach((attr) => {
                newElement.setAttribute(attr.type, attr.payload.content)
                if(attr?.payload?.addString) newElement.textContent = attr.payload.addString;
                if(attr?.payload?.addValue) newElement.value = attr.payload.addValue;
            })
        }
        return newElement;
    }
}
