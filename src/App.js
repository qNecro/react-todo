import React from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './app.css'

class App extends React.Component {
   /**
    * LET'S ROCK
    */
   constructor(props) {
      super(props)

      this.input = React.createRef()

      this.state = {
         newWho: '',
         newWat: '',
         characters: []
      }
   }

   /**
    * LOAD MY DUDES
    */
   componentDidMount = () => {
      fetch('https://api.myjson.com/bins/zg7ze')
         .then(res => res.json())
         .then(json => this.setState({ characters: json }))
   }

   /**
    * ListOfDudes "COMPONENT"
    */
   listOfDudes = () => {
      return this.state.characters.map(dude => (
         <CSSTransition key={dude.id} timeout={200} classNames="dude">
            <li key={dude.id} className="dude">
               <a className="ctrl" onClick={() => this.removeDude(dude)}>
                  x
               </a>

               <article
                  className={
                     dude.cool < 10 ? 'faded' : dude.cool > 50 ? 'gold' : ''
                  }
               >
                  {dude.who}
                  <span>{dude.wat}</span>
               </article>

               <input
                  className="ctrl"
                  type="number"
                  value={dude.cool}
                  onChange={this.handleCool(dude)}
               />
            </li>
         </CSSTransition>
      ))
   }

   /**
    * SAVE NEW WHO
    */
   handleWho = event => {
      this.setState({ newWho: event.target.value })
   }

   /**
    * SAVE NEW WAT
    */
   handleWat = event => {
      this.setState({ newWat: event.target.value })
   }

   /**
    * UPDATE COOL
    */
   handleCool = dude => event => {
      const cool = +event.target.value

      this.setState(state => {
         return {
            characters: state.characters.map(item =>
               item === dude ? { ...dude, cool } : item
            )
         }
      })
   }

   /**
    * REMOVE DUDE
    */
   removeDude = dude => {
      this.setState(state => {
         return {
            characters: state.characters.filter(item => item !== dude)
         }
      })
   }

   /**
    * ADD NEW DUDE
    */
   handleSubmit = event => {
      if (event.key === 'Enter' && this.state.newWho && this.state.newWat) {
         this.setState(state => {
            const newDude = {
               id: Math.max(...state.characters.map(d => d.id)) + 1,
               who: this.state.newWho,
               wat: this.state.newWat,
               cool: 15
            }

            return {
               characters: [...state.characters, newDude]
            }
         })

         this.resetForm()
      }
   }

   /**
    * RESET FORM
    */
   resetForm = () => {
      this.setState({
         newWho: '',
         newWat: ''
      })

      this.input.current.focus()
   }

   /**
    * TEMPLATE
    */
   render() {
      return (
         <div>
            <TransitionGroup component="ul">
               {this.listOfDudes()}
            </TransitionGroup>

            <form className="add-new" onKeyPress={this.handleSubmit}>
               <input
                  autoFocus
                  type="text"
                  ref={this.input}
                  value={this.state.newWho}
                  onChange={this.handleWho}
               />

               <input
                  type="text"
                  value={this.state.newWat}
                  onChange={this.handleWat}
               />
            </form>

            <p className="preview">
               {this.state.newWho}
               <br />
               <small>{this.state.newWat}</small>
            </p>
         </div>
      )
   }
}

export default App
