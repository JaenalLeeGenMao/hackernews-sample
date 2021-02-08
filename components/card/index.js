import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import cardStyles from './card.module.css';

/**
 * Primary UI component for user interaction
 */
const Card = ({ by, descendants, itemId, kids, score, time, title, type, url, ...props }) => {

    const pattern = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
    const hostname = url.match(pattern)
    return (
        <Link href={url} key={itemId}>
            <div className={cardStyles.card}>
                <div>
                    <label href={url}>{title} </label>
                    <a href={`https://news.ycombinator.com/from?site=${hostname && hostname[1]}`}>({hostname && hostname[1]}) </a>
                </div>
                <div>
                    <p>Score {score} by <a href={`https://news.ycombinator.com/user?id=${by}`}>{by}</a> <a href={`https://news.ycombinator.com/item?id=${itemId}`}>{distanceInWordsToNow(new Date(time * 1000))} ago </a> | <a href={`https://news.ycombinator.com/hide?id=${itemId}&goto=news`}>hide</a> | <a href={`https://news.ycombinator.com/item?id=${itemId}`}>{kids.length > 0 ? `${kids.length} comments` : 'discuss'} </a></p>
                </div>
            </div>
        </Link>
    );
};


Card.propTypes = {
  /**
   * Who is the user that posted it
   */
  by: PropTypes.string,
  /**
   * Not entire sure of the usage at the moment
   */
  descendants: PropTypes.number,
  /**
   * What is the Reference of the story
   */
  itemId: PropTypes.number,
  /**
   * How many people comments
   */
  kids: PropTypes.arrayOf(PropTypes.number),
  /**
   * What score this post has
   */
  score: PropTypes.number,
  /**
   * Time in unix value e.g. 1175714200
   */
  time: PropTypes.number,
  /**
   * What is the title
   */
  title: PropTypes.string,
  /**
   * What type should the card be?
   */
  type: PropTypes.oneOf(['comment', 'story', 'poll', 'job', 'pollopt']),
  /**
   * What text color to use
   */
  url: PropTypes.string,
};

Card.defaultProps = {
    by : '',
    descendants : 0,
    itemId : 0,
    kids : [],
    score : 0,
    time : 0,
    title : "",
    type : "story",
    url : ""
};

export default Card