import { DOMElement } from './Refactorization/DOMElement.js';

const BODY = document.getElementById('primary_cont');

let appHeader = new DOMElement('h1', null, 'app-head');
let addMember_Form = new DOMElement('form', 'addMem_form', 'mem-form');
    let nameLabel = new DOMElement('label', 'name_label', 'form-label');
    let nameInput = new DOMElement('input', 'name_input', 'form-inp');
    let emailLabel = new DOMElement('label', 'email_label', 'form-label');
    let emailInput = new DOMElement('input', 'email_input', 'form-inp');
    let submitMember = new DOMElement('input', 'submit_btn', 'sub-btn');
let membersContainer = new DOMElement('div', 'members_container', 'mem-cont')
    let memberHeadCont = new DOMElement('div', 'header_container', 'head-cont');
        let memberHead = new DOMElement('h1', null, 'mem-head');
    let memberDiv = new DOMElement('div', null, 'mem-div');
        let memberInfo = new DOMElement('p', null, 'member-info');

BODY.appendChild(appHeader.generateElement([{payload: {addString: "Node/Express Member Application"}}]))
BODY.appendChild(addMember_Form.generateElement());
BODY.appendChild(membersContainer.generateElement());

const MEMBER_FORM = document.getElementById('addMem_form');
const MEMBERS_CONT = document.getElementById('members_container');

MEMBER_FORM.appendChild(nameLabel.generateElement([{type: "for", payload: {content: "name", addString: "Member Name: "}}]));
MEMBER_FORM.appendChild(nameInput.generateElement([
    {type: "name", payload: {content: "name"}},
    {type: "placeholder", payload: {content: "Enter name here..."}}
]))
MEMBER_FORM.appendChild(emailLabel.generateElement([{type: "for", payload: {content: "email", addString: "Member Email: "}}]))
MEMBER_FORM.appendChild(emailInput.generateElement([
    {type: "type", payload: {content: "email"}}, 
    {type: "name", payload: {content:"email"}},
    {type: "placeholder", payload: {content: "Enter email here..."}}
]))
MEMBER_FORM.appendChild(submitMember.generateElement([{type: "type", payload: {content: "submit", addValue: "Add Member"}}]))

const NAME_INPUT = document.getElementById('name_input');
const EMAIL_INPUT = document.getElementById('email_input');

const SUBMIT_BTN = document.getElementById('submit_btn');
SUBMIT_BTN.addEventListener('click', (e) => addMember(e))

MEMBERS_CONT.appendChild(memberHeadCont.generateElement());

const HEAD_CONT = document.getElementById('header_container');
HEAD_CONT.appendChild(memberHead.generateElement([{type: "id", payload: {content: "idx_header", addString: "Member #"}}]))
HEAD_CONT.appendChild(memberHead.generateElement([{type: "id", payload: {content: "name_header", addString: "Member Name"}}]))
HEAD_CONT.appendChild(memberHead.generateElement([{type: "id", payload: {content: "email_header", addString: "Member Email"}}]))
HEAD_CONT.appendChild(memberHead.generateElement([{type: "id", payload: {content: "status_header", addString: "Member Status"}}]))

let listLength;

fetch("/api/members")
.then((data)=>data.json())
.then((data)=> {
    if(localStorage.length > 0) data = pullLocalStorage();
    listLength = data.length;
    data.map((member, idx) => {
        let currMemberNum = memberInfo.generateElement([
            {type: "id", payload: {content: `member${idx + 1}_num`, addString: member.id}}
        ])
        let currMemberName = memberInfo.generateElement([
            {type: "id", payload: {content: `member${idx + 1}_name`, addString: member.name}}
        ])
        let currMemberEmail = memberInfo.generateElement([
            {type: "id", payload: {content: `member${idx + 1}_email`, addString: member.email}}
        ])
        let currMemberStatus = memberInfo.generateElement([
            {type: "id", payload: {content: `member${idx + 1}_status`, addString: member.status}}
        ])
        MEMBERS_CONT.appendChild(memberDiv.generateElement([
            {type: "id", payload: {content: `member${idx + 1}_container`}}
        ]))
        let memCont = document.getElementById(`member${idx + 1}_container`)
        memCont.appendChild(currMemberNum);
        memCont.appendChild(currMemberName);
        memCont.appendChild(currMemberEmail);
        memCont.appendChild(currMemberStatus);
        data.forEach((member) => {
            localStorage.setItem(`member_${member.id}`, JSON.stringify(member))
        })
    })
})

function addMember(e) {
    e.preventDefault();

    let submittedInfo = {
        id: listLength + 1,
        name: NAME_INPUT.value,
        email: EMAIL_INPUT.value,
        status: "active"
    }

    listLength++;

    fetch('/api/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submittedInfo)
    }).then(async(data) => {
        let newArray = await data.json();
        let index = newArray.length;
        let newMember = newArray[index - 1];
        
        MEMBERS_CONT.appendChild(memberDiv.generateElement([
            {type: "id", payload: {content: `member${index}_container`}}
        ]))
        let memCont = document.getElementById(`member${index}_container`);
        let newMemberNum = memberInfo.generateElement([
            {type: "id", payload: {content: `member${index}_num`, addString: newMember.id}}
        ])
        let newMemberName = memberInfo.generateElement([
            {type: "id", payload: {content: `member${index}_name`, addString: newMember.name}}
        ])
        let newMemberEmail = memberInfo.generateElement([
            {type: "id", payload: {content: `member${index}_email`, addString: newMember.email}}
        ])
        let newMemberStatus = memberInfo.generateElement([
            {type: "id", payload: {content: `member${index}_status`, addString: newMember.status}}
        ])
        memCont.appendChild(newMemberNum);
        memCont.appendChild(newMemberName);
        memCont.appendChild(newMemberEmail);
        memCont.appendChild(newMemberStatus);
        NAME_INPUT.value = '';
        EMAIL_INPUT.value = '';
        localStorage.setItem(`member_${submittedInfo.id}`, JSON.stringify(submittedInfo))
    })
}

function pullLocalStorage() {
    let memberArray = [];
    for(let i=0; i < localStorage.length; i++){
        let pulledMember = JSON.parse(localStorage.getItem(`member_${i + 1}`))
        memberArray.push(pulledMember);
    }
    return memberArray;
}
