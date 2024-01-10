import { Spinner, Button } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Link from "../Components/Link";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

const Post = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useFetch(`/posts/${postId}`);
  console.log(postId);
  if (!postId) return <Navigate to="/posts" />;
  console.log(post);
  return isLoading ? (
    <div id="spinner" className="vh-100 fixed">
      <Spinner className="spinner" />
    </div>
  ) : (
    post && (
      <div id="post" className="container my-5">
        <Button variant="light">
          <Link to="/posts">Back to Posts</Link>
        </Button>
        <div key={post._id} className="d-flex p-3 my-3 border border-1">
          <div className="text-center w-25">
            <img src={post.avatar} alt="" className="rounded-circle" />
            <br />
            <Link to={`/posts/${post._id}`}>{post.name}</Link>
          </div>
          <div className="d-flex flex-column gap-3 justify-content-center px-5">
            <h4>{post.text}</h4>
            <span>Posted on {new Date(post.date).toLocaleDateString()}</span>
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
        <h4 className="text-white bg-info p-2">Leave a Comment</h4>
        <form>
          <textarea
            className="form-control my-3"
            id=""
            cols="30"
            rows="5"
            placeholder="Comment the post"
          ></textarea>
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </form>
        {post.comments.map((comment) => {
          console.log(comment);
          return (
            <div key={comment._id} className="d-flex p-3 my-5 border border-1">
              <div className="text-center w-25">
                <img src={comment.avatar} alt="" className="rounded-circle" />
                <br />
                <Link>{comment.name}</Link>
              </div>
              <div className="d-flex flex-column gap-3 justify-content-center px-5">
                <h4>{comment.text}</h4>
                <span>
                  Posted on {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Post;
