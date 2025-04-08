let usersNamesDiv = document.getElementById("usersNames");
let postsDiv = document.getElementById("posts");
async function getUsers() {

    let users = (await fetch("https://jsonplaceholder.typicode.com/users")).json();
    // console.log(users);
    users.then((users) => {
        // console.log(users);// append users buttons to usersNamesDiv
        users.forEach(user => {
            let button = document.createElement("button");
            button.innerText = user.name;
            button.value = user.id;

            usersNamesDiv.appendChild(button);
            button.addEventListener("click", () => {
                getposts(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            });
        });
    }).catch((er) => {
        console.log(er);
    });
}
getUsers();

async function getposts(url) {
    try {
        postsDiv.innerHTML = "";
        let res = await fetch(url);
        let posts = await res.json()
        console.log(posts);
        posts.forEach(post => {
            console.log(post.title);
            let postTitle = document.createElement("p");
            postTitle.innerText = post.title;
            postsDiv.appendChild(postTitle);
        });
    } catch (e) {
        console.log(e);
    }
}