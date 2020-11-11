import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import P1 from './page/page2-1';
import P2 from './page/page2-2';


class Page2 extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        //console.log(this.props.match)
    }

    render(){
        

        const match = this.props.match

        console.log(match)

        return(
          <div>
              page2
              <Router>
                <ul>
                    <li>
                        <Link to={ `${match.path}/p1` }>page2-1</Link>
                    </li>
                    <li>
                        <Link to="/page2/p2">page2-2</Link>
                    </li>
                </ul>
                <div>
                    <Route exact path={ `${match.path}/p1` } component={P1} />
                    <Route path="/page2/p2" component={P2} />
                </div>
               </Router>
          </div>
        )
    }
}

export default Page2;