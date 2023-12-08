const data = [
  {
    id: "1",
    title: "Testing",
    body: "This is so sick",
    image: "https://source.unsplash.com/random",
    createdAt: new Date().toLocaleDateString(),
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    title: "Testing2",
    body: "This is so sick",
    image: "https://source.unsplash.com/random",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "3",
    title: "Testing3",
    body: "This is so sick",
    image: "https://source.unsplash.com/random",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "4",
    title: "Testing3",
    body: "This is so sick",
    image: "https://source.unsplash.com/random",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "5",
    title: "Testing3",
    body: "This is so sick",
    image: "https://source.unsplash.com/random",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
]
// send the data after 1 second
export const getPosts = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
