import moment from 'moment';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './index.css'


function Avatar({ hash }) {
  /* 'https://cdn.myanimelist.net/images/characters/5/171719.webp' */
  const url = `https://cdn.myanimelist.net/images/characters/5/${hash}`;
  return (
    <img src={url}
      className="avatar"
      alt="avatar" />
  )
}
Avatar.propTypes = {
  hash: PropTypes.string
};

function Message({ text }) {
  return (
    <div className="message">
      {text}
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string
};

function Author({ author }) {
  const { name, handle } = author
  return (
    <span className="author">
      <span className="name">{name}</span>
      <span className="handle">@{handle}</span>
    </span>
  )
}

Author.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired
};

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return (<span className="time">{timeString}</span>)
}

Time.propTypes = {
  time: PropTypes.string
};

const ReplyButton = () => (
  <i className="fa fa-reply reply-button" />
)

function Count({ count }) {
  if (count > 0) {
    return (
      <span className="retweet-count">
        {count}
      </span>
    );
  } else {
    return null;
  }
}

/* function getRetweetCount(count) {
  if (count > 0) {
    return (
      <span className="retweet-count">
        {count}
      </span>
    );
  } else {
    return null;
  }
} */
const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet" />
    <Count count={count} />
  </span>
);

RetweetButton.propTypes = {
  count: PropTypes.number
};

const LikeButton = ({ count }) => (
  <span className="like-button" >
    <i className="fa fa-heart" />
    <span className="like-count">
      {count ? count : null}
    </span>
  </span>
)

LikeButton.propTypes = {
  count: PropTypes.number
};

const MoreOptionsButton = () => (
  <i className=" fa fa-ellipsis-h more-options-button" />
)


function Tweet({ tweet }) {
  const {gravatar,author,time,message,retweets,likes}=tweet
  return (

    <div className="tweet">
      <Avatar hash={gravatar} />
      <div className="content">
        <Author author={author} />
        <Time time={time} />
        <Message text={message} />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={retweets} />
          <LikeButton count={likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>

  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    likes:PropTypes.number.isRequired,
    retweets:PropTypes.number.isRequired,
    timestamp:PropTypes.string.isRequired

  }).isRequired
};


const testTweet = {
  message: "Los pensadores esenciales piensan lo verdadero, a pe­sar de los errores en que incurren",
  gravatar: "171719.webp",
  author: { handle: "filosofia.com", name: "Heidegger" },
  likes: 14,
  retweets: 2,
  timestamp: "2018-02-01T18:30:00.000Z"
};


ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector('#root'));