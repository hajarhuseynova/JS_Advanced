//login
//posts
//posts' details

// PROMISE

console.log("start");
let serverStatus = false;

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (serverStatus) {
        resolve({ username: username, email: "hajarih@code.edu.az" });
      } else {
        reject("server is offline");
      }
    }, 1000);
  });
};

const getPostsByUsername = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["post 1", "post 2", "post 3"]);
    }, 2000);
  });
};

const getPostDetails = (post) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("post details");
    }, 1000);
  });
};
//promise
// login("haja5", "123456jd")
//   .then((user) => {
//     console.log(user);
//     return getPostsByUsername(user.username);
//   })
//   .then((posts) => {
//     console.log(posts);
//     return getPostDetails(posts[0]);
//   })
//   .then((details) => {
//     console.log(details);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//sync
async function displayUser() {
  try {
    const user = await login("haja5", "123456jd");
    console.log(user);
    const posts = await getPostsByUsername(user.username);
    console.log(posts);
    const details = await getPostDetails(posts[0]);
    console.log(details);
  } catch (err) {
    console.log(err);
  }
}
displayUser();

console.log("end");
