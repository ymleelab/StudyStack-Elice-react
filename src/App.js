import { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Nav } from './Nav';
import { Article } from './Article';
import { Create } from './Create';
import { Read } from './Read';

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  color: red;
`;

function Control(props) {
  const params = useParams();
  const id = Number(params.topic_id);
  let contextUI = null;
  if (id) {
    contextUI = (
      <>
        <Button component={Link} to="/update" variant="outlined">
          Update
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.onDelete(id);
          }}
        >
          Delete
        </Button>
      </>
    );
  }
  return (
    <>
      <Button component={Link} to="/create" variant="outlined">
        Create
      </Button>
      {contextUI}
    </>
  );
}

function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
  ]);

  const refreshTopics = async () => {
    const res = await fetch('http://localhost:3333/topics');
    const data = await res.json();
    setTopics(data);
  };
  useEffect(() => {
    refreshTopics();
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <HeaderStyled></HeaderStyled>
      <Nav data={topics}></Nav>
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler}></Create>}></Route>
        <Route path="read/:topic_id" element={<Read topics={topics}></Read>}></Route>
      </Routes>
      <Routes>
        {['/', 'read/:topic_id', '/update/:topic_id'].map((path) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <Control
                  onDelete={(id) => {
                    deleteHandler(id);
                  }}
                ></Control>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );

  async function onCreateHandler(title, body) {
    const res = await fetch('http://localhost:3333/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await res.json();
    navigate(`/read/${data.id}`);
    refreshTopics();
  }

  function deleteHandler(id) {
    const newTopics = topics.filter((e) => {
      if (e.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setTopics(newTopics);
    navigate('/');
  }
}

export default App;
