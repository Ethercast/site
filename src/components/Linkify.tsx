import * as React from 'react';

interface LinkifyProps {
  children?: string;
}

const matching = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

export default function Linkify({ children }: LinkifyProps) {
  return (
    <span>
      {
        children ?
          children.split(' ')
            .map(
              w =>
                matching.test(w) ? <a target="_blank" rel="nofollow noreferrer" href={w}>{w} </a> : ``
            )
          :
          null
      }
    </span>
  );
}