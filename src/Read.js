import { useParams } from 'react-router-dom';
import { Article } from './Article';

export function Read(props) {
  const params = useParams();
  const id = Number(params.topic_id);
  const topic = props.topics.filter((e) => {
    if (e.id === id) {
      return true;
    } else {
      return false;
    }
  })[0];
  return <Article title={topic.title} body={topic.body}></Article>;
}
