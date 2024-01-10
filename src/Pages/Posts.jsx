import { Button, Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa6";
import Link from "../Components/Link";
// import { Link } from 'react-router-dom';

const Posts = () => {
  const { data: posts, isLoading } = useFetch("/posts");

  console.log(posts);
  return isLoading ? (
    <div id="spinner" className="vh-100 fixed">
      <Spinner className="spinner" />
    </div>
  ) : (
    posts && (
      <div id="posts" className="container">
        <h1 className="text-info my-3 display-2 fw-bold">Posts</h1>
        <p className="fs-4">
          <FaUser /> Welcome to the community
        </p>
        <h4 className="text-white bg-info p-2">Say something...</h4>
        <form>
          <textarea
            className="form-control my-3"
            id=""
            cols="30"
            rows="5"
            placeholder="Create a post"
          ></textarea>
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </form>
        {posts.map((post) => {
          return (
            <div key={post._id} className="d-flex p-3 my-5 border border-1">
              <div className="text-center w-25">
                <img src={post.avatar} alt="" className="rounded-circle" />
                <br />
                <Link to={`/posts/${post._id}`}>{post.name}</Link>
              </div>
              <div className="d-flex flex-column gap-3 justify-content-center px-5">
                <h4>{post.text}</h4>
                <span>
                  Posted on {new Date(post.date).toLocaleDateString()}
                </span>
                <div className="d-flex gap-2">
                  <Button variant="light">
                    <FaThumbsUp />
                  </Button>
                  <Button variant="light">
                    <FaThumbsDown />
                  </Button>
                  <Button variant="info" as={Link} to={`/posts/${post._id}`}>
                    Diccussion
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Posts;
