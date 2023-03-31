import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Pannellum } from "pannellum-react";

const SinglePost = () => {
  const { postId } = useParams();
  const [imageLink, setImageLink] = useState("");
  useEffect(() => {
    axios(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`).then(
      ({ data }) => {
        console.log(data.post.mainImg);
        setImageLink(data.post.mainImg);
      },
    );
  }, []);
  return (
    <>
      <Pannellum
        width='100%'
        height='500px'
        image={`${import.meta.env.VITE_BACKEND_STATIC}/${imageLink}`}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}>
        <Pannellum.Hotspot
          type='custom'
          pitch={12.41}
          yaw={117.76}
          handleClick={(evt, name) => console.log(name)}
          name='image info'
        />
      </Pannellum>
    </>
  );
};

export default SinglePost;
