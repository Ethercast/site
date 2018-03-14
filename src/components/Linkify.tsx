import * as React from 'react';
import * as urlRegex from 'url-regex';

interface LinkifyProps {
  children?: string;
}

const matching = urlRegex();

export default function Linkify({ children }: LinkifyProps) {
  return (
    <span>
      {
        children ?
          children.split(' ')
            .map(
              w =>
                matching.test(w) ? <a target="_blank" rel="nofollow noreferrer" href={w}>{w} </a> : `${w} `
            )
          :
          null
      }
    </span>
  );
}