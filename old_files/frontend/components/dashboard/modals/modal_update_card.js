import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateCard } from '../../../actions/card_actions';
import { modalClear } from '../../../actions/modals_action';



const modalUpdatCard = (props) => {
    const [cardInfo, setCardInfo] = useState(props.data);

    function updateCardInfo(field, value) {
        setCardInfo({ ...cardInfo, [field]: value});
    }

    function handleUpdateCard(e) {
        e.preventDefault();
        props.updateCard(cardInfo)
             .then(props.modalClear());
    }

    return (
        <div className="modal_container">
            <form className="modal_update_card" onSubmit={(e) => handleUpdateCard(e)}>
                <div className="modal_col">
                    <input type="text"
                        placeholder="Card title is required"
                        value={cardInfo.name}
                        onChange={(e) => updateCardInfo('name', e.target.value)} 
                        required />
                </div>
                <div className="modal_col">
                    <input type="submit" value="Update Card" />
                </div>
                <span className="modal_close_btn material-icons" onClick={props.modalClear}>clear</span>
            </form>
            <div className="modal_close_area" onClick={props.modalClear}></div>
        </div>
    )
}



const mdp = (dispatch) => {
    return {
        updateCard: (card) => dispatch(updateCard(card)),
        modalClear: () => dispatch(modalClear())
    }
}


export default connect(null, mdp)(modalUpdatCard);