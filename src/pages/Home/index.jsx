import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPosts } from "../../services/guardian";
import { SEARCH_ENDPOINT } from "../../constants";

function Home() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [sports, setSports] = useState([]);
  const [order, setOrder] = useState('newest');
  
  const fetchPosts = async (order) => {
    let newsParams = {
      'page-size': 8,
      'order-by': order,
      'section': 'news',
      'show-fields': [
        'headline',
      ],
    }
    GetPosts(SEARCH_ENDPOINT, newsParams).then(data => {
      setNews(data.results)
      setLoading(false)
    })
    
    const sportParams = {
      'page-size': 3,
      'order-by': order,
      'section': 'sport',
      'show-fields': [
        'headline',
      ],
    }
    GetPosts(SEARCH_ENDPOINT, sportParams).then(data => {
      setSports(data.results)
      setLoading(false)
    })
  }
  
  useEffect(() => {
    setLoading(true)
    fetchPosts(order)
  }, [order]);

  return (
    <main>
      {loading && (
        <div className="loader">
          <img src="/loading.png" alt="Loading"/>
        </div>
      )}
      <div className="box py3">
          <div className="flex justifySpaceBetween">
            <h1 className="pe1">Top Stories</h1>
            <div>
              <select className="sort" onChange={x => setOrder(x.target.value)}>
                <option value='newest'>Newest first</option>
                <option value='oldest'>Oldest first</option>
              </select>
            </div>
          </div>
          <div className="top py1">
            <div className="flex flexWrap">
              {news[0] && (
                <div className="col99250 pe992 flex pb">
                  <Link
                    to={"/article/" + news[0].id.replace(/\//g, '_')}
                    className="post post-lg positionRelative bg bb bcGreen w100"
                  >
                    <img src='/news/0.jpg' alt={news[0].webTitle} />
                    <div className="content p1 positionAbsolute mw100 bg ">
                      <h3 className="title">{news[0].webTitle}</h3>
                      <p>
                        {news[0].fields?.headline}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
              <div className="col99250">
                <div className="flex flexWrap">
                  {news[1] && (
                    <Link key={news[1].id} to={"/article/" + news[1].id.replace(/\//g, '_')} className="col50 colSm100 flex pe320 pb">
                      <div
                        className={`post positionRelative w100 bg bb bc`}
                      >
                        <img
                          src='/news/1.jpg'
                          alt={news[1].webTitle}
                        />
                        <div className="content positionAbsolute mw100 bg p1">
                          <h3 className="title">{news[1].webTitle}</h3>
                        </div>
                      </div>
                    </Link>
                  )}
                  {news[2] && (
                    <Link key={news[2].id} to={"/article/" + news[1].id.replace(/\//g, '_')} className="col50 colSm100 flex pl320 pb">
                      <div
                        className={`post positionRelative w100 bg bb bc`}
                      >
                        <img
                          src="/news/2.jpg"
                          alt={news[2].webTitle}
                        />
                        <div className="content positionAbsolute mw100 bg p1">
                          <h3 className="title">{news[2].webTitle}</h3>
                        </div>
                      </div>
                    </Link>
                  )}
                  {news[3] && (
                    <Link 
                      key={news[3].id}
                      to={"/article/" + news[3].id.replace(/\//g, '_')}
                      className="col50 colSm100 flex pe320 pb"
                    >
                      <div className={`post positionRelative w100 bg bb bc`}>
                        <div className="content p1">
                          <h3 className="title">{news[3].webTitle}</h3>
                        </div>
                      </div>
                    </Link>
                  )}
                  {news[4] && (
                    <Link 
                      key={news[4].id}
                      to={"/article/" + news[4].id.replace(/\//g, '_')}
                      className="col50 colSm100 flex pl320 pb"
                    >
                      <div className={`post positionRelative w100 bg bb bc`}>
                        <div className="content p1">
                          <h3 className="title">{news[4].webTitle}</h3>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* Row End */}
            <div className="flex justifySpaceBetween flexWrap three">
              {news.map((post, i) => i > 4 && (
                <Link 
                  key={post.id}
                  to={"/article/" + post.id.replace(/\//g, '_')}
                  className="col64033 flex pb"
                >
                  <div className="post positionRelative bg bb bcRed w100">
                    <img src="/post-2.jpg" alt="" />
                    <div className="content p1 positionSmAbsolute mw100 bg ">
                      <h3 className="title">
                        {post.webTitle}
                      </h3>
                      <p>
                        {post.fields?.headline}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {sports.length > 0 && (
            <div className="sports">
              <h2>Sports</h2>
              <div className="flex justifySpaceBetween flexWrap py1">
                {sports.map(post => (
                  <Link 
                    key={post.id}
                    to={"/article/" + post.id.replace(/\//g, '_')}
                    className="col64033 flex pb"
                  >
                    <div className="post positionRelative bg bb bcRed w100">
                      <img src="/post-2.jpg" alt="" />
                      <div className="content p1 positionSmAbsolute mw100 bg ">
                        <h3 className="title">
                          {post.webTitle}
                        </h3>
                        <p>
                          {post.fields?.headline}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {news.length === 0 && sports.length > 0 && (
            <div>
              <h3>No results to show!</h3>
            </div>
          )}
      </div>
    </main>
  );
}

export default Home;
