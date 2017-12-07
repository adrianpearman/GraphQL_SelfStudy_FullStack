import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client' //this is actually connecting to the GraphQL database
import { ApolloProvider } from 'react-apollo'; //renders the apollo data to our front end application
import SongList from './components/SongList';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute  component={SongList}/>
          <Route path='/songs/new' component={SongCreate} />
          <Route path='/songs/:id' component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
