fetch("/api/members")
.then((data)=>data.json())
.then((data)=> {
    document.getElementById('fetchedName').textContent = data[0].name;
});
