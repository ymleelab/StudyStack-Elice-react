import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';
import { Link, Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Nav } from './Nav';
import { Article } from './Article';
import { Create } from './Create';
import { Read } from './Read';

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  color: red;
`;

function App() {
  const [mode, setMode] = useState('WELCOME'); //todo 삭제 예정
  const [id, setId] = useState(null); //todo 삭제 예정
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
  ]);

  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler()}></Create>}></Route>
        <Route path="read/:topic_id" element={<Read topics={topics}></Read>}></Route>
      </Routes>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button component={Link} to="/create" variant="outlined" onClick={createHandler()}>
          Create
        </Button>
        <Button component={Link} to="/update" variant="outlined">
          Update
        </Button>
      </ButtonGroup>
      <Button variant="outlined" onClick={deleteHandler()}>
        Delete
      </Button>
    </div>
  );

  function onCreateHandler() {
    return (title, body) => {
      const newTopic = { id: nextId, title, body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setMode('READ');
      setNextId(nextId + 1);
    };
  }

  function createHandler() {
    return () => {
      setMode('CREATE');
    };
  }

  function navHandler() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function deleteHandler() {
    return () => {
      const newTopics = topics.filter((e) => {
        if (e.id === id) {
          return false;
        } else {
          return true;
        }
      });
      setMode('WELCOME');
      setTopics(newTopics);
    };
  }

  function headerHandler() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;
