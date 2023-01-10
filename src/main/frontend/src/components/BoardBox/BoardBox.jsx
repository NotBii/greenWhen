// # main/frontend/src/compoents/BoardBox/BoardBox.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BoardBox = (props) => {
    console.log('beerBox/props: ', props);
    console.log('beerBox/props.title: ', props.title);
    return(
    <>
        <Link
            to = {"/page"}
             state = {{
                no: props.no,
             }}
        >
            <div>
                <h1>{props.title}</h1>
            </div>
        </Link>
    </>
    )
}
export default BoardBox;