//login
//posts
//posts' details

//CALLBACK
console.log("start");

const login = (username, password, callback) => {
  setTimeout(() => {
    callback({ username: username, email: "hajarih@code.edu.az" });
  }, 1000);
};

const getPostsByUsername = (username, callback) => {
  setTimeout(() => {
    callback(["post 1", "post 2", "post 3"]);
  }, 2000);
};

const getPostDetails = (post, callback) => {
  setTimeout(() => {
    callback("post details");
  }, 1000);
};
// callback hell
//first login then find post by username find this post's detals
login("hajarih", "hajar123@", (user) => {
  console.log(user.username);

  getPostsByUsername(user.username, (posts) => {
    console.log(posts);

    getPostDetails(posts[0], (details) => {
      console.log(details);
    });
  });
});

console.log("end");
