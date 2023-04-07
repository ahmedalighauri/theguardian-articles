import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SEARCH_ENDPOINT } from "../../constants";
import { GetPosts } from "../../services/guardian";

function Search() {
  let { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState('newest');
  
  useEffect(() => {
    setLoading(true)
    const params = {
      q: query,
      'order-by': order,
      'section': 'news',
      'show-fields': [
        'headline',
      ],
    }
    GetPosts(SEARCH_ENDPOINT, params).then(data => {
      setPosts(data.results)
      setLoading(false)
    })
  }, [order, query]);
  return (
    <main>
      {loading && (
        <div className="loader">
          <img src="/loading.png" alt="Loading"/>
        </div>
      )}
      <div className="box py3">
        <div className="flex justifySpaceBetween">
          <h1 className="pe1">Search Results</h1>
          <div>
            <select className="sort" onChange={x => setOrder(x.target.value)}>
              <option value='newest'>Newest first</option>
              <option value='oldest'>Oldest first</option>
            </select>
          </div>
        </div>
        <div className="sports">
          <div className="flex flexWrap py1">
            {posts.map(post => (
              <div key={post.id} className="col64033 flex pb">
                <Link
                  to={"/article/" + post.id.replace(/\//g, '_')}
                  className="post positionRelative bg bb bcRed w100"
                >
                  <img src="/post-2.jpg" alt="" />
                  <div className="content p1 positionSmAbsolute mw100 bg ">
                    <h3 className="title">
                      {post?.webTitle}
                    </h3>
                    <p>
                        {post.fields?.headline}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {posts.length === 0 && (
            <div>
              <h3>No results to show!</h3>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Search;
