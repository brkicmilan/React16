import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            {id: 1, name: 'Milan', age: 24},
            {id: 2, name: 'Mare', age: 30}
        ],
        otherState: 'some other value',
        showPersons: false
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex( p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };
        //const person = Object.assign({}, this.state.persons[personIndex]);

        person.name = event.target.name;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState( {persons: persons})
    };

    deletePersonHandler = (personIndex) => {
        const persons = this.state.persons.slice();
        //const persons = [...this.state.showPersons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});

    };

    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;

        if (this.state.showPersons){
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            );
            style.backgroundColor = 'red';
        }

        let classes = [];
        if (this.state.persons.length <= 1){
            classes.push('red');
        }
        if (this.state.persons.length <= 0){
            classes.push('bold');
        }

    return (
              <div className="App">
                  <h1>React</h1>
                  <p className={classes.join(' ')}>Application</p>
                  <button
                      style={style}
                      onClick={this.togglePersonsHandler}>Toggle Persons</button>
                  {persons}

              </div>
    );
  }
}

export default App;