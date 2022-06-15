import { Link } from 'react-router-dom';

export function Header(props) {
  return (
    <header>
      <h1>
        <Link
          to="/"
          onClick={(evt) => {
            //console.log(evt);
            props.onSelect();
          }}
        >
          WWW
        </Link>
      </h1>
    </header>
  );
}
