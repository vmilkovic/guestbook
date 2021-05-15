import '../assets/styles/app.scss';

import {h, render} from 'preact';
import {Router, Link} from 'preact-router';
import {useState, useEffect} from 'preact/hooks';

import {findConferences} from './api/api';
import Home from './pages/home';
import Conference from './pages/conference';

function App() {
    const [conferences, setConferences] = useState(null);

    useEffect(() => {
        findConferences().then((conferences) => setConferences(conferences));
    }, []);

    if (conferences === null) {
        return <div className="text-center pt-5">Loading...</div>;
    }

    return (
        <div>
            <header className="header">
                <nav className="navbar navbar-light bg-light">
                    <div className="container">
                        {conferences.map((conference) => (
                            <Link className="nav-conference" href={'/conference/'+conference.slug}>
                                {conference.city} {conference.year}
                            </Link>
                        ))}
                    </div>
                </nav>

                <nav className="bg-light border-bottom text-center">
                    <Link className="nav-conference" href="/conference/amsterdam2019">
                        Amsterdam 2019
                    </Link>
                </nav>
            </header>

            <Router>
                <Home path="/" conferences={conferences} />
                <Conference path="/conference/:slug" conferences={conferences} />
            </Router>
        </div>
    )
}

render(<App />, document.getElementById('app'));