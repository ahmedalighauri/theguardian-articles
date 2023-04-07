import { useEffect, useState } from "react";
import { GetPosts } from "../../services/guardian";
import { useParams } from "react-router-dom";

function Article({ ...props }) {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    setLoading(true)
    const parans = {
      'show-fields': [
        'headline',
        'body',
        'thumbnail'
      ],
    }
    GetPosts(id.replace(/_/g, '/'), parans).then(data => {
      setPost(data.content)
      setLoading(false)
    })
  }, [id]);
  
  return (
    <main>
      {loading && (
        <div className="loader">
          <img src="/loading.png" alt="Loading"/>
        </div>
      )}
      <div className="box py3">
        <article>
          <p className="textMuted date">{post?.webPublicationDate && new Date(post?.webPublicationDate).toString()} </p>
          <div className="flex justifySpaceBetween flexWrap py1">
            <div className="col99260 pe992">
              <h1 className="mb">
                {post?.webTitle}
              </h1>
              <h3 className="mb">
                {post?.fields?.headline}
                
              </h3>
              <hr className="mb" />
              <div dangerouslySetInnerHTML={{__html: post?.fields?.body}}></div>
            </div>
            <div className="col99240">
              <h1 className="mb hide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h1>
              <br/><br/>
              <img src="/news/0.jpg" alt="" className="w100 mb"/>
              <p className="textMuted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non porttitor nisl.
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

export default Article;
