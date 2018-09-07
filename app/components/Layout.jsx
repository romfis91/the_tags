import React, {Fragment} from 'react';

const Layout = (props) => (
    <Fragment>
        <header style={{ display: 'flex', justifyContent: 'center'}}>
            <h1>The Game</h1>
        </header>
        <div className="content" style={{ display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
            {props.children}
        </div>
        <footer style={{ display: 'flex', justifyContent: 'center'}}>
            <h4>App Footer</h4>
        </footer>
        <style global jsx>
        {`
            body, html {
                height: 100%;
            }
            #__next {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
        `}
        </style>
    </Fragment>
)

export default Layout;