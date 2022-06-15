import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from './Article';

export function Read(props) {
  const params = useParams();
  const id = Number(params.topic_id);
  const [topic, setTopic] = useState({ title: null, body: null });
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3333/topics/' + id);
      const data = await res.json();
      console.log(data);
      setTopic(data);
    })();
  }, [id]);
  return <Article title={topic.title} body={topic.body}></Article>;
}
