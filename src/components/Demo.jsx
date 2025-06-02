import { useState,useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

  const[article, setArticle]=useState({
    url:'',
    summary:'',
  });

  const [ allArticles, setAllArtices ] = useState([]);

  const [copied, setCopied] = useState("");

  const[getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage){
      setAllArtices(articlesFromLocalStorage)
    }

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle,...allArticles];

      setArticle(newArticle);
      setAllArtices(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));

    }
  };

   const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  

  return (
    <section className="section">
      {/* Search */}

      <div className="search">
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="demo-img"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>setArticle({...article, url: e.target.value})}
            required
            className="url_input"
          />

          <button
            type="submit"
            className="submit_btn"
          >
            ➤
          </button>

        </form>

        {/* browse url history */}

        <div className="browse-url-history">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="browse-url-history-img"
                />
              </div>
              <p className="url-links">
                {item.url}
              </p>
            </div>
          ))}    
        </div>
      </div>

       {/* Display Results */}

       <div className="display-results">
        {isFetching ? (
          <img src={loader} alt='loader' className="loader-img" />
        ) : error ? (
          <p className="error-text">
            Well, that wasn't supposed to happen...
            <br />
            <span className="error-data">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="summary-top">
              <h2 className="article-name">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="summary-text">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo;