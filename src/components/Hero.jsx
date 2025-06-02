import { logo } from '../assets';

const Hero = () => {
  return (
    <header className="header">
        <nav className="nav-bar">
            <img src={logo} alt="sumz_logo" 
            className="logo-image"/>

            <button
            type="button"
            onClick={()=> window.open('https://github.com')}
            className="black_btn"
            >
                Github
            </button>
        </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="br-class"/>
        <span className="orange_gradient">OpenAI  GPT-4</span>
      </h1>

      <h2 className="desc">
        Simplify your reading with Summarize AI, an 
        open-source article summarizer 
        that transforms lengthy articles into
        clear and concise summaries
      </h2>

    </header>
  )
}

export default Hero