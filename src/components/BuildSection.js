import { act, useReducer, useState } from "react";



function initState(drinks) {
    var initial_state = {};
    initial_state.drinks_count = {};
    initial_state.case_no = 3;
    initial_state.payment_method = 'one-time';
    initial_state.subs_freq = 30;
    initial_state.case_layout = [0, 0, 0]; // as # of cases is 3 initially
    initial_state.is_drawer_open = false;

    for (var i = 0; i < drinks.length; i++) {
        initial_state.drinks_count[drinks[i].id] = 0;
    }

    return initial_state;


}

function reducer(state, action) {
    if (action.type.includes("add")) {
        // format "add#3"   "add#ID"
        var __id = parseInt(action.type.split("#").splice(-1));                                     // find the id of the drink type that was added.
        var current_drinks_count = state.drinks_count[__id];                                         // current drinks count of that drink.
        var push_index = state.case_layout.indexOf(0);
        if (push_index === -1) {
            // drinks slot is full. which will not happen logically in the system.
        }
        else {
            var new_case_layout = state.case_layout.toSpliced(push_index, 1, __id);                                         // edit case layout, push at end
            var new_state = { ...state, case_layout: new_case_layout, drinks_count: { ...state.drinks_count } };   // update new drinks count and return state.
            new_state.drinks_count[__id] = current_drinks_count + 1;
        }
        return new_state;

    }
    else if (action.type.includes("remove_drink")) {
        var __id = parseInt(action.type.split("#").splice(-1));
        var current_drinks_count = state.drinks_count[__id];
        // x = [1, 2, 3]
        // var l = [...x, 4, 5];
        var new_case_layout = [...state.case_layout.toSpliced(state.case_layout.indexOf(parseInt(__id)), 1), 0];
        // return ({ ...state, case_layout: new_case_layout, drinks_count: { ...state.drinks_count, __id: current_drinks_count - 1 } });
        var new_state = { ...state, case_layout: new_case_layout, drinks_count: { ...state.drinks_count } };
        new_state.drinks_count[__id] = current_drinks_count - 1;
        return new_state;
    }
    else if (action.type.includes("remove_slot")) {
        //not compiled for now.
        return state;
    }
    else if (action.type.includes("select_case")) {
        /*
        2 cases, new case size bigger than prev, new case size smaller than prev
        */
        var new_case_size = parseInt(action.type.split("#").splice(-1));
        if (new_case_size > parseInt(state.case_no)) {  //case-1 (bigger than prev)
            var slots_to_be_added = new_case_size - parseInt(state.case_no)
            var new_case_layout = [...state.case_layout, ...Array(slots_to_be_added).fill(0)];
            return ({ ...state, case_no: new_case_size, case_layout: new_case_layout, drinks_count: { ...state.drinks_count } });
        }
        else if (new_case_size < parseInt(state.case_no)) { //case-2 (smaller than prev)
            var slots_to_be_removed = parseInt(state.case_no) - new_case_size;
            var new_case_layout = [...state.case_layout].slice(0, new_case_size);
            return ({ ...state, case_no: new_case_size, case_layout: new_case_layout, drinks_count: { ...state.drinks_count } });
        }
    }
    else if (action.type.includes("change_payment_method")) {
        if (state.payment_method == "one-time") {
            return { ...state, payment_method: "subscribe", drinks_count: { ...state.drinks_count } };
        }
        else {
            return { ...state, payment_method: "one-time", drinks_count: { ...state.drinks_count } };
        }
    }
    else if (action.type.includes("checkout_drawer")) {
        return { ...state, is_drawer_open: !(state.is_drawer_open), drinks_count: { ...state.drinks_count } };
    }

    return state;
}

function BuildSection(props) {
    const [state, dispatch] = useReducer(reducer, initState(props.drinks));

    var drinks_list = props.drinks.map(drink => {
        return (<Product
            drink={drink}
            global_state={state}
            handle_add={() => { dispatch({ type: `add#${drink.id}` }) }}
            handle_remove={() => { dispatch({ type: `remove_drink#${drink.id}` }) }} />
        )
    });

    const handleCaseSelectionINLINE = (clicked_case) => {
        if (parseInt(clicked_case) != state.case_no) { dispatch({ type: `select_case#${clicked_case}` }) };
    }
    const handleSubscriptionOptionSelection = (selected_payment_option) => {
        if (selected_payment_option != state.payment_method) { dispatch({ type: 'change_payment_method' }) };
    }

    var is_one_time_purchase = true;
    return (
        <div className="build-section">
            <div className="build-section__products">
                <p className="title-big-font-obv-narw" style={{ margin: "0" }}>BUILD YOUR BUNDLE</p>
                <p>Mix and match cases of your favourite Mateína flavours<br />to create a custom bundle.</p>
                <div className="build-section__drinks-grid">
                    {drinks_list}
                </div>
            </div>
            <div className="build-section__checkout">
                <div className="review-top-container">
                    <img className="review-star" src="./star_icon_deep_green.svg" />
                    <img className="review-star" src="./star_icon_deep_green.svg" />
                    <img className="review-star" src="./star_icon_deep_green.svg" />
                    <img className="review-star" src="./star_icon_deep_green.svg" />
                    <img className="review-star" src="./star_icon_deep_green.svg" />
                    <p style={{ fontSize: ".7em", marginLeft: "10px", fontWeight: "500" }}>175 reviews</p>
                </div>
                <div style={{ fontWeight: "500" }}>Free shipping on bundles!</div>
                <div className="all-cases">
                    <CaseContainer no_of_case={2} price_per_can={"3.40"} global_state={state} handleSelection={() => { handleCaseSelectionINLINE("2") }} />
                    <CaseContainer no_of_case={3} price_per_can={"3.26"} global_state={state} handleSelection={() => { handleCaseSelectionINLINE("3") }} />
                    <CaseContainer no_of_case={6} price_per_can={"3.15"} global_state={state} handleSelection={() => { handleCaseSelectionINLINE("6") }} />
                </div>
                <SlotsContainer global_state={state} />
                {
                    (state.delivery_method === 'one_time') ?
                        <div className="delivery-method-description"><strong>Delivery: </strong>One time purchase</div> :
                        <div className="delivery-method-description"><strong>Delivery: </strong>One time purchase</div>
                }
                <PurchaseOptions global_state={state}
                    handleOneTImeSelection={() => { handleSubscriptionOptionSelection("one-time") }}
                    handleSubscribeSelection={() => { handleSubscriptionOptionSelection("subscribe") }} />
                <button className="checkout-button" disabled={(state.case_layout.indexOf(0) !== -1)} onClick={() => dispatch({ type: 'checkout_drawer' })}>
                    {(state.case_layout.indexOf(0) === -1) ? "CHECKOUT" : "ADD MORE"}
                </button>
            </div>
            <CheckoutDrawer global_state={state} handleDrawerClose={() => dispatch({ type: 'checkout_drawer' })} />
        </div>
    );
}

function CheckoutDrawer({ global_state, handleDrawerClose }) {
    return (
        <div className={`checkout-drawer${global_state.is_drawer_open ? " checkout-drawer--isopen" : ""}`} >
            <div style={{ display: "flex", padding: "20px" }}>
                <span className="checkout-header">YOUR CART</span>
                <button className="cross-button" style={{ marginLeft: "17.5vw" }} onClick={handleDrawerClose}><img className="cross-button--img" src="./icons/cross.svg" /></button>
            </div>
            {/* <pre className="json-output">{JSON.stringify(global_state, null, "\t")}</pre> <br /> */}
            <button className="checkout-button">CHECKOUT</button>
        </div>
    )
}



function PurchaseOptions({ global_state, handleOneTImeSelection, handleSubscribeSelection }) {

    return (
        <div className="options-container">
            <label className="option" for="one-time">
                <label>
                    <input className="input" type="radio" id="one-time" name="payment-method" onChange={handleOneTImeSelection} checked={(global_state.payment_method == "one-time")} />
                    <label className="purchase-option-font-title" for="one-time">One time Purchase</label>
                    <div className="disc">
                        <s className="purchase-option-font-small">$42.00 / Case</s> <br />
                        <span className="purchase-option-font-small">$42.00 / Case</span>
                    </div>
                </label>
            </label>
            <div className={`option-subscribe option${(global_state.payment_method == 'subscribe') ? " option-incrs-height" : ""}`} for="subscribe">
                <label for="subscribe">
                    <input className="input" type="radio" id="subscribe" name="payment-method" value="30" onChange={handleSubscribeSelection} checked={(global_state.payment_method == "subscribe")} />
                    <label className="purchase-option-font-title" for="subscribe">Subscription and save 10%</label>
                    <div className="disc">
                        <s className="purchase-option-font-small">$42.00 / Case</s> <br />
                        <span className="purchase-option-font-small">$42.00 / Case</span>
                    </div>
                </label>
                <div className="conditionally-invisible" style={{ display: (global_state.payment_method == "one-time") ? "none" : "block" }} >
                    <p className="frequency-header purchase-option-font-title">Frequency</p>
                    <div>
                        <select className="frequency-select-menu purchase-option-font-regular">
                            <option value="30">30 Day subscription with 10% Discount</option>
                            <option value="45">45 Day subscription with 10% Discount</option>
                            <option value="60" selected>60 Day subscription with 10% Discount</option>
                        </select>
                        <button className="learn-more-button">?</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
                <div className="frequency-container">
                    <div className="frequency-header"></div>
                    <select className="frequency-select-menu">
                        <option value="30">30 Day subscription with 10% Discount</option>
                        <option value="45">45 Day subscription with 10% Discount</option>
                        <option value="60" selected>60 Day subscription with 10% Discount</option>
                    </select>
                    <span className="learn-more-question-mark">?</span>
                </div>
*/


function SlotsContainer({ global_state }) {
    let cans_list = [];
    for (let i = 0; i < global_state.case_no; i++) {
        const is_blueprint = (global_state.case_layout[i] === 0);
        var img_src = is_blueprint ? "./can_slot.png" : `./drinks_pics/${global_state.case_layout[i]}.jpeg`;
        cans_list.push(<img className="single-can" src={img_src} />)
    }


    return (
        <div className="slots-container">
            <div className="slots-container__cans">
                {cans_list}
            </div>
            <div className="slots-container__bottom-header">{global_state.case_no} CASES of 12 x 355ml</div>
        </div>
    )
}


function CaseContainer({ global_state, no_of_case, price_per_can, handleSelection }) {
    return (
        <div className={(global_state.case_no === no_of_case) ? "case-container--selected" : "case-container"} onClick={handleSelection}>
            <div className="case-container__box"><div className="case-container__box__text">{`${no_of_case} CASES`}</div></div>
            <div className="case-container__round"><div className="case-container__round__text">{`$${price_per_can}/can`}</div></div>
        </div>
    );
}

function Product({ drink, global_state, handle_add, handle_remove }) {
    const color_up = `rgb(${drink.colorup.replaceAll('-', ',')})`;
    const color_down = `rgb(${drink.colordown.replaceAll('-', ',')})`;
    // console.log(color_up);
    // console.log(color_down);

    function isSlotsFull(state) {
        debugger;
        let zero_count = 0;
        for (let i = 0; i < state.case_no; i++) {
            if (state.case_layout[i] == 0) zero_count++;
        }
        const empty_slots = state.case_layout.length - zero_count;
        return (empty_slots === 0) ? true : false;
    }

    return (
        <div className="build-section__drinks-grid__item">
            <div className="drink-item-backgrnd" style={{ backgroundImage: `linear-gradient(${color_up}, ${color_down})` }}>
                <img className="drink-pic" src={`./drinks_pics/${drink.id}.jpeg`} style={{ height: '200px', width: 'auto', float: 'center' }} />
            </div>
            <p className="title-font-obv">{drink.name}</p>
            {
                (global_state.drinks_count[drink.id] == 0) ?
                    <button className="drink-item-button" onClick={handle_add} disabled={(global_state.case_layout.indexOf(0) === -1)}>ADD</button> :
                    <div className="drink-add-sub-section">
                        <button class="drink-add-sub-section__sign" onClick={handle_add} disabled={(global_state.case_layout.indexOf(0) === -1)}>+</button>
                        <div>{global_state.drinks_count[drink.id]}</div>
                        <button class="drink-add-sub-section__sign" onClick={handle_remove}>-</button>
                    </div>
            }
        </div>
    )
}

export default BuildSection;