import { DOMElement } from '../Refactorization/DOMElement';

let memberBox = new DOMElement('div', 'member_container', 'mem-cont');

document.body.appendChild(memberBox.generateElement());

fetch("/api/members")
.then((data)=>data.json())
.then((data)=> {
    console.log(data);
});
