import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCard } from '../../../actions/card_actions';

import { isEmpty } from '../../../libs/helper_methods';


const List = (props) => {

    // SETUP
    const { list, cards } = props;
    const listTitle = list.name || null;
    
    const [newCardInfo, setNewCardInfo] = useState({
        name: "",
        description: "",
        listId: list.id,
    });



    // Update State
    const updateNewCardInfo = (field, value) => {
        const copyCardInfo = Object.assign({}, newCardInfo);

        copyCardInfo[field] = value;
        setNewCardInfo(copyCardInfo);
    }


    // Form Submission
    const handleCreateCard = (e) => {
        e.preventDefault();
        props.createCard(newCardInfo);
    }

    

    const cardItems = cards.map(card => {
        return (
            <li key={card.id} className="card_item">
                <h2>{card.name}</h2>
                <p>{card.description}</p>
            </li>
        )
    });


    return (
        <div className="list_main">
            <div className="list_main-container">
                <header className="list_main-header">
                    <h1 className="list_main-title">{ list.name }</h1>
                </header>

                <section className="list_main">
                    <ul className="cards_main">
                        { cardItems }

                        <li className="card_item">
                            <form onSubmit={(e) => handleCreateCard(e)}>
                                <input
                                    type="text"
                                    placeholder="Enter list title"
                                    value={newCardInfo.name}
                                    onChange={(e) => updateNewCardInfo("name", e.target.value)} />
                                <input type="submit" value="Add Card" />
                            </form>
                        </li>
                    </ul>

                </section>
            </div>
        </div>
    )
}









const msp = (state, ownProps) => {
    // Individual List
    const list = ownProps.list || {};
    const cardIds = ownProps.cardIds || [];

    // List's Card Index
    const cards = isEmpty(state.cards) ? [] : cardIds.map(cardId => state.cards[cardId]);

    return {
        list,
        cards
    }
}


const mdp = (dispatch) => {
    return {
        createCard: (card) => dispatch(createCard(card))
    }
}


export default connect(msp, mdp)(List);