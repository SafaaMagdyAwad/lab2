let usersNamesDiv = document.getElementById("usersNames");
let postsDiv = document.getElementById("posts");
async function getUsers() {
    let users = (await fetch("https://jsonplaceholder.typicode.com/users")).json();
    // console.log(users);
    users.then((users) => {
        // console.log(users);
        users.forEach(user => {
            let button = document.createElement("button");
            button.innerText = user.name;
            button.value = user.id;
            usersNamesDiv.appendChild(button);
            button.addEventListener("click", (e) => {
                //select all element with class name selected & remove the class
                let clickedbuttons=document.querySelectorAll(".clicked");
                clickedbuttons.forEach((button)=>{
                    button.classList.remove("clicked");
                });
                // console.log(clickedbuttons);
                e.target.className="clicked",
                getposts(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.value}`);
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
        let posts = await res.json();
        // console.log(posts);
        let postul = document.createElement("ul");
        posts.forEach(post => {
            // console.log(post.title);
            let postli=document.createElement("li");
            postli.innerText = post.title;
            postul.appendChild(postli);
            postsDiv.appendChild(postul);
        });
    } catch (e) {
        console.log(e);
    }
}