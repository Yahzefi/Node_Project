import { DOMElement } from './Refactorization/DOMElement.js';

const BODY = document.getElementById('primary_cont');

let addMember_Form = new DOMElement('form', 'addMem_form', 'mem-form');
    let nameLabel = new DOMElement('label', 'name_label', 'form-label');
    let nameInput = new DOMElement('input', 'name_input', 'form-inp');
    let emailLabel = new DOMElement('label', 'email_label', 'form-label');
    let emailInput = new DOMElement('input', 'email_input', 'form-inp');
    let submitMember = new DOMElement('input', 'submit_btn', 'sub-btn');
let memberDiv = new DOMElement('div', 'member_container', 'mem-cont');

BODY.appendChild(addMember_Form.generateElement());
BODY.appendChild(memberDiv.generateElement());

const MEMBER_FORM = document.getElementById('addMem_form');

MEMBER_FORM.appendChild(nameLabel.generateElement({type: "for", payload: {content: "name", addString: "Member Name"}}));
MEMBER_FORM.appendChild(nameInput.generateElement({type: "name", payload: {content: "name"}}))

const NAME_LABEL = document.getElementById('name_label');

fetch("/api/members")
.then((data)=>data.json())
.then((data)=> {
    console.log(data);
    // addMember();
})

function addMember() {
    fetch('/api/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
    }).then(async(data) => {
        let newArray = await data.json();
        console.log(newArray);
        
    })
}
