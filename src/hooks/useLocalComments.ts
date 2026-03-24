import { useEffect, useMemo, useState } from 'react';
import { CommentItem } from '../types';

function getStorageKey(postId: number | string) {
  return `diario:comments:${postId}`;
}

export function useLocalComments(postId: number | string) {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(getStorageKey(postId));
    setComments(raw ? JSON.parse(raw) as CommentItem[] : []);
  }, [postId]);

  const countLabel = useMemo(() => `${comments.length} comentário${comments.length === 1 ? '' : 's'}`, [comments.length]);

  const addComment = (author: string, body: string) => {
    const nextComments = [
      {
        id: crypto.randomUUID(),
        author,
        body,
        createdAt: new Date().toISOString()
      },
      ...comments
    ];

    setComments(nextComments);
    window.localStorage.setItem(getStorageKey(postId), JSON.stringify(nextComments));
  };

  return { comments, addComment, countLabel };
}